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