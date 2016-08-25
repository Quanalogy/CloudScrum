import { Router, Request,Response } from "express";
import jwt = require("jsonwebtoken");

import {getUser} from "../controllers/user/userControllerRead";
import {createUser} from "../controllers/user/userControllerCreate";
import {JSONSendOk, JSONSendError, JSONSendInterface} from "../utilities/JSONSender";
import {changePass, checkPass} from "../controllers/user/controller.user.utility";
import {JSONUser} from "../models/json/JSONUser";
import {EErrorTypes} from "../../interfaces/EErrorTypes";
import {JSONError} from "../models/json/JSONError";
import {JSONErrorMessage} from "../models/json/JSONErrorMessage";

const router = Router();

// Get all users.
router.get("/", (req: Request, res: Response, next) => {
    res.render("index");
});

// Get a single user.
router.get("/:email", (req: Request, res: Response, next) => {
    getUser(req.params.email).then((result) => {
        JSONSendInterface(res, result, JSONUser);
    }, () => {
        const error = new JSONErrorMessage();

        error.message = "No such user.";
        error.type = EErrorTypes.NoData;

        JSONSendError(res, error);
    });
});

// Is the email available?
router.get("/available/:email", (req: Request, res: Response, next) => {
    getUser(req.params.email).then((re) => {
        JSONSendError(res);
    }, () => {
        JSONSendOk(res);
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
            const userToken = jwt.sign({email: req.body.email}, "L33tWallahWallah", {
                expiresIn: 3600
            });

            const tokenObj = {
                token: userToken
            };

            JSONSendOk(res, tokenObj);
        } else {
            const error = new JSONErrorMessage();

            error.message = "Invalid username and password combination.";
            error.type = EErrorTypes.NoData;

            JSONSendError(res, error);
        }
    }, () => {
        const error = new JSONErrorMessage();

        error.message = "Internal server error.";
        error.type = EErrorTypes.Undefined;

        JSONSendError(res, error);
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
