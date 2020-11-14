import { UserSearchOptions } from '../models/user/search-options.interface';
import { User } from '../models/user/user.interface';

export interface IUserDal {
    getUser(id: string): Promise<User | null>;
    getUsers(options: UserSearchOptions): Promise<Array<User>>;
    getUserId(login: string, password: string): Promise<string | undefined>
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

export default IUserDal; 