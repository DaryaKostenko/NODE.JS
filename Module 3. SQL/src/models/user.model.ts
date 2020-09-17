import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user.interface";

export class UserModel extends Model implements User {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isdeleted!: boolean;
}

UserModel.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
            isUUID: 4
        }
    },
    login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            is: /^(?=.*[a-zA-Z])(?=.*[0-9])/
        },

    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            min: 3,
            max: 130
        }
    },
    isdeleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
    }
},
    {
        tableName: "users",
        sequelize: sequelize,
        timestamps: false
    });

//UserModel.sync();