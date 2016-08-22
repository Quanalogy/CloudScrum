/**
 * Created by munk on 12-08-16.
 */
import Promise = require("bluebird");

import {getUser} from "./userControllerRead";

/*export function patchUserPassword(email: string, oldPassword: string,
                                  newPassword: string): Promise<boolean>{
    return Promise.try<boolean>(() => {
        if(!oldPassword || !newPassword || !email){
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
}*/
