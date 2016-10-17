import {IItemCategory} from "../itemCategory/IItemCategory";
import {ITag} from "../tag/ITag";
import {IUser} from "../user/IUser";

export interface IItem {
    _id: any,
    assignee?: IUser,
    category: IItemCategory,
    creationDate: Date,
    description: string,
    estimate: number,
    name: string,
    priority?: number,
    progress: number,
    revisionDate: Date,
    tag: Array<ITag>
}
