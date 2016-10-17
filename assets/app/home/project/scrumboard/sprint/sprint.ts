import {Item} from "../item/item";
import {ISprint} from "../../../../../../backend/models/sprint/ISprint";
import {IRetrospective} from "../../../../../../backend/models/retrospective/IRetrospective";
/**
 * Created by munk on 25-08-16.
 */

export class Sprint implements ISprint{
    constructor(
        public name: string,
        public description: string,
        public retrospective: IRetrospective,
        public startDate: Date,
        public endDate: Date,
        public items: Array<Item>,
        public _id?: string
    ){}
}