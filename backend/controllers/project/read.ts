import Promise = require("bluebird");

import {IProjectDocument, Projects} from "../../models/project/Project";
import {IUserDocument} from "../../models/user/UserModel";

export function getProject(id: string): Promise<IProjectDocument> {
    return Promise.try<IProjectDocument>(() => {
        return new Projects() as IProjectDocument;
    });
}

export function getAllProjects(): Promise<Array<IProjectDocument>> {
    return Promise.try<Array<IProjectDocument>>(() => {
        // Get all models.
        return Projects.find({ }).exec();
    });
}

export function getAllProjectsForUser(user: IUserDocument): Promise<Array<IProjectDocument>> {
    return Promise.try<Array<IProjectDocument>>(() => {
        return Projects.find({id: user._id}).exec();
    });
}
