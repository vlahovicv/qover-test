import { Exclude } from "class-transformer";

export class SerializedUser {
    _id: string;
    email: string;

    @Exclude()
    password: string;

    @Exclude()
    __v: number;

    constructor(partial: Partial<SerializedUser>) {
        const partialUser = {
            id: partial._id.toString(),
            email: partial.email, 
        };
        Object.assign(this, partialUser);
    }
}
