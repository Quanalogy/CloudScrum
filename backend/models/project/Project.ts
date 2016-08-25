import * as mongoose from "mongoose";

import {IProject} from "./IProject";
import {IBoardUser} from "../user/IBoardUser";

const projectSchema = new mongoose.Schema({
    name: String,
    access: [{
        type: mongoose.Types.ObjectId,
        ref: 'IBoardUser'
    }],
    sprints: [{
        type: mongoose.Types.ObjectId,
        ref: 'ISprint'
    }]
});

// Create the document interface.
export interface IProjectDocument extends IProject, mongoose.Document { }

// Create the mongoose model.
export const Projects = mongoose.model<IProjectDocument>("Project", projectSchema);
