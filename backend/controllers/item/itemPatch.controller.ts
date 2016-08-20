import {fromStringToEnum} from "../../models/item/EItemCategory";
import {Items} from "../../models/item/ItemModel";
/**
 * Created by munk on 19-08-16.
 */
export function patchItem(name: string, id: number, category: string, estimate: number, progress: number,
                        assignee: string, priority: number): Promise<boolean>{

    return new Promise<boolean>((resolve, reject) => {
        if(!name || !id || (!fromStringToEnum(category) && fromStringToEnum(category) !== 0) ||
            !estimate){
            reject(false);
        }
        // Items.findById()
    })
}