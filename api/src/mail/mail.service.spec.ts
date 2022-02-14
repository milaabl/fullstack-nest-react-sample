import { MailService } from './mail.service';

describe('MailService', () => {
  let sut: any;
  let configService: any;
  let emailService: any;

  beforeEach(() => {
    configService = {
      get: (key: string) => key
    };

    emailService = {
      send: jest.fn()
    };

    sut = new MailService(configService, emailService);
  });

  describe('sendEmail', () => {
    it('should send email', () => {
      sut.sendEmail({ to: 'to@email.com' });
      expect(emailService.send).toHaveBeenCalledWith({
        from: 'Blomstergard Robot <AWS_EMAIL_FROM>',
        to: 'to@email.com'
      });
    });
  });
});
