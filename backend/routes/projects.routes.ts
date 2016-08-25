import {Router, Request,Response} from "express";
import {JSONSendItemResponse, JSONSendError} from "../utilities/JSONSender";
import {create} from "../controllers/project/create";
import jwt = require("jsonwebtoken");
import {getAllProjectsForUser} from "../controllers/project/read";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    // Extract the user.
    let user;

    if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0].toLowerCase() === "bearer") {
        user = jwt.decode(req.headers["authorization"].split(" ")[1]);
    }

    // Get all projects in which the current user is listed.
    getAllProjectsForUser(user.email).then((results) => {
        res.json(results);
    });
});

router.post("/", (req: Request, res: Response) => {
    // Extract the user.
    let user;

    if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0].toLowerCase() === "bearer") {
        user = jwt.decode(req.headers["authorization"].split(" ")[1]);
    }

    create(req.body.name, user.email)
        .then(() => {
            JSONSendItemResponse(res, true)
        }, (err) => {
            console.log(err);
            JSONSendError(res, []);
        });
});

module.exports = router;
