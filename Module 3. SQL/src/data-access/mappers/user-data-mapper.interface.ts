import { User } from "../../models/user/user.interface";
import { UserModel } from "../../models/user/user.model";

export interface IUserMapper {
    toDomain(entity: UserModel): User
} 
