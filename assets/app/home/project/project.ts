import {IProject} from "../../../../backend/models/project/IProject";
import {IBoardUser} from "../../../../backend/models/user/IBoardUser";
/**
 * Created by munk on 23-08-16.
 */

export class Project implements IProject{
    constructor(
        public name: string,
        public access: Array<IBoardUser>,
        public _id: string
    ){}
}