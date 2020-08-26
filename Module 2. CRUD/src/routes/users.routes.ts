import { userRequestSchema } from './../models/schemas';
import express, { Request, Response, Router } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';

import { autoSuggestSchema, userSchema, autoSuggestRequestSchema } from '../models/schemas';
import { User } from '../models/user.interface';
import { UserService } from './../services/users.service';

const router: Router = express.Router();
const validator = createValidator();
const userService = new UserService;

const defaultUserLimit = 2;

router.get('/', validator.query(autoSuggestSchema),
    async (req: ValidatedRequest<autoSuggestRequestSchema>, res: Response) => {
        const { loginSubstring, limit = defaultUserLimit } = req.query;
        const users = loginSubstring 
            ? await userService.getAutoSuggestUsers(loginSubstring, limit) 
            : await userService.getUsers(limit);
        res.json(users);
    }
);

router.get('/:id', async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});

router.post('/',
    validator.body(userSchema),
    async (req: Request, res:Response) => {
        const userRequest: User = req.body;
        const user = await userService.createUser(userRequest);
        res.json(user);
    }
);

router.put('/:id',
    validator.body(userSchema),
    async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
        const userRequest: User = req.body;
        try{
            const user = await userService.updateUser(userRequest);
            res.json(user);
        }
        catch(err) {
            res.status(409).json(err.message);
        }
    }
);

router.delete('/:id', async (req: ValidatedRequest<userRequestSchema>, res:Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json(user);
    }
    catch(err) {
        res.status(404).json(err.message);
    }
});

export default router;