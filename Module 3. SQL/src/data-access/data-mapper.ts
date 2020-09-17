import { UserModel } from "../models/user.model";
import { User } from "../models/user.interface";
import { Model } from "sequelize/types";

export class DataMapper {
    toDomain(user: UserModel): User {
        const { isdeleted, id, login, password, age} = user;
        return { id, login, password, age, isdeleted: isdeleted };
    }

    // toDalEntity(user: User): UserModel {
    //     const { isdeleted, ...others} = user;
       
    //     return {...others, isdeleted};
    // }
}