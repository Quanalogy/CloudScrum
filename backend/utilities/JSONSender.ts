import {Response} from "express";
import {ILoginOk} from "../../interfaces/ILoginOk";

export function JSONSendError(res: Response, err?: Error | Error[]) {
    // Check if we got any specific errors attached.
    if (!err) {
        // Send a generic message.
        const message: ILoginOk = {
            ok: false
        };

        sendResponse(res, message);
    } else {
        // Loop over the list of errors.
        throw new Error("Not implemented");
    }
}

export function JSONSendLoginOk(res: Response, token: string) {
    // Create the message using the specified interface.
    const message: ILoginOk = {
        ok: true,
        token: token
    };

    // Send the response.
    sendResponse(res, message);
}

function sendResponse(res: Response, message: any) {
    // Convert the message to JSON and send it.
    res.json(message);
    res.end();
}
