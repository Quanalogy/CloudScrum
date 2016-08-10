import { Router, Request,Response } from "express";
const router = Router();

/* Get home page */

router.get("/", (req: Request, res: Response, next) => {
    res.render("index");
});


module.exports = router;
