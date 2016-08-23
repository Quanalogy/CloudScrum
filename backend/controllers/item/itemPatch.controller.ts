import {Items, IItemDocument} from "../../models/item/ItemModel";
/**
 * Created by munk on 19-08-16.
 */


export function patchItem(item: IItemDocument): Promise<boolean>{

    return new Promise<boolean>((resolve, reject) => {
        if(!item.name  || (!item.category && item.category !== 0) || !item.estimate){
            reject(false);
        }
        let id = item._id;
        Items.findByIdAndUpdate(id, item, (err, doc) => {
            //TODO update this with error handling
            if(err){
                console.log(err);
                reject(false);
            }
            if(!doc){
                console.log("Doc is empty");
                resolve(false);
            } else {
                doc.category = item.category;
                doc.save();
                resolve(true);
            }
        });
    });
}
