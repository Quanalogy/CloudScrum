import Promise = require("bluebird");

import {getUser} from "./userControllerRead";

export function checkPass(email: string, password: string): Promise<boolean>{
    return Promise.try<boolean>(() => {
        // Check if the data is valid.
        if (!email) {
            return false;
        } else if (!password) {
            return false;
        }

        // Attempt to find the user.
        return getUser(email).then((user) => {
            // Attempt to perform the validation.
            return user.checkPassword(password);
        }, () => {
            // No user located.
            return false;
        });
    });
}
