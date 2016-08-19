import {EItemCategory} from "./EItemCategory";
/**
 * Created by munk on 18-08-16.
 */
export interface IItem {
    name: string,
    itemId: number,
    category: EItemCategory,
    estimate: number,
    progress: number,
    assignee?: string,
    priority?: number

    addItem(name: String, id: Number, category: String, estimate: Number, progress: Number,
                                  assignee: String, priority: Number): boolean;
    removeItem(id: Number): boolean;
    patchItem(name: String, id: Number, category: String, estimate: Number, progress: Number,
              assignee: String, priority: Number): boolean;
}