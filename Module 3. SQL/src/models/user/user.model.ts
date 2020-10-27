import { Model } from 'sequelize';

import { User } from './user.interface';

export class UserModel extends Model implements User {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isdeleted!: boolean;
}
