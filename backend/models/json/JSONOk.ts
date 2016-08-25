import {IJSONOk} from "../../../interfaces/IJSONOk";
import {JSONError} from "./JSONError";

export class JSONOk implements IJSONOk {
    public ok = false;
    public errors = Array<JSONError>();
}
