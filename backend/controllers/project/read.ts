import Promise = require("bluebird");

import {IProjectDocument} from "../../models/project/Project";

export function getAll(): Promise<Array<IProjectDocument>> {
    return Promise.try<Array<IProjectDocument>>(() => {
        return Array<IProjectDocument>();
    });
}
