import { inject, injectable } from 'inversify';

import { TYPES } from '../config/inversify.types';
import IUserDal from '../data-access/user-dal.interface';
import { LogClass } from '../decorators/logger.decorator';
import { UserSearchOptions } from '../models/user/search-options.interface';
import { User } from '../models/user/user.interface';
import IUserService from './user-service.interface';

@LogClass
@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.UserDal) private userDal: IUserDal
    ) {}

    async getUsers(options: UserSearchOptions): Promise<Array<User>> {
        return await this.userDal.getUsers(options);
    }

    async getUserById(id: string): Promise<User | null> {
       return this.userDal.getUser(id);
    }

    async createUser(user: User): Promise<User> {
        return await this.userDal.createUser(user);
    }

    async updateUser(user: User): Promise<User | undefined> {
        return await this.userDal.updateUser(user);
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userDal.deleteUser(id);
    }
}

export default UserService;
