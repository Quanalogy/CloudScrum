import IUser from "./IUser";

export class User implements IUser {
    public email: string;
    public image: string;
    public name: string;
    public phoneNumber: string;

    private passwordHash: string;
    private passwordSalt: string;
}
