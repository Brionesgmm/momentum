const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createTasks", ensureAuth, tasksController.createTasks);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
