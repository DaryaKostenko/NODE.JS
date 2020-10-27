"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('users', 'postgres', 'onelife111', {
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres'
});
function InitDatabase() {
    const user = exports.sequelize.define('UserModel', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        login: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/
            }
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                is: /^(?=.*[a-zA-Z])(?=.*[0-9])/
            },
        },
        age: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                min: 3,
                max: 130
            }
        },
        isdeleted: {
            allowNull: false,
            defaultValue: false,
            type: sequelize_1.DataTypes.BOOLEAN
        }
    }, {
        tableName: "users",
        timestamps: false
    });
    const group = exports.sequelize.define('GroupModel', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/
            }
        },
        permissions: {
            allowNull: false,
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        }
    }, {
        tableName: "groups",
        timestamps: false
    });
    const userGroup = exports.sequelize.define('UserGroupModel', {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        groupId: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
    }, {
        tableName: "userGroup",
        timestamps: false
    });
    user.belongsToMany(group, { through: userGroup, foreignKey: 'userId', onDelete: 'CASCADE', timestamps: false });
    group.belongsToMany(user, { through: userGroup, foreignKey: 'groupId', onDelete: 'CASCADE', timestamps: false });
    return exports.sequelize;
}
exports.InitDatabase = InitDatabase;
