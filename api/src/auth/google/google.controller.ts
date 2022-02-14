import { Controller, Get, Req, UseGuards, Redirect, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { STRATEGIES } from '../auth.constants';
import { UsersService } from '../../users/users.service';

const { GOOGLE } = STRATEGIES;

@Controller('auth/google')
export class GoogleController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) { }

    @Get()
    @UseGuards(AuthGuard(GOOGLE))
    async googleAuth(@Req() req) {}

    @Get('redirect')
    @UseGuards(AuthGuard(GOOGLE))
    async googleAuthRedirect(
        @Req() req,
        @Res() res,
    ) {
      const checkedUser = await this.userService.findByEmailOrCreateNewUser(req.user);
      await this.authService.login(checkedUser, res);
      res.redirect(`${process.env.CLIENT_BASE_URL}/shelves`);
    }
}
