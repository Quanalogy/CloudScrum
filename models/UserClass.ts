export class User {
    public email: string;
    public image: string;
    public name: string;
    public phoneNumber: string;

    private passwordHash: string;
    private passwordSalt: string;

    public checkPass(password: string): boolean {
        return false;
    }
}
