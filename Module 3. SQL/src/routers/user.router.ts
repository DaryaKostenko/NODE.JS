import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import { TYPES } from '../config/inversify.types';
import IUserController from '../controllers/user-controller.interface';
import { autoSuggestSchema, userCreateSchema, userUpdateSchema } from '../models/user/schemas';
import { IRouter } from './router.interface';

@injectable()
class UserRouter implements IRouter {
    private validator = createValidator();

    constructor(
        @inject(TYPES.UserController) private userController: IUserController
    ) {}

    init(): Router {
        return Router()
        .get('/', this.validator.query(autoSuggestSchema),
            this.userController.getUsers
        )
        .get('/:id',
            this.userController.getUser
        )
        .post('/',
            this.validator.body(userCreateSchema),
            this.userController.createUser
        )
        .put('/:id',
            this.validator.body(userUpdateSchema),
            this.userController.updateUser
        )
        .delete('/:id',
            this.userController.getUsers
        );
    }
}

export default UserRouter;
