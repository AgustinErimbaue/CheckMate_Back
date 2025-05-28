const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.getAllTasks);
router.post("/create", TaskController.createTask);
router.put("/update/:_id", TaskController.updateTask);

module.exports = router;
