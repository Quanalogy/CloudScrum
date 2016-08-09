import { Router, Request,Response } from "express";
import jwt = require("jsonwebtoken");

import { getUser, checkPass } from "../controllers/user/userControllerRead";
import { createUser } from "../controllers/user/userControllerCreate";
import {JSONSendLoginOk, JSONSendError} from "../utilities/JSONSender";


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

router.post("/login", (req: Request, res: Response) => {
    checkPass(req.body.email, req.body.password).then((succes) => {
        JSONSendLoginOk(res, succes);
    }, (failure) => {
        JSONSendError(res);
    });
});

router.post("/create-user", (req: Request, res: Response) =>{
    console.log("I got a post request");
    console.log(req.body);

    createUser(req.body.email, req.body.password).then(result => {
        res.json(result);
    });
});

// Edit an existing user.
router.patch("/", (req: Request, res: Response, next) => {
    res.render("index");
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
