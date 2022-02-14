import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VerifyCallback } from 'passport-google-oauth20';
import * as PassportFacebook from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';

import { STRATEGIES } from '../auth.constants';

const { FACEBOOK } = STRATEGIES;

@Injectable()
export class FacebookStrategy extends PassportStrategy(PassportFacebook, FACEBOOK) { 
    constructor(
        configService: ConfigService,
    ) {
        super({
            clientID: configService.get('FACEBOOK_CLIENT_ID'),
            clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
            callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
            profileFields: ['email', 'name', 'photos'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { id, name, emails, photos } = profile
        const user = {
            email: emails ? emails[0].value : '',
            facebookId: id,
            name: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }

        return done(null, user);
    }
}