import { userRequestSchema } from './../models/schemas';
import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createValidator, ValidatedRequest } from 'express-joi-validation';

import { autoSuggestSchema, userSchema, autoSuggestRequestSchema } from '../models/schemas';
import { User } from '../models/user.interface';
import { UserService } from './../services/users.service';

const router: Router = express.Router();
const validator = createValidator();
const userService = new UserService;

const defaultUserLimit = 2;

router.get('/', validator.query(autoSuggestSchema),
    asyncHandler(async (req: ValidatedRequest<autoSuggestRequestSchema>, res: Response) => {
        const { loginSubstring, limit } = req.query;
        if (loginSubstring) {
            userService.getAutoSuggestUsers(loginSubstring, limit || defaultUserLimit).then(user => res.json(user));
        } else {
            userService.getUsers().then(users => res.json(users));
        }
    })
);

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    userService.getUserById(req.params.id).then(user => res.json(user));
}));

router.post('/',
    validator.body(userSchema),
    asyncHandler(async (req: Request, res:Response) => {
        const user: User = req.body;
        userService.createUser(user).then(user => res.json(user));
    })
);

router.put('/:id',
    validator.body(userSchema),
    asyncHandler(async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
        const user: User = req.body;
        userService.updateUser(user)
            .catch((err: Error) => res.status(409).json(err.message))
            .then(user => res.json(user));
    })
);

router.delete('/:id', asyncHandler(async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
    userService.deleteUser(req.params.id)
        .catch((err: Error) => res.status(404).json(err.message))
        .then(user => res.json(user));
}));

export default router;