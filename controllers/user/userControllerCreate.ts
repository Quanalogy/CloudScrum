import {Users, IUserDocument} from "../../models/UserModel";
import Promise = require("bluebird");


export function createUser(email: string, password: string): Promise<IUserDocument> {
    // Create a new user object.
    const user = new Users();

    // Set the email.
    user.email = email;

    // Generate a new salt.

    // Hash the password and the salt, and store the result.


    // Perform validation of the data.

    // Save the user to the database.
    const p = new Promise<IUserDocument>((resolve, reject) => {
        user.save((err: any, res: IUserDocument) => {
            if (err) {
                reject();
            }

            resolve(res);
        });
    });

    return p;
}
