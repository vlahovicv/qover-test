import { Body, ClassSerializerInterceptor, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDataDto } from './dto/response-data.dto';
import { UserDataDto } from './dto/user-data.dto';
import { HttpExceptionFilter } from '../filters/HttpException.filter';

@Controller('/api')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Post('signup')
    async signUp(
      @Body() userData: UserDataDto,
    ): Promise<ResponseDataDto> {
       return this.authService.createUser(userData);
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Post('/login')
    async logIn(
      @Body() createUserDto: UserDataDto,
    ): Promise<any> {
      return this.authService.findUser(createUserDto);
    }
}