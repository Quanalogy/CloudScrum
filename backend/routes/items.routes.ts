/**
 * Created by munk on 18-08-16.
 */
import { Router, Request,Response } from "express";
import {getItems} from "../controllers/item/itemRead.controller";
import {addItem} from "../controllers/item/itemCreate.controller";

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
    console.log(req.body.name, req.body.id, req.body.category, req.body.estimate, req.body.progress, req.body.assignee, req.body.priority);

    addItem(req.body.name, req.body.id, req.body.category, req.body.estimate
        , req.body.progress, req.body.assignee, req.body.priority)
        .then(result => {
            res.json(result);
        }, err => {
            res.json(err);
        });
});

module.exports = router;