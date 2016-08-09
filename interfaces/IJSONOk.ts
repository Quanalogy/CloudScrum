import { IJSONError } from "./IJSONError";

export interface IJSONOk {
    ok: boolean,
    errors?: IJSONError[]
}
