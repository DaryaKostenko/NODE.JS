import { UserDal } from './../data-access/user-dal';
import { User } from "../models/user/user.interface";
import { SearchOptions } from '../models/user/search-options.interface';

export class UserService {

    userDal: UserDal = new UserDal();

    async getUsers(options: SearchOptions): Promise<Array<User>> {
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
