const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  tasks: [
    {
      task: String,
      completed: false,
      priority: Number,
      id: String,
      _id: false,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
