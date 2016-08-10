import {Users, IUserDocument} from "../../models/UserModel";
import Promise = require("bluebird");

export function createUser(email: string, password: string): Promise<IUserDocument> {
    // Create a new user object.
    const user = new Users();

    // Set the email in lowercase.
    user.email = email.toLowerCase();

    // Perform validation and save the user to the database.
    return new Promise<IUserDocument>((resolve, reject) => {
        // Let the user class handle the password.
        if (!user.createPassword(password)) {
            reject("Password");
        }

        user.validate((err) => {
            // Any errors on validation.
            if (err) {
                reject(err);
            }

            // Save the user.
            user.save((err: any, res: IUserDocument) => {
                if (err) {
                    reject();
                }

                resolve(res);
            });
        });
    });
}
