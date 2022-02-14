import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../users/schemas/user.schema';
import { NotificationsService } from '../notifications.service';

@UseGuards(JwtAuthGuard)
@Controller('pusher')
export class PusherController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get('/beams-auth')
  beamsAuth(@GetUser() { id }: User) {
    return this.notificationService.getBeamsClient().generateToken(id);
  }
}
