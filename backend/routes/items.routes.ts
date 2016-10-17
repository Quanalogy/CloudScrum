/**
 * Created by munk on 18-08-16.
 */
import { Router, Request,Response } from "express";
import {getItems} from "../controllers/item/itemRead.controller";
import {addItem} from "../controllers/item/itemCreate.controller";
import {JSONSendItemResponse, JSONSendError} from "../utilities/JSONSender";
import {patchItem} from "../controllers/item/itemPatch.controller";

const router = Router();

//get scrumboard items
router.get("/:id", (req: Request, res: Response) => {
    getItems(req.params.id).then(result => {
        res.json(result);
        console.log(result);
    }, error => {
        res.json(error);
    });
});

router.post("/:id", (req: Request, res: Response) => {
    console.log(req.body.item);
    addItem(req.body.item, req.params.id)
        .then(result => {
            JSONSendItemResponse(res, result);
        }, err => {
            console.log(err);
            JSONSendError(res, []);
        });
});


router.patch("/", (req: Request, res: Response) => {
    patchItem(req.body.item).then(result => {
        JSONSendItemResponse(res, result);
    }, err => {
        JSONSendError(res, []);
    });
});

module.exports = router;