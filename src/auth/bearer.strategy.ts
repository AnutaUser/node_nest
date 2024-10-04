import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Strategy } from 'passport';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import * as process from 'node:process';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SCRET_KEY || 'Secret',
    });
  }

  async validate(token: string): Promise<User> {
    let user: User = null;
    try {
      const payload = await this.jwtService.verify(token);
      user = await this.authService.validateUser(payload);
    } catch (e) {
      console.log(
        new Date().toISOString(),
        ' [JWT USER VERIFY ERROR] ',
        JSON.stringify(e),
        ' [TOKEN] ',
        token,
      );
      throw new UnauthorizedException();
    }

    return user;
  }
}
