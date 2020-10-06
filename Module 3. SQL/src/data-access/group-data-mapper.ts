import { Group } from '../models/group/group.interface';
import { GroupModel } from '../models/group/group.model';

export class GroupDataMapper {
    toDomain(entity: GroupModel): Group {
        const { id, name, permissions } = entity;
        return { id, name, permissions };
    }
}