import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize('users', 'postgres', '', {
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres'
});

export function InitDatabase(): Sequelize {
    const user = sequelize.define('UserModel', {
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
        timestamps: false
    });

    const group = sequelize.define('GroupModel', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/
            }
        },
        permissions: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.STRING),
        }
    },
    {
        tableName: "groups",
        timestamps: false
    });

    const userGroup = sequelize.define('UserGroupModel',{
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        groupId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
    },
    {
        tableName: "userGroup",
        timestamps: false
    });
        
        
    user.belongsToMany(group, { through: userGroup, foreignKey: 'userId', onDelete: 'CASCADE', timestamps: false });
    group.belongsToMany(user, { through: userGroup, foreignKey: 'groupId', onDelete: 'CASCADE', timestamps: false });

    return sequelize;
}

