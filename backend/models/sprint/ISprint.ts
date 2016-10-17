import {IItem} from "../item/IItem";
import {IRetrospective} from "../retrospective/IRetrospective";

export interface ISprint {
    description: string,
    endDate: Date,
    items: Array<string>,
    name: string,
    retrospective: IRetrospective,
    startDate: Date
}
