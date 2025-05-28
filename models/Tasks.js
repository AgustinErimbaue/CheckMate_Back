const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    description: String, 
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
