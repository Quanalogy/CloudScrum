import Promise = require("bluebird");
import {getUser} from "../user/userControllerRead";

import {Projects, IProjectDocument} from "../../models/project/Project";
import {BoardUsers} from "../../models/user/BoardUserSchema";
import {ERoles} from "../../models/user/ERole";
import {IProject} from "../../models/project/IProject";

export function create(newProject: IProject, master: string, users?: [string]): Promise<IProjectDocument> {
    return new Promise<IProjectDocument>( () => {
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

            /*let roleObject: IBoardUser = {
                userid: scrumMaster._id,
                role: ERoles.ScrumMaster
            };*/

            let roleObject = new BoardUsers({
                userid: scrumMaster._id,
                role: ERoles.ScrumMaster
            });

            return new roleObject.save().then((res) => {
                project.access.push(res._id);
            }).then(() => {
                // Save the project.
                return project.save();
            });





        }, () => {
            throw new Error("No such user.");
        });
    });
}
