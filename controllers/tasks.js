const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const tasks = await Task.find({ user: userId }).lean();

    res.json({ tasks: tasks });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.createTasks = async (req, res) => {
  try {
    const tasks = await Task.create({
      date: req.body.date,
      tasks: req.body.tasks,
      user: req.user.id,
    });
    console.log("Tasks have been added!");
    res.json({ tasks });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const newTasks = req.body.tasks;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        tasks: newTasks,
      },
      {
        new: true,
      }
    );
    console.log("Tasks updated");
    res.json(updatedTask);
  } catch (err) {
    console.log(err);
  }
};
