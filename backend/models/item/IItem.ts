import {EItemCategory} from "./EItemCategory";
/**
 * Created by munk on 18-08-16.
 */
export interface IItem {
    name: string,
    description: string,
    category: EItemCategory,
    estimate: number,
    progress: number,
    creationDate: Date,
    revisionDate: Date,
    sprintId: string,
    _id: any,
    assignee?: string,
    priority?: number
}