/**
 * Created by munk on 12-08-16.
 */
import {getUser} from "./userControllerRead";


export function patchUserPassword(email: string, oldPassword: string,
                                  newPassword: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
        if(!oldPassword || !newPassword || !email){
            reject(false);
        }
        getUser(email).then((user) => {
            if(user.changePassword(oldPassword, newPassword)){
                user.save();
                resolve(true);
            } else {
                resolve(false);
            }
        }, (err) => {
            console.log("err");
            reject(err);
        });
    });
}


export function patchUserDetails(email: string, name: string, phoneNumber: string,
                                 picture: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
        if(!name && !phoneNumber && !picture){
            reject(false);
        }
        getUser(email).then(user => {
            if(!user){
                resolve(false);
            }
            if(name){
                user.name = name;
            }
            if(phoneNumber){
                user.phoneNumber = phoneNumber;
            }
            if(picture){
                user.image = picture;
            }
            user.save();

        })
    })
}