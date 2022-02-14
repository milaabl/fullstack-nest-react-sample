import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let sut: any;
  let user: any;
  let usersService: any;
  let authService: any;
  let configService: any;
  let mailService: any;

  beforeEach(() => {
    user = {
      save: jest.fn()
    };

    usersService = {
      createUser: jest.fn()
        .mockReturnValue(Promise.resolve(user)),
      confirmEmail: jest.fn()
        .mockReturnValue(Promise.resolve(true))
    };

    authService = {
      generateToken: jest.fn()
        .mockReturnValue('token')
    };

    configService = {
      get: (key: string) => key      
    };

    mailService = {
      sendEmail: jest.fn()
    };

    sut = new AuthController(usersService, authService, configService, mailService);
  });

  describe('register', () => {
    beforeEach(() => {
      sut.register('createUserDto');
    });

    it('should create new User in the DB', () => {
      expect(usersService.createUser)
        .toHaveBeenCalledWith('createUserDto');                
    });

    it('should generate verification code that would be sent via Email in order to verify user email address', async () => {
      sut.register('createUserDto').then(() => {
        expect(user.emailVerifiction.token)
          .toBe('token');
      });
    });

    it('should save User with verification code to the DB', () => {
      expect(user.save)
        .toHaveBeenCalled();
    });
  });

  describe('confirmEmail', () => {
    let response: any;
    
    beforeEach(async () => {
      response = await sut.confirmEmail('confirm-token');
    });

    it('should pass token to userService', () => {
      expect(usersService.confirmEmail)
        .toHaveBeenCalledWith('confirm-token');
    });

    it('should return redirect params', () => {
      expect(response)
        .toEqual({
          url: 'CLIENT_BASE_URL/confirm-email/success',
          statusCode: 308
        });
    });
  })
});
