import {IJSONUser} from "../../../interfaces/IJSONUser";

export interface IUser extends IJSONUser {
    email: string;
    image: string;
    name: string;
    phoneNumber: string;

    changePassword(passwordOld: string, passwordNew: string): boolean;
    checkPassword(password: string): boolean;
    createPassword(password: string): boolean;
}
