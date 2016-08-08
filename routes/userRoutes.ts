import { Router, Request,Response } from "express";
import {getUser} from "../controllers/user/userControllerRead";
import {createUser} from "../controllers/user/userControllerCreate";
import {error} from "util";

const router = Router();

// Get all users.
router.get("/", (req: Request, res: Response, next) => {
    res.render("index");
});

// Get a single user.
router.get("/:email", (req: Request, res: Response, next) => {
    console.log("Got get requst for user");
    getUser(req.params.email).then(result => {
        console.log("Result coming", result);
        res.json(result);
    }, error => {
        console.log("Not found or error");
        res.json({'email':'','password':''});
    });

    //res.render("index");
});

// Create a new user.
router.post("/", (req, res, next) => {
    res.render("index");
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
