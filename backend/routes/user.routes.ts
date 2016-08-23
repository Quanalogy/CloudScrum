import { Router, Request,Response } from "express";
import jwt = require("jsonwebtoken");

import {getUser} from "../controllers/user/userControllerRead";
import {createUser} from "../controllers/user/userControllerCreate";
import {JSONSendLoginOk, JSONSendError, JSONSendPatchResponse} from "../utilities/JSONSender";
import {changePass, checkPass} from "../controllers/user/controller.user.utility";

const router = Router();

// Get all users.
router.get("/", (req: Request, res: Response, next) => {
    res.render("index");
});

// Get a single user.
router.get("/:email", (req: Request, res: Response, next) => {
    getUser(req.params.email).then(result => {
        res.json(result);
    }, error => {
        res.json({'email':'','password':''});
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
        const userToken = jwt.sign({email: req.body.email}, 'L33tWallahWallah', {
            expiresIn: 3600
        });
        JSONSendLoginOk(res, userToken);
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
