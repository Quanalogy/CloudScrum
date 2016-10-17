import {ITag} from "../../../../../../../backend/models/tag/ITag";
/**
 * Created by munk on 17-10-16.
 */
export class Tag implements ITag {
    constructor(
        public name: string
    ){}
}