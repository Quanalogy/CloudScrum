import {IItem} from "../item/IItem";

export interface ISprint {
    description: string,
    endDate: Date,
    items: Array<IItem>
    startDate: Date,

}