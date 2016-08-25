import Promise = require("bluebird");
import {getUser} from "../user/userControllerRead";

import {Projects, IProjectDocument} from "../../models/project/Project";
import {IBoardUser} from "../../models/user/IBoardUser";
import {ERoles} from "../../models/user/ERole";
import {IProject} from "../../models/project/IProject";

export function create(newProject: IProject, master: string, users?: [string]): Promise<IProjectDocument> {
    return Promise.try<IProjectDocument>(() => {
        // Check the input data.
        if (!newProject.name) {
            throw new Error("Invalid name supplied.");
        }

        // Lookup the user.
        return getUser(master).then((scrumMaster) => {
            // Create a new project.
            let project = new Projects(newProject);

            // Set the data.
            // project.name = newProject.name;

            let roleObject: IBoardUser = {
                id: scrumMaster._id,
                role: ERoles.ScrumMaster
            };


            project.access.push(roleObject);


            // Save the project.
            return project.save();
        }, () => {
            throw new Error("No such user.");
        });
    });
}
