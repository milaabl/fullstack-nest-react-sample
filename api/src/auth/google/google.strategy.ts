import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { STRATEGIES } from '../auth.constants';

const { GOOGLE } = STRATEGIES;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, GOOGLE) {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: ['email', 'profile'],
            prompt: ['']
        })
    }

    authorizationParams(options: any): any {
      return Object.assign(options, {
        prompt: 'select_account'
      });
    }

    async validate (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            name: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        return done(null, user);
    }
}
