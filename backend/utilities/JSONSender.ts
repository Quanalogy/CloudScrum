import {Response} from "express";
import {ILoginOk} from "../../interfaces/ILoginOk";
import {JSONData} from "../models/json/JSONData";
import {JSONError} from "../models/json/JSONError";
import {JSONErrorMessage} from "../models/json/JSONErrorMessage";

export function JSONSendError(res: Response, err?: JSONErrorMessage | JSONErrorMessage[]) {
    const message = new JSONError();

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

export function JSONSendOk(res: Response, data = {}) {
    const message = new JSONData();
    message.data = data;

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
    // Create the response object.
    const response = new JSONData();

    // Iterate over the keys.
    const obj = response.data;
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

    sendResponse(res, response);
}

function sendResponse(res: Response, message: any) {
    // Convert the message to JSON and send it.
    res.json(message);
    res.end();
}
