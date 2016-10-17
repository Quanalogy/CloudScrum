import {ISprintDocument, Sprints} from "../../models/sprint/SprintModel";
import {Projects} from "../../models/project/Project";
/**
 * Created by munk on 25-08-16.
 */

export function getSprints(projectId: string): Promise<Array<ISprintDocument>>{
    return new Promise<Array<ISprintDocument>>((resolve, reject) => {
        Projects.findById(projectId, (err, project) => {
            if(err) {
                console.log(err);
                reject(err);
            }

            Sprints.find(project).exec().then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    });
}