import {IItemDocument, Items} from "../../models/item/ItemModel";
/**
 * Created by munk on 19-08-16.
 */


export function getItems(): Promise<Array<IItemDocument>> {
    return new Promise<Array<IItemDocument>>((resolve, reject) => {
        const itemsArray: Array<IItemDocument> = [];
        Items.find({}, (err, docs) => {
            if(err){
                console.log(err);
                reject(err);
            }
            docs.forEach((item) => {
                itemsArray.push(item);
            });

            resolve(itemsArray);
        });
    });
}

export function getItem(name: string, id: number, category: string, estimate: number, progress: number,
                        assignee: string, priority: number): Promise<IItemDocument>{
    return new Promise<IItemDocument>((resolve, reject) => {
        Items.findOne({name: name, itemId: id, category: category, estimate: estimate, progress: progress,
            assignee: assignee, priority: priority}, (err: any, res: IItemDocument) => {
            if(err){
                reject();
            }

            if(!res){
                reject(res);
            }
            resolve(res);
        })
    })
}