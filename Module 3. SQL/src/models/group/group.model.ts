import { Group } from './group.interface';
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Permissions } from './permissions';

export class GroupModel extends Model implements Group {
    id!: string;
    name!: string;
    permissions!: Array<Permissions>
}
