import {IBoardUser} from "../user/IBoardUser";
import {ISprint} from "../sprint/ISprint";
import {IItem} from "../item/IItem";
import {IIssue} from "../Issue/IIssue";
import {ICategory} from "../category/ICategory";

export interface IProject {
    name: string,
    access: Array<IBoardUser>,
    sprints: Array<ISprint>,
    backlog: Array<IItem>,
    description: string,
    //milestone?: Array<IMilestone>,
    issue?: Array<IIssue>,
    issueCategories?: Array<ICategory>
}
