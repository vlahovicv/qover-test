import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BadTokenException } from "../exceptions/BadTokenException";

@Injectable()
export class AuthGuardJwt extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
    handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new BadTokenException()
        }
        return user;
    }
}