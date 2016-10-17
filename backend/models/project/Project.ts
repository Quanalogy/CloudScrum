import * as mongoose from "mongoose";

import {IProject} from "./IProject";
import {BoardUsers} from "../user/BoardUserSchema";
import {Sprints} from "../sprint/SprintModel";

const projectSchema = new mongoose.Schema({
    name: String,
    access: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardUsers'
    }],
    sprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprints'
    }]
});

// Create the document interface.
export interface IProjectDocument extends IProject, mongoose.Document { }

// Create the mongoose model.
export const Projects = mongoose.model<IProjectDocument>("Project", projectSchema);
