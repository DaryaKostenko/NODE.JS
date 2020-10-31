import { Model } from 'sequelize';

import { Group } from './group.interface';
import { Permissions } from './permissions';

export class GroupModel extends Model implements Group {
    id!: string;
    name!: string;
    permissions!: Array<Permissions>;
}
