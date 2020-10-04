import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { User } from "./user.interface";

export class UserModel extends Model implements User {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isdeleted!: boolean;
}

//UserModel.sync();