
import {IItem} from "../../../../../backend/models/item/IItem";
import {EItemCategory} from "../../../../../backend/models/item/EItemCategory";
/**
 * Created by munk on 12-08-16.
 */

export class Item implements IItem{
    constructor(
        public name: string,
        public itemId: number,
        public category: EItemCategory,
        public estimate: number,
        public progress: number,
        public assignee?: string,
        public priority?: number
    ){}

    removeItem(id: number): boolean{
        return false;
    }

    patchItem(name: string, id: number, category: string, estimate: number, progress: number,
              assignee: string, priority: number): boolean{
        return false;
    }
    addItem(name: string, id: number, category: string, estimate: number, progress: number,
            assignee: string, priority: number): boolean{
        return false;
    }

}