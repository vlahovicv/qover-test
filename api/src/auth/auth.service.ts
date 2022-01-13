import { Injectable } from '@nestjs/common';
import { UserDataDto } from './dto/user-data.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { ResponseDataDto } from './dto/response-data.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async createUser(userDataDto: UserDataDto): Promise<ResponseDataDto> {
        console.log(userDataDto)
        const email: string = await this.userRepository.createUser(userDataDto)
        if(email) {
            const token = this.getTokenForUser(email)
            return {
                email,
                token
            }
        }
    }
    async findUser(userDataDto: UserDataDto): Promise<ResponseDataDto> {
        const email: string = await this.userRepository.findUser(userDataDto)
        if(email) {
            const token = this.getTokenForUser(email)
            return {
                email,
                token
            }
        }
    }
    public getTokenForUser(email): string {
        return this.jwtService.sign({
            sub: email,
            expiresIn: 3600
        })
    }
}
