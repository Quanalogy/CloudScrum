/**
 * Created by munk on 17-10-16.
 */
import {ICategory} from "../category/ICategory";


export interface IIssue {
    name: string,
    category: ICategory        // an _id from ICategory
}