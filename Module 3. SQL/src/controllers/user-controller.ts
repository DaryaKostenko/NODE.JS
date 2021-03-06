import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import { TYPES } from '../config/inversify.types';
import { autoSuggestRequestSchema, userRequestSchema } from '../models/user/schemas';
import { User } from '../models/user/user.interface';
import IUserService from '../services/user-service.interface';
import IUserController from './user-controller.interface';

const defaultUserLimit = 2;

@injectable()
export class UserController implements IUserController {

    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) {}

    getUsers = async (req: ValidatedRequest<autoSuggestRequestSchema>, res: Response): Promise<Response<any>> => {
        const { loginSubstring, limit = defaultUserLimit } = req.query;
        const users = await this.userService.getUsers({ loginSubstring, limit });
        return res.json(users);
    }

    getUser = async (req: Request, res: Response): Promise<Response<any>> => {
        const user = await this.userService.getUserById(req.params.id);
        return res.json(user);
    }

    createUser = async (req: Request, res: Response): Promise<Response<any>> => {
        const userRequest: User = req.body;
        const user = await this.userService.createUser({...userRequest, id: uuidv4()});
        return res.json(user);
    }

    updateUser = async (req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>> => {
        const userRequest: User = req.body;
        try{
            const user = await this.userService.updateUser(userRequest);
            return res.json(user);
        }
        catch(err) {
            return res.status(409).json(err.message);
        }
    }

    deleteUser = async (req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>> => {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            return res.json(user);
        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }
}

export default UserController;
