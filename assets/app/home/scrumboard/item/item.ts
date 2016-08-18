import {IItem} from "../../../../../backend/models/IItem";
import {EItemCategory} from "../../../../../backend/controllers/item/EItemCategory";
/**
 * Created by munk on 12-08-16.
 */

export class Item implements IItem{
    constructor(
        public name: string,
        public id: number,
        public category: EItemCategory
    ){}
}