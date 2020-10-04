import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { Group } from '../models/group/group.interface';
import { autoSuggestedGroupsRequestSchema, GroupRequestSchema } from '../models/group/schemas';
import { GroupService } from './../services/group.service';

export class GroupController {
    private readonly _groupService = new GroupService();

    getGroup = async (req:Request, res:Response): Promise<void> => {
        await this._groupService.getGroup(req.params.id)
        .then(group => res.json(group));
    }

    getGroups = async (req:ValidatedRequest<autoSuggestedGroupsRequestSchema>, res:Response): Promise<void> => {
        const { nameSubstring, limit } = req.query;
        await this._groupService.getGroups({ nameSubstring, limit })
            .then(Group => res.json(Group));
    }

    createGroup = async (req: ValidatedRequest<GroupRequestSchema>, res:Response): Promise<void> => {
        const group: Group = req.body;
        await this._groupService.createGroup(group)
            .then(group => res.json(group.id));
    }

    updateGroup = async (req:ValidatedRequest<GroupRequestSchema>, res:Response): Promise<void> => {
        const group: Group = req.body;
        await this._groupService.updateGroup(req.params.id, group)
            .then(group => res.json(group.id));
    }

    deleteGroup = async (req:Request, res:Response):Promise<void> => {
        await this._groupService.deleteGroup(req.params.id)
        .then(() => res.sendStatus(200));
    }

    addUsersToGroup = async (req:Request, res:Response):Promise<void> => {
        const groupId = req.params.id;
        const userIds = req.body.userIds;
        await this._groupService.addUsersToGroup(groupId, userIds)
        .then(() => res.sendStatus(200));
    }
}
