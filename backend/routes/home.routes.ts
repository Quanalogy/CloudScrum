/**
 * Created by munk on 10-08-16.
 */
import { Router, Request,Response } from "express";

const router = Router();

//User homepage
router.get("/", (req: Request, res: Response) => {
    res.render("index");
});

module.exports = router;
