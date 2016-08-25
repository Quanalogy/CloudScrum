import {IJSONError} from "../../../interfaces/IJSONError";
import {JSONErrorMessage} from "./JSONErrorMessage";

export class JSONError implements IJSONError {
    public ok = false;
    public errors = Array<JSONErrorMessage>();
}
