import { injectable } from 'inversify';

import { User } from '../../models/user/user.interface';
import { UserModel } from '../../models/user/user.model';
import { IUserMapper } from './user-data-mapper.interface';

@injectable()
export class UserDataMapper implements IUserMapper{
    toDomain(user: UserModel): User {
        const { isdeleted, id, login, password, age} = user;
        return { id, login, password, age, isdeleted: isdeleted };
    }
}

export default UserDataMapper;