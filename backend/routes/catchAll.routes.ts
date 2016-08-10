/**
 * Created by munk on 08-08-16.
 */
import express = require("express");
const router = express.Router();


router.get("*", (req, res, next) => {
    res.render("index");
});




module.exports = router;
