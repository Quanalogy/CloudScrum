import {IBoardUser} from "../user/IBoardUser";

export interface IProject {
    name: string,
    access: Array<IBoardUser>
}
