import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import { Group } from '../models/group/group.interface';
import { autoSuggestedGroupsRequestSchema, GroupRequestSchema } from '../models/group/schemas';
import { TYPES } from '../config/inversify.types';
import { IGroupService } from './../services/group.interface';
import IGroupController from './group.controller.interface';

@injectable()
export class GroupController implements IGroupController {
    constructor(
        @inject(TYPES.GroupService) private groupService: IGroupService
    ) {}

    getGroup = async (req:Request, res:Response): Promise<void> => {
        await this.groupService.getGroup(req.params.id)
        .then(group => res.json(group));
    }

    getGroups = async (req:ValidatedRequest<autoSuggestedGroupsRequestSchema>, res:Response): Promise<void> => {
        const { nameSubstring, limit } = req.query;
        await this.groupService.getGroups({ nameSubstring, limit })
            .then(Group => res.json(Group));
    }

    createGroup = async (req: ValidatedRequest<GroupRequestSchema>, res:Response): Promise<void> => {
        const group: Group = req.body;
        await this.groupService.createGroup(group)
            .then(group => res.json(group.id));
    }

    updateGroup = async (req:ValidatedRequest<GroupRequestSchema>, res:Response): Promise<void> => {
        const group: Group = req.body;
        await this.groupService.updateGroup(req.params.id, group)
            .then(group => res.json(group.id));
    }

    deleteGroup = async (req:Request, res:Response):Promise<void> => {
        await this.groupService.deleteGroup(req.params.id)
        .then(() => res.sendStatus(200));
    }

    addUsersToGroup = async (req:Request, res:Response):Promise<void> => {
        const groupId = req.params.id;
        const userIds = req.body.userIds;
        await this.groupService.addUsersToGroup(groupId, userIds)
        .then(() => res.sendStatus(200));
    }
}
