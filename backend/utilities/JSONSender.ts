import {Response} from "express";
import {ILoginOk} from "../../interfaces/ILoginOk";
import {JSONOk} from "../models/json/JSONOk";
import {JSONError} from "../models/json/JSONError";

export function JSONSendError(res: Response, err?: JSONError | JSONError[]) {
    const message = new JSONOk();
    message.ok = false;

    // Check if we got any specific errors attached.
    if (err) {
        // Loop over the list of errors.
        if (err instanceof Array) {
            for (const error of err) {
                message.errors.push(error);
            }
        } else {
            message.errors.push(err);
        }
    }

    sendResponse(res, message);
}

export function JSONSendOk(res: Response) {
    const message = new JSONOk();
    message.ok = true;

    sendResponse(res, message);
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

export function JSONSendPatchResponse(res: Response, success: boolean){
    const message = {
        ok: success
    };
    sendResponse(res, message);
}

export function JSONSendItemResponse(res: Response, success: boolean){
    const message = {
        ok: success
    };
    sendResponse(res, message);
}

export function JSONSendInterface(res: Response, data: any, interfaceClass: any) {
    // Iterate over the keys.
    let obj = {};
    const ic = new interfaceClass();
    const keys = Object.keys(ic);

    for (const key of keys) {
        // Check if the data is defined.
        if (data[key]) {
            obj[key] = data[key];
        } else {
            // Load the default value.
            obj[key] = ic[key];
        }
    }

    sendResponse(res, obj);
}

function sendResponse(res: Response, message: any) {
    // Convert the message to JSON and send it.
    res.json(message);
    res.end();
}
