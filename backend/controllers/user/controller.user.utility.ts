import Promise = require("bluebird");

import {getUser} from "./userControllerRead";

export function changePass(email: string, oldPassword: string, newPassword: string): Promise<boolean>{
    return Promise.try<boolean>(() => {
        if (!oldPassword || !newPassword || !email){
            return false;
        }

        return getUser(email).then((user) => {
            if (user.changePassword(oldPassword, newPassword)){
                user.save();
                // TODO: Promisify the save call.
                return true;
            } else {
                return false;
            }
        }, (err) => {
            throw new Error(err);
        });
    });
}

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
