import { IGroupMapper } from './group-data-mapper.interface';
import { injectable } from 'inversify';
import { Group } from '../../models/group/group.interface';
import { GroupModel } from '../../models/group/group.model';

@injectable()
export class GroupDataMapper implements IGroupMapper{
    toDomain(entity: GroupModel): Group {
        const { id, name, permissions } = entity;
        return { id, name, permissions };
    }
}