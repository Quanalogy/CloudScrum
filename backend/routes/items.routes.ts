/**
 * Created by munk on 18-08-16.
 */
import { Router, Request,Response } from "express";
import {getItems} from "../controllers/item/itemRead.controller";
import {addItem} from "../controllers/item/itemCreate.controller";
import {JSONSendItemResponse, JSONSendError} from "../utilities/JSONSender";

const router = Router();

//get scrumboard items
router.get("/", (req: Request, res: Response) => {
    getItems().then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
});

router.post("/", (req: Request, res: Response) => {
    addItem(req.body.name, req.body.id, req.body.category, req.body.estimate
        , req.body.progress, req.body.assignee, req.body.priority)
        .then(result => {
            JSONSendItemResponse(res, result);
        }, err => {
            JSONSendError(res, []);
        });
});

router.patch("/", (req: Request, res: Response) => {

});

module.exports = router;