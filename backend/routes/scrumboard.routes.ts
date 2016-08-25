/**
 * Created by munk on 25-08-16.
 */
import { Router, Request,Response } from "express";



const router = Router();

//get scrumboards
router.get("/:id", (req: Request, res: Response) => {
    /*getItems().then(result => {
        res.json(result);
        console.log(result);
    }, error => {
        res.json(error);
    });*/
});

router.post("/:id", (req: Request, res: Response) => {
/*
    addItem(req.body.item)
        .then(result => {
            JSONSendItemResponse(res, result);
        }, err => {
            console.log(err);
            JSONSendError(res, []);
        });*/
});


router.patch("/", (req: Request, res: Response) => {
    /*patchItem(req.body.item).then(result => {
        JSONSendItemResponse(res, result);
    }, err => {
        JSONSendError(res, []);
    });*/
});



module.exports = router;