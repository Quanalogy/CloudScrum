import { errorTypes } from "./ListOfErrors";

export interface IJSONError {
    number: number,
    message: string,
    type: errorTypes
}
