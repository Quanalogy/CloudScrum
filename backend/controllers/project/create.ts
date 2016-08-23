import Promise = require("bluebird");
import {getUser} from "../user/userControllerRead";

import {Projects, IProjectDocument} from "../../models/project/Project";
import {IBoardUser} from "../../models/user/IBoardUser";
import {ERoles} from "../../models/user/ERole";

export function create(name: string, master: string, users?: [string]): Promise<IProjectDocument> {
    return Promise.try<IProjectDocument>(() => {
        // Check the input data.
        if (!name) {
            throw new Error("Invalid name supplied.");
        }

        // Lookup the user.
        return getUser(master).then((scrumMaster) => {
            // Create a new project.
            const project = new Projects();

            // Set the data.
            project.name = name;

            const roleObject: IBoardUser = {
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
