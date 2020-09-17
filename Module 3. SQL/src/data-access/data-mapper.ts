import { UserModel } from "../models/user.model";
import { User } from "../models/user.interface";

export class DataMapper {
    toDomain(user: UserModel): User {
        const { isdeleted, id, login, password, age} = user;
        return { id, login, password, age, isdeleted: isdeleted };
    }
}