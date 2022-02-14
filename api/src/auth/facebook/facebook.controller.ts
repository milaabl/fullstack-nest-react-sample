import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { STRATEGIES } from '../auth.constants';
import { UsersService } from '../../users/users.service';

const { FACEBOOK } = STRATEGIES;

// TODO: investigate, probably can be merged with FacebookController as 
// it does the same thing conceptually
@Controller('auth/facebook')
export class FacebookController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  
  @Get()
  @UseGuards(AuthGuard(FACEBOOK))
  async getTokenAfterFacebookSignIn(@Req() req) {
  }

  @Get('redirect')
  @UseGuards(AuthGuard(FACEBOOK))
  async facebookAuthRedirect(
    @Req() req,
    @Res() res,
  ) {
    let checkedUser: any;
    if (req.user.email) {
      checkedUser = await this.usersService.findByEmailOrCreateNewUser(req.user);
    } else {
      checkedUser = await this.usersService.findByFacebookIdOrCreateNewUser(req.user);
    }   

    await this.authService.login(checkedUser, res);
    res.redirect(`${process.env.CLIENT_BASE_URL}/shelves`);
  }
}