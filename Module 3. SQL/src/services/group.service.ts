import { inject, injectable } from 'inversify';

import { TYPES } from '../config/inversify.types';
import { LogClass } from '../helpers/logger.decorator';
import { GroupSearchOptions } from '../models/group/group-search-options.interface';
import { Group } from '../models/group/group.interface';
import { GroupDal } from './../data-access/group-dal';
import { IGroupService } from './group-service.interface';

@LogClass
@injectable()
export class GroupService implements IGroupService {

    constructor(
        @inject(TYPES.GroupDal) private groupDal: GroupDal
    ) {}

    async getGroup(id: string): Promise<Group | null> {
        return await this.groupDal.getGroup(id);
    }

    async getGroups(options: GroupSearchOptions): Promise<Array<Group>> {
        const dalOptions = options;
        return await this.groupDal.getGroups(dalOptions);
    }

    async createGroup(group: Group): Promise<Group> {
        return await this.groupDal.createGroup(group);
    }

    async updateGroup(id: string, group: Group): Promise<Group> {
        return await this.groupDal.updateGroup(id, group);
    }

    async deleteGroup(id: string): Promise<void> {
        await this.groupDal.deleteGroup(id);
    }

    async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
        await this.groupDal.addUsersToGroup(groupId, userIds);
    }
}

export default GroupService;