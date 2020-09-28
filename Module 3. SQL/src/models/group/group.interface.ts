import { Permissions } from './permissions';

export type Group = {
    id: string;
    name: string;
    permissions: Array<Permissions>
}