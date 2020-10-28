import { inject, injectable } from 'inversify';
import { Op } from 'sequelize';

import { TYPES } from '../config/inversify.types';
import { LogClass } from '../decorators/logger.decorator';
import { UserSearchOptions } from '../models/user/search-options.interface';
import { User } from '../models/user/user.interface';
import { UserModel } from '../models/user/user.model';
import { IUserMapper } from './mappers/user-data-mapper.interface';
import IUserDal from './user-dal.interface';

@LogClass
@injectable()
export class UserDal implements IUserDal {

    constructor(@inject(TYPES.UserMapper) private dataMapper: IUserMapper) { }

    async getUser(id: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { id } });
        return user ? this.dataMapper.toDomain(user) : null;
    }

    async getUsers(options: UserSearchOptions): Promise<Array<User>> {
        const users = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${options.loginSubstring || ""}%`,
                },
            },
            limit: options.limit || 10,
            order: [["login", "ASC"]],
        });
        return users.map((user) => this.dataMapper.toDomain(user));
    }

    async createUser(user: User): Promise<User> {
        const userDal = await UserModel.create(user);
        return this.dataMapper.toDomain(userDal);
    }

    async updateUser(user: User): Promise<User> {
        const id = user.id;
        await UserModel.update(user, { where: { id } });
        return user;
    }

    async deleteUser(id: string): Promise<User> {
        const userDal = await UserModel.update(
            { isdeleted: true },
            { where: { id } }
        );
        return this.dataMapper.toDomain(userDal[1][0]);
    }
}

export default UserDal;
