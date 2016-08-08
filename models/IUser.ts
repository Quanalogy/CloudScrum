export interface IUser {
    email: string;
    image?: string;
    name?: string;
    phoneNumber?: string;

    createPassword(password: string);
    checkPassword(password: string): boolean;
}
