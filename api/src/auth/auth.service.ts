import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt";
import { Injectable, BadRequestException, HttpStatus, HttpException  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose'
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { ChangePasswordRequest } from './schemas/change-password-request.schema';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { User } from '../users/schemas/user.schema';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { COOKIE_EXPIRES, COOKIE_TOKEN_KEY } from './auth.constants';

const TOKEN_LENGTH = 16;

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,        
        @InjectModel(ChangePasswordRequest.name) private readonly changePasswordRequestModel: Model<ChangePasswordRequest>
      ) {}

    generateToken(len: number = TOKEN_LENGTH): string {
        return crypto.randomBytes(len).toString('hex');
    }

    async createForgotTokenRequest (uId): Promise<ChangePasswordRequest> {
        const changeRequestPasswordDto : ChangePasswordRequestDto = {
            uId,
            token: this.generateToken(),
            createdAt: new Date()
        }

        const createdToken: ChangePasswordRequest = new this.changePasswordRequestModel(changeRequestPasswordDto);
        return createdToken.save();
    }

    async forgotPassword (forgotPasswod:ForgotPasswordDto) : Promise<void> {
        const user = await this.usersService.findByEmail(forgotPasswod.email);

        if (!user) {
            throw new BadRequestException(`No users found with the email ${forgotPasswod.email}.`);
        }

        const tokenRequest = await this.createForgotTokenRequest(user._id);
        const url = this.mailService.getPasswordResetURL(tokenRequest.token)
        const mailOpttions = this.mailService.getForgotPasswordTemplate(user.email, url, user.name)

        try {
            await this.mailService.sendEmail(mailOpttions)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Invalid login: 535 Authentication failed',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async resetPassword (resetPassworDto:ResetPasswordDto): Promise<void> {
        const { password, token } = resetPassworDto;
        const changePasswordRequest = await this.changePasswordRequestModel.findOne({ token }).exec();

        if (!changePasswordRequest) {
          throw new BadRequestException(`Not valid link`);
        }

        const { uId, _id} = changePasswordRequest;
        const user = await this.usersService.findById(uId);

        user.password = await this.usersService.createPasswordHash(password);
        user.save();
        this.changePasswordRequestModel.findByIdAndDelete(_id).exec();
    }

    login(user: User, res) {
        const plainUser = this.usersService.convertToPlainObject(user);
        const payload = {
          sub: user.id,
          ...plainUser,
        };

        const token = this.jwtService.sign(payload);
                
        const cookie: Record<string, any> = {
          expires: COOKIE_EXPIRES,
          ...this.getCookieOptions()
        };
        res.cookie(COOKIE_TOKEN_KEY, token, cookie);

        return plainUser;
    }

    logout(res) {
      res.clearCookie(COOKIE_TOKEN_KEY, this.getCookieOptions());
    }

    strategyLogin(req, strategyName = '') {
        if (!req.user) {
            return {
                message: `No user from ${strategyName}`,
                user: null,
            }
        }

        return {
            message: `User information from ${strategyName}`,
            user: req.user,
        }
    }

    private getCookieOptions(): Record<string, any> {
      let res: Record<string, any> = {
        httpOnly: true,
      };      
      const domain: string = this.configService.get<string>('CLIENT_BASE_URL');
      
      if (!domain.includes('localhost')) {
        res = {
          ...res,
          domain: `.${domain.split('//')[1]}`
        }
      }
      
      return res;
    }
}
