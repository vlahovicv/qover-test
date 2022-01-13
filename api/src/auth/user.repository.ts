import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findUser(userDataDto): Promise<string> {
        const { email } = userDataDto
        const user: User = await this.userModel.findOne({email}).exec();
            if(!(await bcrypt.compare(userDataDto.password, user.password))) {
            throw new UnauthorizedException('Wrong password')
        }
        
        return user.email
    }

    async createUser(userDataDto): Promise<string> {
        userDataDto.password = await this.hashPassword(userDataDto.password)
        const createdUser = new this.userModel(userDataDto);
        const user: User =  await createdUser.save();
        return user.email
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}