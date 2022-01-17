import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt'
import { UserNotFoundException } from "./exceptions/UserNotFound.exception";
import { UserAlreadyExistsException } from "./exceptions/UserAlreadyExists.exception";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findUser(userDataDto): Promise<User> {
        const { email } = userDataDto
        const user: User = await this.userModel.findOne({email});
        if(!user) {
            throw new UserNotFoundException(email)
        }
        else {
            return user
        }
    }

    async createUser(userDataDto): Promise<User> {
        const { email } = userDataDto
        const existingUser = await this.userModel.findOne({ email }).exec();
        if(existingUser) {
            throw new UserAlreadyExistsException(email)
        }
        userDataDto.password = await this.hashPassword(userDataDto.password)
        const createdUser = new this.userModel(userDataDto);
        const user: User = await createdUser.save();
        return user
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}