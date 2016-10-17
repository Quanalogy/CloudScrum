/**
 * Created by munk on 25-08-16.
 */

import * as mongoose from "mongoose";
import {ISprint} from "./ISprint";

const sprintSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]
});

export interface ISprintDocument extends ISprint, mongoose.Document{}

export const Sprints = mongoose.model<ISprintDocument>("Sprint", sprintSchema);