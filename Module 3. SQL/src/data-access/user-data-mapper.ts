import { UserModel } from "../models/user/user.model";
import { User } from "../models/user/user.interface";

export class UserDataMapper {
    toDomain(user: UserModel): User {
        const { isdeleted, id, login, password, age} = user;
        return { id, login, password, age, isdeleted: isdeleted };
    }
}