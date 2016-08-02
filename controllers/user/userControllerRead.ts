import {Users, IUserDocument} from "../../models/UserModel";

export function getUser(email: string): Promise<IUserDocument>  {
    const p = new Promise<IUserDocument>((resolve, reject) => {
        Users.findOne({email: email}, (err, res: IUserDocument) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        })
    });

    return p;
}
