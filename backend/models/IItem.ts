import {EItemCategory} from "../controllers/item/EItemCategory";
/**
 * Created by munk on 18-08-16.
 */
export interface IItem {
    name: string,
    id: number,
    category: EItemCategory
}