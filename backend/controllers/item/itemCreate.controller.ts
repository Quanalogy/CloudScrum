import {Items, IItemDocument} from "../../models/item/ItemModel";
import {fromStringToEnum} from "../../models/item/EItemCategory";
/**
 * Created by munk on 19-08-16.
 */

export function addItem(name: string, id: number, category: string, estimate: number, progress: number,
                        assignee: string, priority: number): Promise<boolean>{

    //Test if the enum is valid
    //TODO make a better reject
    if(!fromStringToEnum(category) && fromStringToEnum(category) !== 0){
        return new Promise<boolean>((resolve, reject) => {
            resolve(false);
        });
    }

    // create a new item object
    const item = new Items();

    // set attributes
    item.name = name;
    item.itemId = id;
    item.category = fromStringToEnum(category);
    item.estimate = estimate;
    item.progress = progress;
    item.assignee = assignee;
    item.priority = priority;

    console.log(name, "= name;",
    id, "= id;",
    category, "=", fromStringToEnum(category),
    estimate, "= estimate;",
    progress, "= progress;",
    assignee, "= assignee;",
    priority, "= priority;");

    return new Promise<boolean>((resolve, reject) => {
        item.save((err: any, res: IItemDocument) => {
            if(err){
                reject(err);
            }
            resolve(true);
        });
    });
}

