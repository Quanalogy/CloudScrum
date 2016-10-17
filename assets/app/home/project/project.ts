import {IProject} from "../../../../backend/models/project/IProject";
import {IBoardUser} from "../../../../backend/models/user/IBoardUser";
import {Sprint} from "./scrumboard/sprint/sprint";
import {Item} from "./scrumboard/item/item";
import {IMilestone} from "../../../../backend/models/milestone/IMilestone";
import {IIssue} from "../../../../backend/models/Issue/IIssue";
import {ICategory} from "../../../../backend/models/category/ICategory";
/**
 * Created by munk on 23-08-16.
 */

export class Project implements IProject{
    constructor(
        public name: string,
        public description: string,
        public access: Array<IBoardUser>,
        public sprints: Array<Sprint>,
        public backlog: Array<Item>,
        public milestrone?: Array<IMilestone>,
        public issue?: Array<IIssue>,
        public issueCategories?: Array<ICategory>,
        public _id?: string){

    }
}