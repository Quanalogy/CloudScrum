import {IBoardUser} from "../user/IBoardUser";
import {ISprint} from "../sprint/ISprint";
import {IItem} from "../item/IItem";
import {IIssue} from "../Issue/IIssue";
import {ICategory} from "../category/ICategory";
import {IMilestone} from "../milestone/IMilestone";

export interface IProject {
    name: string,
    description: string,
    access: Array<IBoardUser>,
    sprints: Array<ISprint>,
    backlog: Array<IItem>,
    milestone?: Array<IMilestone>,
    issue?: Array<IIssue>,
    issueCategories?: Array<ICategory>
}
