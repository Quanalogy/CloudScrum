import { Router } from "express";

const router = Router();

// Get all users.
router.get("/", (req, res, next) => {
    res.render("index");
});

// Get a single user.
router.get("/:id", (req, res, next) => {
    res.render("index");
});

// Create a new user.
router.post("/", (req, res, next) => {
    res.render("index");
});



// Edit an existing user.
router.patch("/", (req, res, next) => {
    res.render("index");
});

// Overwrite an existing user.
router.put("/", (req, res, next) => {
    res.render("index");
});

// Delete a user.
router.delete("/", (req, res, next) => {
    res.render("index");
});

module.exports = router;
