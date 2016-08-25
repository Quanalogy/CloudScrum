import {IBoardUser} from "../user/IBoardUser";
import {ISprint} from "../sprint/ISprint";

export interface IProject {
    name: string,
    access?: Array<IBoardUser>,
    sprints?: Array<ISprint>
}
