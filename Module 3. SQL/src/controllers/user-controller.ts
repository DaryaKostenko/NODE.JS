import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { v4 as uuidv4 } from 'uuid';

import { autoSuggestRequestSchema, userRequestSchema } from '../models/user/schemas';
import { User } from '../models/user/user.interface';
import { UserService } from '../services/users.service';

const defaultUserLimit = 2;

export class UserController {
    private readonly _userService = new UserService();

    async getUsers(req: ValidatedRequest<autoSuggestRequestSchema>, res: Response): Promise<Response<any>> {
        const { loginSubstring, limit = defaultUserLimit } = req.query;
        const users = await this._userService.getUsers({ loginSubstring, limit });
        return res.json(users);
    }

    async getUser(req: Request, res: Response): Promise<Response<any>> {
        const user = await this._userService.getUserById(req.params.id);
        return res.json(user);
    }

    async createUser(req: Request, res: Response): Promise<Response<any>> {
        const userRequest: User = req.body;
        const user = await this._userService.createUser({...userRequest, id: uuidv4()});
        return res.json(user);
    }

    async updateUser(req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>> {
        const userRequest: User = req.body;
        try{
            const user = await this._userService.updateUser(userRequest);
            return res.json(user);
        }
        catch(err) {
            return res.status(409).json(err.message);
        }
    }

    async deleteUser(req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>> {
        try {
            const user = await this._userService.deleteUser(req.params.id);
            return res.json(user);
        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }
}
