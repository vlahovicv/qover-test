import { HttpException, HttpStatus } from "@nestjs/common";


export class UserAlreadyExistsException extends HttpException {
    constructor(private email: string) {
        super(`User with email: ${email} alerady exists`, HttpStatus.BAD_REQUEST)
    }
}