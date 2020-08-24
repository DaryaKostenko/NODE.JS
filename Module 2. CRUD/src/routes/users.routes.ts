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

router.get('/', validator.query(autoSuggestSchema),
    asyncHandler(async (req: ValidatedRequest<autoSuggestRequestSchema>, res: Response) => {
        const { loginSubstring, limit } = req.query;
        if (loginSubstring) {
            await userService.getAutoSuggestUsers(loginSubstring, limit || 2)
            .then(user => res.json(user));
        } else {
            await userService.getUsers()
            .then(users => res.json(users));
        }
    })
);

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    await userService.getUserById(req.params.id)
        .then(user => res.json(user));
}));

router.post('/',
    validator.body(userSchema),
    asyncHandler(async (req: Request, res:Response) => {
        const user: User = req.body;
        await userService.createUser(user)
            .then(user => res.json(user));
    })
);

router.put('/:id',
    validator.body(userSchema),
    asyncHandler(async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
        const user: User = req.body;
        await userService.updateUser(user)
            .then(user => res.json(user));
    })
);

router.delete('/:id', asyncHandler(async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
    await userService.deleteUser(req.params.id)
        .then(user => res.json(user));
}));

export default router;