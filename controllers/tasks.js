const Task = require("../models/Task");

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
