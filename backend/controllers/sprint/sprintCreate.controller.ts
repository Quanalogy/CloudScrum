import {ISprintDocument, Sprints} from "../../models/sprint/SprintModel";
/**
 * Created by munk on 25-08-16.
 */

export function addSprint(sprint: ISprintDocument): Promise<boolean>{
    if(!sprint.startDate || !sprint.endDate){
        return new Promise<boolean>((resolve, reject) =>{
            reject(false);
        });
    }

    let newSprint = new Sprints(sprint);

    return new Promise<boolean>((resolve, reject) => {
        newSprint.save((err: any, res: ISprintDocument) => {
            if(err){
                reject(err);
            }
            resolve(true);
        });
    });
}