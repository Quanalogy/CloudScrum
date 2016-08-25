import {IJSONError} from "../../../interfaces/IJSONError";
import {EErrorTypes} from "../../../interfaces/EErrorTypes";

export class JSONError implements IJSONError {
    public number = 0;
    public message = "";
    public type = EErrorTypes.Undefined;
}
