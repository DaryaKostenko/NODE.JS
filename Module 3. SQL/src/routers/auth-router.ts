import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import { TYPES } from '../config/inversify.types';
import IAuthController from '../controllers/auth-controller.interface';
import { authSchema, refreshSchema } from '../models/auth/schemas';
import { IRouter } from './router.interface';


@injectable()
export class AuthRouter implements IRouter {
    private validator = createValidator();
    
    constructor(@inject(TYPES.AuthController) private controller: IAuthController){}
    
    init(): Router {
        return Router()
            .post('/',
                this.validator.body(authSchema),
                this.controller.login)
            .post('/refresh',
                this.validator.body(refreshSchema),
                this.controller.refresh);
    }
}