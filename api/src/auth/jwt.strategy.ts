import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { COOKIE_TOKEN_KEY } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: JwtStrategy.extractTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  static extractTokenFromCookie(req) {
    return req.cookies && req.cookies[COOKIE_TOKEN_KEY] || null;
  }

  validate(payload): { id: string } {
    return { id: payload.sub };
  }
}
