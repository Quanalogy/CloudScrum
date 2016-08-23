import {Items, IItemDocument} from "../../models/item/ItemModel";
/**
 * Created by munk on 19-08-16.
 */



export function addItem(item: IItemDocument): Promise<boolean>{

    //Test if the enum is valid
    //TODO make a better reject
    if(!item.category && item.category !== 0){
        return new Promise<boolean>((resolve, reject) => {
            resolve(false);
        });
    }

    let newItem = new Items();
    newItem.name = item.name;
    newItem.description = item.description;
    newItem.category = item.category;
    newItem.estimate = item.estimate;
    newItem.progress = item.progress;
    newItem.creationDate = item.creationDate;
    newItem.revisionDate = item.revisionDate;
    newItem.assignee = item.assignee;
    newItem.priority = item.priority;


    return new Promise<boolean>((resolve, reject) => {
        newItem.save((err: any, res: IItemDocument) => {
            if(err){
                reject(err);
            }
            resolve(true);
        });
    });
}