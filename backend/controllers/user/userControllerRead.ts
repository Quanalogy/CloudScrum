import {Users, IUserDocument} from "../../models/user/UserModel";

// possibility of returning null if the user does not exist,
// therefor please make a null check when using this method.
export function getUser(email: string): Promise<IUserDocument>  {
    return new Promise<IUserDocument>((resolve, reject) => {
        Users.findOne({email: email}, (err, res: IUserDocument) => {
            // Handle mongoose errors.
            if (err) {
                reject(err);
            }

            // No such user found.
            if(!res){
                reject(res);
            }

            // Return the user.
            resolve(res);
        });
    });
}

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
