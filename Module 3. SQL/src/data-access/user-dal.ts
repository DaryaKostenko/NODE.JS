import { DataMapper } from "./data-mapper";
import { User } from "../models/user/user.interface";
import { UserModel } from "../models/user/user.model";
import { SearchOptions } from "../models/user/search-options.interface";
import { Op } from "sequelize";

export class UserDal {
  dataMapper: DataMapper = new DataMapper();

  async getUser(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { id } });
    return user ? this.dataMapper.toDomain(user) : null;
  }

  async getUsers(options: SearchOptions): Promise<Array<User>> {
    const users = await UserModel.findAll({
      where: {
        login: {
          [Op.like]: `%${options.loginSubstring || ''}%`
        }
      },
      limit: options.limit || 10,
      order: [['login', 'ASC']]
    });
    return users.map(user => this.dataMapper.toDomain(user));
  }

  async createUser(user: User): Promise<User> {
    const userDal = await UserModel.create(user);
    return this.dataMapper.toDomain(userDal);
  }

  async updateUser(user: User): Promise<User> {
    const id = user.id;
    await UserModel.update(user,
      { where: { id } }
    );
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