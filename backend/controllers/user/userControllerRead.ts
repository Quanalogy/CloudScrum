import {Users, IUserDocument} from "../../models/UserModel";


// possibility of returning null if the user does not exist,
// therefor please make a null check when using this method.
export function getUser(email: string): Promise<IUserDocument>  {
    const p:Promise<IUserDocument> = new Promise<IUserDocument>((resolve, reject) => {
        Users.findOne({email: email}, (err, res: IUserDocument) => {
            if (err) {
                reject(err);
            }

            if(!res){
                reject(res);
            }

            resolve(res);
        });
    });

    return p;

}


export function checkPass(email: string, password: string): Promise<boolean>{
    return getUser(email).then(res =>{
        if(res.checkPassword(password)){
            return true;
        }
        return false;
    }, err => {
        return false;
    });
}