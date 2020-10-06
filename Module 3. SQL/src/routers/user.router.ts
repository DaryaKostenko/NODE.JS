import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import { autoSuggestSchema, userCreateSchema, userUpdateSchema } from '../models/user/schemas';
import { UserController } from '../controllers/user-controller';

const router: Router = express.Router();
const validator = createValidator();
const userController = new UserController();

router.get('/', validator.query(autoSuggestSchema),
    userController.getUsers
);

router.get('/:id',
    userController.getUser
);

router.post('/',
    validator.body(userCreateSchema),
    userController.createUser
);

router.put('/:id',
    validator.body(userUpdateSchema),
    userController.updateUser
);

router.delete('/:id',
    userController.getUsers
);

export default router;