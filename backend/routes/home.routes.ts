/**
 * Created by munk on 10-08-16.
 */
import { Router, Request,Response } from "express";
import {JSONSendPatchResponse, JSONSendError} from "../utilities/JSONSender";
import {patchUserPassword, patchUserDetails} from "../controllers/user/userPatch.controller";

const router = Router();

//User homepage
router.get("/", (req: Request, res: Response) => {
    res.render("index");
});

// Edit an existing user.
router.patch("/", (req: Request, res: Response, next) => {
    patchUserPassword(req.body.email, req.body.currentPassword, req.body.newPassword).then(
        (result) => {
            JSONSendPatchResponse(res, result);
        }
    );
});

router.patch("/userDetails", (req: Request, res: Response) => {
    patchUserDetails(req.body.email, req.body.name, req.body.phoneNumber, req.body.picture).then(
        result => {
            JSONSendPatchResponse(res, result);
        }, err => {
            JSONSendError(res, err);
        }
    )
});

module.exports = router;
