import {Router, Request,Response} from "express";
import {JSONSendItemResponse, JSONSendError} from "../utilities/JSONSender";
import {create} from "../controllers/project/create";
import jwt = require("jsonwebtoken");
import {getAllProjectsForUser} from "../controllers/project/read";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    // Extract the user.
    console.log(req.headers["authorization"]);
    let user;

    if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0].toLowerCase() === "bearer") {
        console.log("here");
        user = jwt.decode(req.headers["authorization"].split(" ")[1]);

        console.log(jwt.decode(req.headers["authorization"].split(" ")[1], "L33tWallahWallah"));
    }

    // Get all projects in which the current user is listed.
    getAllProjectsForUser(user.email).then((results) => {
        res.json(results);
    });
});

router.post("/", (req: Request, res: Response) => {
    // Extract the user.
    console.log(req.headers["authorization"]);
    let user;

    if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0].toLowerCase() === "bearer") {
        console.log("here");
        user = jwt.decode(req.headers["authorization"].split(" ")[1]);

        console.log(jwt.decode(req.headers["authorization"].split(" ")[1], "L33tWallahWallah"));
    }

    console.log(user);

    create(req.body.item, user.email)
        .then(() => {
            JSONSendItemResponse(res, true)
        }, (err) => {
            console.log(err);
            JSONSendError(res, []);
        });
});

module.exports = router;
