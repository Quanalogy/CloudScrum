export interface IUser {
    email: string;
    image?: string;
    name?: string;
    phoneNumber?: string;

    changePassword(passwordOld: string, passwordNew: string): boolean;
    checkPassword(password: string): boolean;
    createPassword(password: string);
}
