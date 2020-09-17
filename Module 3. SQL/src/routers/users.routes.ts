import { userRequestSchema, userUpdateSchema } from '../models/schemas';
import express, { Request, Response, Router } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import { v4 as uuidv4 } from 'uuid';

import { autoSuggestSchema, userCreateSchema, autoSuggestRequestSchema } from '../models/schemas';
import { User } from '../models/user.interface';
import { UserService } from '../services/users.service';

const router: Router = express.Router();
const validator = createValidator();
const userService = new UserService;

const defaultUserLimit = 2;

router.get('/', validator.query(autoSuggestSchema),
    async (req: ValidatedRequest<autoSuggestRequestSchema>, res: Response) => {
        const { loginSubstring, limit = defaultUserLimit } = req.query;
        const users = await userService.getUsers({ loginSubstring, limit });
        res.json(users);
    }
);

router.get('/:id', async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});

router.post('/',
    validator.body(userCreateSchema),
    async (req: Request, res: Response) => {
        const userRequest: User = req.body;
        const user = await userService.createUser({...userRequest, id: uuidv4()});
        res.json(user);
    }
);

router.put('/:id',
    validator.body(userUpdateSchema),
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