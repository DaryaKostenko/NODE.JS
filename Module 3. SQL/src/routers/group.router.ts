import { GroupController } from './../controllers/group-controller';
import express, { Router } from 'express';
import {
    // Creates a validator that generates middlewares
    createValidator
  } from 'express-joi-validation';

import 'joi-extract-type';
import { addUsersRequestSchema, groupSchema, groupsFilterRequestSchema } from '../models/group/schemas';

const router: Router = express.Router();
const validator = createValidator();
const groupController = new GroupController();

router.get('/',
    validator.query(groupsFilterRequestSchema),
    groupController.getGroups
);

router.get('/:id',
    groupController.getGroup
);

router.post('/',
    validator.body(groupSchema),
    groupController.createGroup
);

router.put('/:id',
    validator.body(groupSchema),
    groupController.updateGroup
);

router.delete('/:id',
    validator.params(groupSchema),
    groupController.deleteGroup
);

router.post('/:id/users',
    validator.params(groupSchema),
    validator.body(addUsersRequestSchema),
    groupController.addUsersToGroup
);

export default router;