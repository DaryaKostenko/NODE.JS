import { inject, injectable } from 'inversify';
import { Op, Transaction } from 'sequelize';

import { sequelize } from '../config/database';
import { TYPES } from '../config/inversify.types';
import { LogClass } from '../helpers/logger.decorator';
import { Group } from '../models/group/group.interface';
import { GroupModel } from '../models/group/group.model';
import { UserGroupModel } from '../models/userGroup/userGroup.model';
import { GroupSearchOptions } from './../models/group/group-search-options.interface';
import { IGroupDal } from './group-dal.interface';
import { GroupDataMapper } from './mappers/group-data-mapper';

@LogClass
@injectable()
export class GroupDal implements IGroupDal {

    constructor(
        @inject(TYPES.GroupMapper) private dataMapper: GroupDataMapper
    ) {}

    async getGroup(id: string): Promise<Group | null> {
        const group = await GroupModel.findOne({ where: { id } });
        return group ? this.dataMapper.toDomain(group) : null;
    }

    async getGroups(options: GroupSearchOptions): Promise<Array<Group>> {
        const groups = await GroupModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${options.nameSubstring || ''}%`
                }
            },
            limit: options.limit || 10,
            order: [['name', 'ASC']]
        });
        return groups.map((group: GroupModel) => this.dataMapper.toDomain(group));
    }

    async createGroup(group: Group): Promise<Group> {
        const newGroup = group;
        const GroupDal = await GroupModel.create(newGroup);
        return this.dataMapper.toDomain(GroupDal);
    }

    async updateGroup(id: string, group: Group): Promise<Group> {
        const updatedGroup = { ...group, id };
        const [total, updatedGroups] = await GroupModel.update(
            updatedGroup,
            { where: { id }, returning: true }
        );

        if (total === 0)
            throw Error('group not found');
        return this.dataMapper.toDomain(updatedGroups[0]);
    }

    async deleteGroup(id: string): Promise<void> {
        await GroupModel.findOne(
            { where: { id } }
        ).then((group: GroupModel | null) => {
            if (!group)
                throw Error('group not found');
            group.destroy();
        });
    }

    async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
        await sequelize.transaction(async (transaction: Transaction) => {
            await UserGroupModel.bulkCreate(userIds.map(userId => ({ groupId, userId }), { transaction }));
        });
    }
}

export default GroupDal;
