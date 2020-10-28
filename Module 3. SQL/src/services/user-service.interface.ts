import { UserSearchOptions } from '../models/user/search-options.interface';
import { User } from '../models/user/user.interface';

export interface IUserService {
    getUsers(options: UserSearchOptions): Promise<Array<User>>;
    getUserById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User | undefined>;
    deleteUser(id: string): Promise<User>;
}

export default IUserService; 