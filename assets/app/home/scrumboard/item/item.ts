
import {IItem} from "../../../../../backend/models/item/IItem";
import {EItemCategory} from "../../../../../backend/models/item/EItemCategory";
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