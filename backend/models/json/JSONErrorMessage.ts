import {IJSONErrorMessage} from "../../../interfaces/IJSONErrorMessage";
import {EErrorTypes} from "../../../interfaces/EErrorTypes";

export class JSONErrorMessage implements IJSONErrorMessage {
    public number = 0;
    public message = "";
    public type = EErrorTypes.Undefined;
}
