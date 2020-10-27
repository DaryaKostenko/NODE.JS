import { Request, Response } from 'express';
import { ValidatedRequest } from "express-joi-validation";
import { autoSuggestedGroupsRequestSchema, GroupRequestSchema } from '../models/group/schemas';

export interface IGroupController {
    getGroups(req: ValidatedRequest<autoSuggestedGroupsRequestSchema>, res: Response): Promise<void>;
    getGroup(req: Request, res:Response): Promise<void>;
    createGroup (req: ValidatedRequest<GroupRequestSchema>, res: Response): Promise<void>;
    updateGroup(req: ValidatedRequest<GroupRequestSchema>, res: Response): Promise<void>;
    deleteGroup(req: Request, res: Response): Promise<void>;
    addUsersToGroup(req: Request, res: Response):Promise<void>;
}

export default IGroupController;