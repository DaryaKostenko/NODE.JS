import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import { TYPES } from '../config/inversify.types';
import { authRequestSchema, refreshRequestSchema } from '../models/auth/schemas';
import IAuthService from '../services/auth.service.interface';
import IAuthController from './auth-controller.interface';

@injectable()
export class AuthController implements IAuthController {
    constructor(@inject(TYPES.AuthService) private authService: IAuthService) { }

    login = async (req: ValidatedRequest<authRequestSchema>, res: Response): Promise<void> => {
        const { login, password } = req.body;
        await this.authService.login(login, password)
            .then(tokens => res.json(tokens));
    }

    refresh = async (req: ValidatedRequest<refreshRequestSchema>, res: Response): Promise<void> => {
        const { token } = req.body;
        await this.authService.refresh(token)
            .then(tokens => res.json(tokens));
    }
}

export default AuthController;