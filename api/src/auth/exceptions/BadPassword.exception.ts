import { HttpException, HttpStatus } from "@nestjs/common";


export class BadPasswordException extends HttpException {
    constructor() {
        super('Wrong password, please try again', HttpStatus.BAD_REQUEST)
    }
}