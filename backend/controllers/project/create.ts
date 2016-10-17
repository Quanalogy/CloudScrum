import Promise = require("bluebird");
import {getUser} from "../user/userControllerRead";

import {Projects, IProjectDocument} from "../../models/project/Project";
import {BoardUsers} from "../../models/user/BoardUserSchema";
import {ERoles} from "../../models/user/ERole";

export function create(newProject: string, master: string, users?: [string]): Promise<IProjectDocument> {
    return new Promise<IProjectDocument>( (resolve, reject) => {
        // Check the input data.
        if (!newProject) {
            throw new Error("Invalid name supplied.");
        }

        // Lookup the user.
        return getUser(master).then((scrumMaster) => {
            // Create a new project.
            let project = new Projects({name: newProject});

            let roleObject = new BoardUsers({
                userid: scrumMaster._id,
                role: ERoles.ScrumMaster
            });
            console.log(roleObject);

            return roleObject.save((err: any, res) => {
                if(err){
                    reject();
                }
                project.access.push(res._id);
                project.save((err: any, res: IProjectDocument) => {
                    if(err){
                        reject();
                    }
                    resolve(res);
                });
            });
        }, () => {
            throw new Error("No such user.");
        });
    });
}
