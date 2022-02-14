import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

import { MockMongooseModel } from '../utils/mock-mongoose-model';
import { UsersService, SALT_ROUNDS } from './users.service';


describe('UsersService', () => {
  let sut: any;

  beforeEach(() => {
    sut = new UsersService(MockMongooseModel as any);
  });

  describe('createUser', () => {
    let bcryptHashSpy;

    beforeEach(() => {
      bcryptHashSpy = jest.spyOn(bcrypt, 'hash')
        .mockReturnValue(Promise.resolve('password-hash'));
    });
    afterEach(() => {
      bcryptHashSpy.mockRestore();
    });

    it('should set password hash', async () => {
      const user = await sut.createUser({
        password: 'password',
        email: 'email'
      });
      expect(user.password)
        .toBe('password-hash');
    });

    it('should set createdAt', async () => {
      const mockDate = new Date(0);
      const spy: jest.SpyInstance = jest.spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      const user = await sut.createUser({ email: 'email' });

      expect(user.createdAt)
        .toBe(new Date(0));

      spy.mockRestore();
    });

    it('should throw exception WHEN user already exists', async () => {
      const revertFindOne: any = MockMongooseModel.findOne;
      MockMongooseModel.findOne = () => ({
        exec: () => Promise.resolve('existed-user')
      });

      await expect(sut.createUser({ email: 'email' })).rejects
        .toThrow(new HttpException('User already exists', HttpStatus.FORBIDDEN));
      
        MockMongooseModel.findOne = revertFindOne;       
    });
  });

  describe('findUserByEmail', () => {
    it('should calls UsersService.findByEmail() and succesffuly retrieve and return the user', async () => {
        const mockUser = {_id: 'someid', email: 'example@email.com'};
        const { email } = mockUser;

        const revertFindOne: any = MockMongooseModel.findOne;
        MockMongooseModel.findOne = jest.fn(() =>
          ({exec: jest.fn(() => Promise.resolve(mockUser))}));
        const user = await sut.findByEmail(mockUser.email);
        expect(user).toEqual(mockUser);
        expect(MockMongooseModel.findOne).toHaveBeenCalledWith({email});
  
        MockMongooseModel.findOne = revertFindOne;

      MockMongooseModel.findOne = revertFindOne;
    });
  });

  describe('#findUserByCredentials', () => {
    const email = 'some@email.com';
    const passwordRaw = 'some-password';

    it('should return user if User credentials are correct', async () => {
      const hash = await bcrypt.hash(passwordRaw, SALT_ROUNDS);
      const userFromDb = {email, password: hash};
      const userToCheck = {email, password: passwordRaw};

      const revertFindOne: any = MockMongooseModel.findOne;
      MockMongooseModel.findOne = jest.fn(() =>
        ({exec: jest.fn(() => Promise.resolve(userFromDb))}));

      const result = await sut.findUserByCredentials(userToCheck.email, userToCheck.password);
      expect(result).toBe(userFromDb);
      expect(MockMongooseModel.findOne).toHaveBeenCalledWith({email});

      MockMongooseModel.findOne = revertFindOne;
    });

    it('should return FALSE user if User email was NOT found', async () => {
      const userFromDb = null;
      const userToCheck = {email: 's@s.com', password: 'some'};

      const revertFindOne: any = MockMongooseModel.findOne;
      MockMongooseModel.findOne = jest.fn(() =>
        ({exec: jest.fn(() => Promise.resolve(userFromDb))}));

      const result = await sut.findUserByCredentials(userToCheck.email, userToCheck.password);
      expect(result).toBe(null);
      expect(MockMongooseModel.findOne).toHaveBeenCalledWith({email: userToCheck.email});

      MockMongooseModel.findOne = revertFindOne;
    });

    it('should return FALSE user if User credentials are NOT correct', async () => {
      const hash = await bcrypt.hash(passwordRaw, SALT_ROUNDS);
      const userFromDb = {email, password: hash};
      const userToCheck = {email, password: "some-incorrect-hash"};

      const revertFindOne: any = MockMongooseModel.findOne;
      MockMongooseModel.findOne = jest.fn(() =>
        ({exec: jest.fn(() => Promise.resolve(userFromDb))}));

      const result = await sut.findUserByCredentials(userToCheck.email, userToCheck.password);
      expect(result).toBe(null);
      expect(MockMongooseModel.findOne).toHaveBeenCalledWith({email});

      MockMongooseModel.findOne = revertFindOne;
    });
  });

  describe('confirmEmail', () => {
    it('should update userModel with virifiedAt', async () => {
      sut.userModel.updateOne = jest.fn()
        .mockReturnValue({
          exec: jest.fn()
            .mockReturnValue({ nModified: 1 })
        });

      const mockDate = new Date(0);
      const spy: jest.SpyInstance = jest.spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);
  
      await sut.confirmEmail('token');
  
      expect(sut.userModel.updateOne)
        .toHaveBeenCalledWith({
          'emailVerification.token': 'token'
        }, {
          $set: { 'emailVerification.verifiedAt': new Date(0) }
        });
        
      spy.mockRestore();
    });
  });
});
