import { Model } from 'sequelize';

import { UserGroup } from './userGroup.interface';

export class UserGroupModel extends Model implements UserGroup {
    userId!: string;
    groupId!: string;
}

