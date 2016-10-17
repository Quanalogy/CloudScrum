import {IItem} from "../item/IItem";

export interface IMilestone {
    description: string,
    endDate: Date,
    name: string,
    tasks: Array<IItem>
}
