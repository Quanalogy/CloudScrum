
import {IItem} from "../../../../../../backend/models/item/IItem";
import {EItemCategory} from "../../../../../../backend/models/item/EItemCategory";
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
        public _id?: string,
        public assignee?: string,
        public priority?: number
    ){}
}