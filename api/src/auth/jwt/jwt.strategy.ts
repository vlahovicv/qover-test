import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<boolean> {
    let expired: boolean = false;
        if (payload) {
            const tokenExp: Date = new Date(payload.exp * 1000);
            expired = tokenExp.getTime() < new Date().getTime();
            if (expired) {
                return false
            }
            return true
        }
  }
}
