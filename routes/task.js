const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const { authentication } = require("../middleware/authentication");

router.get("/", authentication, TaskController.getAllTasks);
router.get("/:_id", authentication, TaskController.getTasksByUser);
router.post("/create", authentication, TaskController.createTask);
router.put("/update/:_id", authentication, TaskController.updateTask);
router.delete("/delete/:_id", authentication, TaskController.deleteTask);

module.exports = router;
