import { HttpException, HttpStatus } from "@nestjs/common";


export class BadTokenException extends HttpException {
    constructor() {
        super(`Please provide valid token`, HttpStatus.UNAUTHORIZED);
    }
}