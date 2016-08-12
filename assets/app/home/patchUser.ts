/**
 * Created by munk on 12-08-16.
 */

export class PatchUser{
    constructor(
        public email: string,
        public currentPassword?: string,
        public newPassword?: string,
        public phoneNumber?: string,
        public picture?: string,
        public name?: string){

    }
}