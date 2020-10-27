import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { autoSuggestRequestSchema, userRequestSchema } from '../models/user/schemas';

export interface IUserController {
    getUsers(req: ValidatedRequest<autoSuggestRequestSchema>, res: Response): Promise<Response<any>>;
    getUser(req: Request, res: Response): Promise<Response<any>>;
    createUser(req: Request, res: Response): Promise<Response<any>>;
    updateUser(req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>>;
    deleteUser(req: ValidatedRequest<userRequestSchema>, res:Response): Promise<Response<any>>;
}

export default IUserController;