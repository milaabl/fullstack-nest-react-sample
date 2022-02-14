import * as crypto from 'crypto';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { MockMongooseModel } from '../utils/mock-mongoose-model';

describe('AuthService', () => {
  let sut: any;
  let usersService: UsersService;
  let mailService: MailService;
  let configService: any;

  beforeEach(() => {
    const jwtService = new JwtService({});
    configService = {
      get: jest.fn().mockReturnValue('http://localhost')
    };
    sut = new AuthService( usersService, mailService, configService, jwtService, MockMongooseModel as any);
  });

  describe('generateToken', () => {
    it('should return token', () => {
      jest.spyOn(crypto, 'randomBytes')
        .mockImplementationOnce(() => ({
          toString: jest.fn()
            .mockReturnValue('token')
        }))
      expect(sut.generateToken())
        .toBe('token');
    });
  });
});
