import { Group } from './group.interface';
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Permissions } from './permissions';

export class GroupModel extends Model implements Group {
    id!: string;
    name!: string;
    permissions!: Array<Permissions>
}

GroupModel.init({
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
        type: DataTypes.ARRAY,
    }
},
{
    tableName: "groups",
    sequelize: sequelize,
    timestamps: false
});