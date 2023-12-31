import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const AddTasks = ({ tasks, setTasks, userID, setIsMakingChanges }) => {
  const [date, setDate] = useState(getTomorrowDate());

  function getTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  console.log(userID);
  const handleInputChange = (e, id, field) => {
    setIsMakingChanges(true);
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, [field]: e.target.value };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  const addTasks = () => {
    setIsMakingChanges(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/tasks/createTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: tasks,
        date: date,
        user: userID,
      }),
    });
    const json = await response.json();
    setIsMakingChanges(false);
    if (json.tasks) {
      setTasks([]);
    }
  };

  const deleteTask = (id) => {
    setIsMakingChanges(true);
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="addTasksSection">
      <h1 className="mainTitle">Next Day's Tasks</h1>
      {tasks.length === 0 ? (
        <p className="subTitle">No tasks</p>
      ) : (
        <form
          className="addTaskForm"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="date"
            value={date}
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          {tasks.map((task) => {
            return (
              <div className="newTasks" key={task.id}>
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
                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </form>
      )}
      <button className="addBtn" onClick={addTasks}>
        Add Task
      </button>
      {tasks.length !== 0 && (
        <button className="submitBtn" onClick={handleSubmit}>
          Submit Tasks
        </button>
      )}
    </div>
  );
};

export default AddTasks;
