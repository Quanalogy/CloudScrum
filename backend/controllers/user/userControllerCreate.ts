import {Users, IUserDocument} from "../../models/UserModel";
import Promise = require("bluebird");


export function createUser(email: string, password: string): Promise<IUserDocument> {
    // Create a new user object.
    const user = new Users();

    // Set the email.
    user.email = email;

    // Let the user class handle the password.
    user.createPassword(password);

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
