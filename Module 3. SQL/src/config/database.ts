import { DataTypes, Sequelize } from "sequelize";
import { GroupModel } from "../models/group/group.model";
import { UserModel } from "../models/user/user.model";
import { UserGroupModel } from "../models/userGroup/userGroup.model";

export const sequelize = new Sequelize("users", "postgres", "onelife111", {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
});

export function InitDatabase(): Sequelize {
    UserModel.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                validate: {
                    isUUID: 4,
                },
            },
            login: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/,
                },
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    is: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                },
            },
            age: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    min: 3,
                    max: 130,
                },
            },
            isdeleted: {
                allowNull: false,
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: "users",
            sequelize: sequelize,
            timestamps: false,
        }
    );

    GroupModel.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                validate: {
                    isUUID: 4,
                },
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/,
                },
            },
            permissions: {
                allowNull: false,
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
        },
        {
            tableName: "groups",
            sequelize: sequelize,
            timestamps: false,
        }
    );

    UserGroupModel.init(
        {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                validate: {
                    isUUID: 4,
                },
            },
            groupId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                validate: {
                    isUUID: 4,
                },
            },
        },
        {
            tableName: "userGroup",
            sequelize: sequelize,
            timestamps: false,
        }
    );

    UserModel.belongsToMany(GroupModel, {
        through: UserGroupModel,
        foreignKey: "userId",
        onDelete: "CASCADE",
        timestamps: false,
    });

    GroupModel.belongsToMany(UserModel, {
        through: UserGroupModel,
        foreignKey: "groupId",
        onDelete: "CASCADE",
        timestamps: false,
    });

    return sequelize;
}
