import {ISprintDocument, Sprints} from "../../models/sprint/SprintModel";
/**
 * Created by munk on 25-08-16.
 */

export function patchSprintNewItem(sprintID: string, itemID: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {

        Sprints.findById(sprintID, (err, doc) => {
            if(err){
                console.log(err);
                reject(false);
            } else if(!doc){
                // this is failing because the project id is send atm...
                console.log("The doc is empty!? Sprintid:", sprintID);
                resolve(false);
            } else {
                doc.items.push(itemID);
                doc.save((err: any, res) => {
                    if(err){
                        reject(err);
                    }
                    resolve(true);
                });
            }
        });
    });
}