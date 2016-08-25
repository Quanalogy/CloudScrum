import {IItem} from "../item/IItem";
/**
 * Created by munk on 25-08-16.
 */

export interface ISprint {
    startDate: Date,
    endDate: Date,
    items: Array<IItem>
}