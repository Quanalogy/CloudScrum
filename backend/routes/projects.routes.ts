import {Router, Request,Response} from "express";
import {JSONSendItemResponse, JSONSendError} from "../utilities/JSONSender";
import {create} from "../controllers/project/create";
import jwt = require("jsonwebtoken");

const router = Router();

router.get("/", (req: Request, res: Response) => {
    JSONSendItemResponse(res, true)
});

router.post("/", (req: Request, res: Response) => {
    // Extract the user.
    const user = jwt.decode(req.headers["authorization"], "L33tWallahWallah");

    create(req.body.item, user.email)
        .then(() => {
            JSONSendItemResponse(res, true)
        }, (err) => {
            console.log(err);
            JSONSendError(res, []);
        });
});

module.exports = router;
