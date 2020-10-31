import { Group } from "../../models/group/group.interface";
import { GroupModel } from "../../models/group/group.model";

export interface IGroupMapper {
    toDomain(entity: GroupModel): Group
} 
