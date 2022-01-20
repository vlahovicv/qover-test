import { User } from "../schemas/user.schema"

export class ResponseDataDto {
    user: User
    token: string
}