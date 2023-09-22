import React, { useState } from "react";

const AddTasks = () => {
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e, id, field) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, [field]: e.target.value };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  const addTasks = () => {
    setTasks((preTasks) => {
      const newTasks = [...preTasks];
      const lastTask = newTasks[newTasks.length - 1];

      if (!lastTask || lastTask.task) {
        newTasks.push({
          task: "",
          completed: false,
          priority: 0,
          id: `${Date.now()}`,
        });
      }
      return newTasks;
    });
  };

  return (
    <div>
      <h1>Create Next Day Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <form>
          {tasks.map((task) => {
            return (
              <div key={task.id}>
                <textarea
                  type="text"
                  placeholder="Type task"
                  name="task"
                  value={task.task}
                  onChange={(e) => {
                    handleInputChange(e, task.id, "task");
                  }}
                ></textarea>
                <input
                  type="Number"
                  name="priority"
                  value={task.priority}
                  placeholder="Priority order"
                  onChange={(e) => {
                    handleInputChange(e, task.id, "priority");
                  }}
                />
              </div>
            );
          })}
        </form>
      )}
      <button onClick={addTasks}>Add Task</button>
    </div>
  );
};

export default AddTasks;
