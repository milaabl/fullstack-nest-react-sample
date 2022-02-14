import { Controller, Request, Res, Post, Get, Body, HttpCode, HttpStatus, UseGuards, UnauthorizedException, ValidationPipe, Param, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "./jwt-auth.guard";
import { IMailData } from '../mail/interfaces/mail.interface';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.usersService.createUser(createUserDto);

    user.emailVerification = {
      token: this.authService.generateToken(32),
      createdAt: new Date()
    };

    user.save();

    const confirmEmailUrl: string = `${this.configService.get<string>('API_BASE_URL')}/auth/confirm-email/${user.emailVerification.token}`;
    const mailData: IMailData = {
      to: user.email,
      subject: 'Email confirmation',
      text: `Hello ${user.name}! Follow ${confirmEmailUrl} to confirm your email.`,
      html: `
        <h3>Hello ${user.name}!</h3>
        <p>Follow the <a href="${confirmEmailUrl}" target="_blank">link</a> to confirm your email.</p>
        `
      };
      this.mailService.sendEmail(mailData);
    }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/reset-password')
  async resetPassword(@Body(ValidationPipe) resetPassworDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPassworDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body, @Res() res) {
    const user = await this.usersService.findUserByCredentials(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const data = this.authService.login(user, res);
    res.send(data);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res) {
    this.authService.logout(res);
    res.send({ logout: true });
  }

  @Get('confirm-email/:token')
  @Redirect('')
  async confirmEmail(@Param('token') token: string) {
    const res: boolean = await this.usersService.confirmEmail(token);

    return {
      url: `${this.configService.get<string>('CLIENT_BASE_URL')}/confirm-email/${ res ? 'success' : 'fail' }`,
      statusCode: HttpStatus.PERMANENT_REDIRECT
    };
  }
}
