import { EErrorTypes } from "./EErrorTypes";

export interface IJSONError {
    number: number,
    message: string,
    type: EErrorTypes
}
