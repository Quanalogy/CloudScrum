/**
 * Created by munk on 29-07-16.
 */
import express = require("express");
const router = express.Router();


/* Get home page */

router.get("/", (req, res, next) => {
    res.render("index");
});

module.exports = router;