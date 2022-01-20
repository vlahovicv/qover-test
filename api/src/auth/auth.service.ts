import { Injectable } from '@nestjs/common';
import { UserDataDto } from './dto/user-data.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { ResponseDataDto } from './dto/response-data.dto';
import { SerializedUser } from './types/SerializedUser';
import * as bcrypt from 'bcrypt'
import { User } from './schemas/user.schema';
import { BadPasswordException } from './exceptions/BadPassword.exception';
import { defaultTokenExp, rememberUserTokenExp } from './values';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async findUser(userDataDto: UserDataDto): Promise<ResponseDataDto> {
        const user: User = await this.userRepository.findUser(userDataDto);
        if(!(await bcrypt.compare(userDataDto.password, user.password))) {
            throw new BadPasswordException();
        }
        const token = this.getTokenForUser(user.email, userDataDto.rememberUser);

        return {
            user: new SerializedUser(user),
            token
        };
    }

    async createUser(userDataDto: UserDataDto): Promise<ResponseDataDto> {
        const user: User = await this.userRepository.createUser(userDataDto);
        const token = this.getTokenForUser(user.email, userDataDto.rememberUser);
        
        return {
            user: new SerializedUser(user),
            token
        };
    }
    
    public getTokenForUser(email, rememberUser): string {
        return this.jwtService.sign({
            sub: email,
            expiresIn: rememberUser ? rememberUserTokenExp : defaultTokenExp  
        });
    }

}
