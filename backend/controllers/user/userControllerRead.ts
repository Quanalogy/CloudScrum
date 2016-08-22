import {Users, IUserDocument} from "../../models/UserModel";

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
