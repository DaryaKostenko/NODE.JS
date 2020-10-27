import 'joi-extract-type';

import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import { addUsersRequestSchema, groupSchema, groupsFilterRequestSchema } from '../models/group/schemas';
import { TYPES } from './../config/inversify.types';
import { IGroupController } from './../controllers/group.controller.interface';
import { IRouter } from './router.interface';


@injectable()
export class GroupRouter implements IRouter {
    private validator = createValidator();

    constructor(
        @inject(TYPES.GroupController) private groupController: IGroupController
    ) {}

    init(): Router {
        return Router()
        .get('/',
            this.validator.query(groupsFilterRequestSchema),
            this.groupController.getGroups
        )
        .get('/:id',
            this.groupController.getGroup
        )
        .post('/',
            this.validator.body(groupSchema),
            this.groupController.createGroup
        )
        .put('/:id',
            this.validator.body(groupSchema),
            this.groupController.updateGroup
        )
        .delete('/:id',
            this.validator.params(groupSchema),
            this.groupController.deleteGroup
        )
        .post('/:id/users',
            this.validator.params(groupSchema),
            this.validator.body(addUsersRequestSchema),
            this.groupController.addUsersToGroup
        );
    }
}

export default GroupRouter;