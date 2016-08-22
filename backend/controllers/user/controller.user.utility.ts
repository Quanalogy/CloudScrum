import {getUser} from "./userControllerRead";

export function checkPass(email: string, password: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        // Check if the data is valid.
        if (!email) {
            reject("Missing data");
        } else if (!password) {
            reject("Missing data");
        }

        // Attempt to find the user.
        getUser(email).then((user) => {
            // Attempt to perform the validation.
            if (user.checkPassword(password)) {
                // TODO: Generate a new token.
                resolve("a");
            } else {
                reject("Wrong password");
            }
        }, (err) => {
            reject(err);
        });
    });
}
