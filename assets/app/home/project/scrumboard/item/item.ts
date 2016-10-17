
import {IItem} from "../../../../../../backend/models/item/IItem";
import {IUser} from "../../../../../../backend/models/user/IUser";
import {EItemCategory} from "../../../../../../backend/models/item/EItemCategory";
import {Tag} from "./tag/tag";
/**
 * Created by munk on 12-08-16.
 */

export class Item implements IItem{
    constructor(
        public name: string,
        public description: string,
        public category: EItemCategory,
        public estimate: number,
        public progress: number,
        public creationDate: Date,
        public revisionDate: Date,
        public tag: Array<Tag>,
        public _id?: string,
        public assignee?: IUser,
        public priority?: number
    ){}
}