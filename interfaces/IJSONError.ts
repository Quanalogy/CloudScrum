import {IJSONErrorMessage} from "./IJSONErrorMessage";
import {IJSONOk} from "./IJSONOk";

export interface IJSONError extends IJSONOk {
    errors?: Array<IJSONErrorMessage>
}
