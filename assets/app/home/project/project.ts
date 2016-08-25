import {IProject} from "../../../../backend/models/project/IProject";
import {IBoardUser} from "../../../../backend/models/user/IBoardUser";
import {Sprint} from "./scrumboard/sprint/sprint";
/**
 * Created by munk on 23-08-16.
 */

export class Project implements IProject{
    constructor(
        public name: string,
        public access: Array<IBoardUser>,
        public sprints?: Array<Sprint>,
        public _id?: string){

    }
}