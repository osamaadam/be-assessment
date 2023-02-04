import { Injectable, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../user/entities/user.entity";
import { jwtConstants } from "../constants";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  validate(@Req() req: Request, user: Partial<User>) {
    const { id, email, username } = user;
    const refreshTokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const refreshToken = refreshTokenExtractor(req);
    return {
      id,
      email,
      username,
      refreshToken,
    };
  }
}