/**
 * Created by munk on 19-08-16.
 */

import * as mongoose from "mongoose";
import {IItem} from "./IItem";
import {EItemCategory} from "./EItemCategory";


//TODO get the schema in sync with the enum EItemCategory, instead of hardcode
const itemSchema = new mongoose.Schema({
    name: String,
    itemId: Number,
    category: {
        type: [{
            type: Number,
            enum: [EItemCategory.backlog, EItemCategory.inProgress, EItemCategory.review, EItemCategory.done]
        }]
    },
    estimate: Number,
    progress: Number,
    assignee: String,
    priority: Number
});
/*{
 type: String,
 enum: ['backlog', 'inProgress', 'review','done']
 }*/

/*type: [{
 type: String,
 enum: [EItemCategory.backlog, EItemCategory.inProgress, EItemCategory.review, EItemCategory.done]
 }]*/

itemSchema.methods.addItem = function(name: String, id: Number, category: String, estimate: Number, progress: Number,
                                      assignee: String, priority: Number): boolean {

    return false;
};


itemSchema.methods.removeItem = function(id: Number): boolean{
    return false;
};
itemSchema.methods.patchItem = function(name: String, id: Number, category: String, estimate: Number, progress: Number,
                                        assignee: String, priority: Number): boolean{
    return false;
};

export interface IItemDocument extends IItem, mongoose.Document{}

export const Items = mongoose.model<IItemDocument>("Item", itemSchema);