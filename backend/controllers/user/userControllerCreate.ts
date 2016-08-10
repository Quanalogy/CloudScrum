import {Users, IUserDocument} from "../../models/UserModel";
import Promise = require("bluebird");

export function createUser(email: string, password: string): Promise<IUserDocument> {
    // Create a new user object.
    const user = new Users();

    // Set the email.
    user.email = email;

    // Let the user class handle the password.
    user.createPassword(password);

    // Perform validation and save the user to the database.
    return new Promise<IUserDocument>((resolve, reject) => {
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
