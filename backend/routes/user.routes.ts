import { Router, Request,Response } from "express";
import jwt = require("jsonwebtoken");

import {getUser} from "../controllers/user/userControllerRead";
import {createUser} from "../controllers/user/userControllerCreate";
import {JSONSendLoginOk, JSONSendError, JSONSendPatchResponse, JSONSendInterface} from "../utilities/JSONSender";
import {changePass, checkPass} from "../controllers/user/controller.user.utility";
import {JSONUser} from "../models/json/JSONUser";
import {EErrorTypes} from "../../interfaces/EErrorTypes";
import {JSONError} from "../models/json/JSONError";

const router = Router();

// Get all users.
router.get("/", (req: Request, res: Response, next) => {
    res.render("index");
});

// Get a single user.
router.get("/:email", (req: Request, res: Response, next) => {
    getUser(req.params.email).then((result) => {
        JSONSendInterface(res, result, JSONUser);
    }, (err) => {
        const error = new JSONError();

        error.message = "No such user";
        error.type = EErrorTypes.NoData;

        JSONSendError(res, error);
    });
});

// Create a new user.
router.post("/", (req: Request, res: Response) =>{
    createUser(req.body.email, req.body.password).then(result => {
        res.json(result);
    });
});

//Login
router.post("/login", (req: Request, res: Response) => {
    checkPass(req.body.email, req.body.password).then((success) => {
        if (success) {
            const userToken = jwt.sign({email: req.body.email}, 'L33tWallahWallah', {
                expiresIn: 3600
            });

            JSONSendLoginOk(res, userToken);
        } else {
            JSONSendError(res);
        }
    }, (failure) => {
        JSONSendError(res);
    });
});





// Overwrite an existing user.
router.put("/", (req: Request, res: Response, next) => {
    res.render("index");
});

// Delete a user.
router.delete("/", (req: Request, res: Response, next) => {
    res.render("index");
});

module.exports = router;
