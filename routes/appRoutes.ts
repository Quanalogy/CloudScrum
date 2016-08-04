import express = require("express");
const router = express.Router();

/* Get home page */

router.get("/", (req, res, next) => {
    res.render("index");
});

router.post("/", (req, res, next) => {
    console.log("I got a post request");
    console.log(req.body);
});

router.post("/create-user", (req, res, next) => {
    console.log("I got a post request");
    console.log(req.body);
});

module.exports = router;
