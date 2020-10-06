import { UserGroup } from './userGroup.interface';
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";

export class UserGroupModel extends Model implements UserGroup {
    userId!: string;
    groupId!: string;
}

