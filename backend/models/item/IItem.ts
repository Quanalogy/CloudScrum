import {ITag} from "../tag/ITag";
import {IUser} from "../user/IUser";
import {EItemCategory} from "./EItemCategory";

export interface IItem {
    _id: any,
    assignee?: IUser,
    category: EItemCategory,
    creationDate: Date,
    description: string,
    estimate: number,
    name: string,
    priority?: number,
    progress: number,
    revisionDate: Date,
    tag: Array<ITag>
}
