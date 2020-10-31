import { ValidatedRequest } from 'express-joi-validation';
import { Response } from 'express';
import { authRequestSchema, refreshRequestSchema } from '../models/auth/schemas';

export interface IAuthController {
    login(req: ValidatedRequest<authRequestSchema>, res: Response): Promise<void>;
    refresh(req: ValidatedRequest<refreshRequestSchema>, res: Response): Promise<void>;
}
export default IAuthController;