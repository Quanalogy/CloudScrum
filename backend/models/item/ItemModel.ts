/**
 * Created by munk on 19-08-16.
 */

import * as mongoose from "mongoose";
import {IItem} from "./IItem";
import {EItemCategory} from "./EItemCategory";


//TODO get the schema in sync with the enum EItemCategory, instead of hardcode
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: {
        type: Number,
        enum: [EItemCategory.backlog, EItemCategory.inProgress, EItemCategory.review, EItemCategory.done]
    },
    estimate: Number,
    progress: Number,
    assignee: String,
    priority: Number,
    creationDate: Date,
    revisionDate: Date
});

export interface IItemDocument extends IItem, mongoose.Document{}

export const Items = mongoose.model<IItemDocument>("Item", itemSchema);