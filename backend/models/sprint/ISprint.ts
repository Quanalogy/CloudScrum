import {IItem} from "../item/IItem";
import {IRetrospective} from "../retrospective/IRetrospective";

export interface ISprint {
    description: string,
    endDate: Date,
    items: Array<IItem>,
    name: string,
    retrospective: IRetrospective,
    startDate: Date
}
