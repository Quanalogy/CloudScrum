import {Item} from "../item/item";
import {ISprint} from "../../../../../../backend/models/sprint/ISprint";
/**
 * Created by munk on 25-08-16.
 */

export class Sprint implements ISprint{
    constructor(
        public startDate: Date,
        public endDate: Date,
        public items: Array<Item>,
        public _id?: string
    ){}
}