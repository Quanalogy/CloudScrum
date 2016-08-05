import express = require("express");
const router = express.Router();
import {createUser} from "../controllers/user/userControllerCreate";

/* Get home page */

router.get("/", (req, res, next) => {
    res.render("index");
});
router.get("*", (req, res, next) => {
    res.render("index");
});


router.post("/create-user", (req, res) =>{
    console.log("I got a post request");
    console.log(req.body);

    const promise = createUser(req.body.email, req.body.password);

    // brug .then til at vente på den er færdig,
    // hvis god (200) send 200
    // hv dårlig send fejl og håndter det i userservice.
});

module.exports = router;
