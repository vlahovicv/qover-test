import { User } from "../schemas/user.schema"
import { SerializedUser } from "../types/SerializedUser"

export class ResponseDataDto {
    user: User
    token: string
}