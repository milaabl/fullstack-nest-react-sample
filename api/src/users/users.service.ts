import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as getTimezoneOffset from 'get-timezone-offset';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

export const SALT_ROUNDS: number = 10;
const DEFAULT_NOTIFICATION_TIME: number = 600; // 60min * 10 = 10:00 AM
const MAX_NOTIFICATION_TIME: number = 1439; // 11:59 PM

const dateToNumberOfMinutesAM = (date: Date, offset: number = 0): number => {
  let res = date.getHours() * 60 + date.getMinutes() + offset;
  
  if (res < 0) {
    res += MAX_NOTIFICATION_TIME + 1;
  } else if(res > MAX_NOTIFICATION_TIME) {
    res -= MAX_NOTIFICATION_TIME + 1;
  }

  return res;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const dto: CreateUserDto = {
        ...createUserDto,
        email: createUserDto.email.toLowerCase(),
        notificationTime: DEFAULT_NOTIFICATION_TIME,
    };
    const existedUser: User = await this.userModel.findOne({ email: dto.email }).exec();

    if (existedUser) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    dto.password = await this.createPasswordHash(dto.password);
    const createdUser: User = new this.userModel(dto);
    createdUser.createdAt = new Date();

    return createdUser.save();
  }

  async createPasswordHash (password: string, saltRounds: number = SALT_ROUNDS): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  async updateUser(id, updateUserDto: UpdateUserDto) {
    const user = await this.findProfileByUserId(id);

    if(user) {
      const notificationTime = updateUserDto.notificationTime;
      const WAS_NOT_NOTIFICATION_TIME_SENT = notificationTime === null && notificationTime !== 0;

      if(WAS_NOT_NOTIFICATION_TIME_SENT) {
        const fixedUserData = {
          ...updateUserDto,
          notificationTime: user.notificationTime,
        };
        await this.userModel.findByIdAndUpdate(id, fixedUserData).exec();
      } else {
        await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
      }
      const updatedUser = await this.findProfileByUserId(id);
      return this.convertToPlainObject(updatedUser);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async updateUserAvatarLink(id, fileKey) {
    const user = await this.findProfileByUserId(id);
    if(user) {
      await this.userModel.findByIdAndUpdate(id, { avatarPath: fileKey }).exec();
      return await this.findProfileByUserId(id);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findByEmail (email: string): Promise<User> {
    return await this.userModel.findOne ({ email }).exec();
  }

  async findByFacebookId (facebookId: string): Promise<User> {
    return await this.userModel.findOne ({ facebookId }).exec();
  }

  async findById (uId: string): Promise<User> {
    return await this.userModel.findById(uId);
  }

    async findUserByCredentials(email: string, password: string): Promise<User|null> {
      const user = await this.userModel.findOne({email}).exec();
      if (!user) {
        return null;
      }
      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? user : null;
    }

    async findProfileByUserId(id: string) {
      const user = await this.userModel.findById(id).exec();
      return this.convertToPlainObject(user);
    }

    async findByEmailOrCreateNewUser(user): Promise<User> {
      const userFromDb = await this.findByEmail(user.email);
      if(userFromDb) {
        return userFromDb;
      }
      const createdUser = new this.userModel({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatarPath: user.picture,
        notificationTime: DEFAULT_NOTIFICATION_TIME,
        timeZone: user.timeZone,
      });
      createdUser.createdAt = new Date();
      createdUser.save();
      return createdUser;
    }

    async findByFacebookIdOrCreateNewUser({ name, lastName, facebookId }: any): Promise<User> {
      const userFromDb = await this.findByFacebookId(facebookId);
      if(userFromDb) {
        return userFromDb;
      }
      const createdUser = new this.userModel({
        name,
        lastName,
        facebookId
      });
      
      createdUser.createdAt = new Date();
      createdUser.save();
      return createdUser;
    }

    convertToPlainObject(user) {
      if (!user) {
        return null;
      }
      function gerUserPath(path) {
        if (!path) {
          return null;
        }
        if (!user.avatarPath.startsWith('http')) {
          return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${user.avatarPath}`;
        }
        return path;
      }

      return {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatarPath: gerUserPath(user.avatarPath),
        notificationTime: user.notificationTime || DEFAULT_NOTIFICATION_TIME,
        timeZone: user.timeZone,
      };
    }

    async findToNotify(lastRun: Date, current: Date): Promise<User[]> {
      const timeZones: string[] = await this.userModel.distinct('timeZone');
     
      const requests: any = timeZones.map((timeZone: string) => {
        let request: any;

        const timeOffset: number = getTimezoneOffset() - getTimezoneOffset(timeZone);
        const from: number = dateToNumberOfMinutesAM(lastRun, timeOffset);
        const till: number = dateToNumberOfMinutesAM(current, timeOffset);

        if (from <= till) {
          request = {
            'notificationTime': { $gt: from, $lte: till }
          };
        } else {
          request = {
            $or: [
              {
                'notificationTime': { $gt: from, $lte: MAX_NOTIFICATION_TIME }
              },
              {
                'notificationTime': { $gte: 0, $lte: till }
              }
            ]
          };
        }

        return {
          timeZone,
          ...request
        }
      });
      
      if (requests.length === 0) {
        return Promise.resolve([]);
      }

      return this.userModel.find({ $and: requests }).exec();
    }

    async confirmEmail(token: string): Promise<boolean> {
      const res = await this.userModel.updateOne({
        'emailVerification.token': token
      }, {
        $set: { 'emailVerification.verifiedAt': new Date() }
      }).exec();

      return res.nModified > 0;
    }  
}
