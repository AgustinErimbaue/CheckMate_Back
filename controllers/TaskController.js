const { get } = require("mongoose");
const Task = require("../models/Tasks");

const TaskController = {
  async createTask(req, res) {
    try {
      const taskData = {
        ...req.body,
        userId: req.user._id,
      };

      const task = await Task.create(taskData);
      res.status(201).json({
        message: "Task created successfully",
        task: task,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        message: "Error creating task",
        error: error.message,
      });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({
        message: "Error fetching tasks",
        error: error.message,
      });
    }
  },

  async updateTask(req, res) {
    try {
      const task = await Task.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
      res.status(200).json({
        message: "Task updated successfully",
        task: task,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
        message: "Error updating task",
        error: error.message,
      });
    }
  },


  async deleteTask(req, res) {
    try {
      const task = await Task.findByIdAndDelete(req.params._id);
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        message: "Error deleting task",
        error: error.message,
      });
    }
  },

  async getTasksByUser(req, res) {
    try {
      const tasks = await Task.find({ userId: req.user._id });
      if (tasks.length === 0) {
        return res.status(404).json({
          message: "No tasks found for this user",
        });
      }
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks for user:", error);
      res.status(500).json({
        message: "Error fetching tasks for user",
        error: error.message,
      });
    }
  },
};

module.exports = TaskController;
