import { Body, Controller, Get, Post, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDataDto } from './dto/response-data.dto';
import { UserDataDto } from './dto/user-data.dto';
import { AuthGuardJwt } from './jwt/auth-guard.jwt';

@Controller('/api')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    

    @UseGuards(AuthGuardJwt)
    @Post('signup')
    async signUp(
      @Body() userData: UserDataDto,
    ): Promise<ResponseDataDto> {
       return this.authService.createUser(userData);
    }
    
    @Post('/login')
    async logIn(
      @Body() createUserDto: UserDataDto,
    ): Promise<ResponseDataDto> {
      return this.authService.findUser(createUserDto);
    }
}