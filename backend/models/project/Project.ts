import * as mongoose from "mongoose";

import {IProject} from "./IProject";

const projectSchema = new mongoose.Schema({
    name: String,
    access: [{}]
});

// Create the document interface.
export interface IProjectDocument extends IProject, mongoose.Document { }

// Create the mongoose model.
export const Projects = mongoose.model<IProjectDocument>("Project", projectSchema);
