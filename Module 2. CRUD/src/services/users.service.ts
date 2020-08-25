import { User } from "../models/user.interface";
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    private users: Array<User> = [
        {
            id: uuidv4(),
            login: 'user1',
            password: 'password1',
            age: 20,
            isDeleted: false
        },
        {
            id: uuidv4(),
            login: 'user2',
            password: 'password2',
            age: 20,
            isDeleted: false
        },
        {
            id: uuidv4(),
            login: 'user3',
            password: 'password3',
            age: 20,
            isDeleted: false
        },
    ];

    getUsers(): Promise<Array<User>> {
        return Promise.resolve(this.users.filter(user => !user.isDeleted));
    }

    getUserById(id: string): Promise<User | undefined> {
       return Promise.resolve(this.users.find(user => user.id === id));
    }

    createUser(user: User): Promise<User | string> {
        if(this.users.some(x => x.login === user.login)) {
           throw new Error(`User with ${user.login} login already exists`);
        }
        this.users.push({...user, id: uuidv4()});
        return Promise.resolve(user);
    }

    updateUser(user: User): Promise<User | string> {
        const userLoginExists = this.users.filter(x => x.id !== user.id).some(x => x.login === user.login);
        if(userLoginExists) {
            throw new Error(`User with ${user.login} login already exists`);
        }
        const index = this.users.findIndex(x => x.id === user.id);
        this.users[index] = {...this.users[index], ...user};
        return Promise.resolve(user);
    }

    async deleteUser(id: string): Promise<User | string> {
        const user = await this.getUserById(id);
        if(user && !user.isDeleted) {
            user.isDeleted = true;
            return Promise.resolve(user);
        }
        else {
            throw new Error('User does not exists');
        }
    }

    getAutoSuggestUsers(login: string, limit: number): Promise<Array<User>> {
        return Promise.resolve(
            this.users.filter((user: User) => user.login.includes(login))
                .sort((a: User, b: User) => a.login > b.login ? 1 : -1)
                .slice(0, limit)
        );
    }
}
