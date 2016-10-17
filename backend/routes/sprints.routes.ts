import {Router} from "express";
import {Response,Request} from "express";
import {getSprints} from "../controllers/sprint/sprintRead.controller";
import {addSprint} from "../controllers/sprint/sprintCreate.controller";
import {JSONSendItemResponse} from "../utilities/JSONSender";
/**
 * Created by munk on 25-08-16.
 */
const router = Router();

// get sprints by projectId
router.get("/:id", (req: Request, res: Response) => {
    getSprints(req.params.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
});


router.post("/", (req: Request, res: Response) => {
    addSprint(req.body.sprint).then(response => {
        JSONSendItemResponse(res, response);
    }, err => {
        JSONSendItemResponse(res, err);
    });
});


module.exports = router;