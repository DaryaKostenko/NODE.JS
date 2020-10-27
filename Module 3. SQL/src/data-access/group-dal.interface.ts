import { GroupSearchOptions } from "../models/group/group-search-options.interface";
import { Group } from "../models/group/group.interface";

export interface IGroupDal {
    getGroup(id:string): Promise<Group|null>;
    getGroups(options: GroupSearchOptions): Promise<Array<Group>>;
    createGroup(group: Group):Promise<Group>;
    updateGroup(id: string, group: Group): Promise<Group>;
    deleteGroup(id: string): Promise<void>;
    addUsersToGroup(groupId: string, userIds: string[]): Promise<void>;
}

export default IGroupDal;