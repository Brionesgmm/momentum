import React, { useState, useEffect } from "react";

const LiveTasks = ({ createdTasks }) => {
  const [currentDayTasks, setCurrentDayTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [taskDocID, setTaskDocID] = useState("");

  function getTodayDate() {
    const today = new Date();

    const month = today.getMonth() + 1; // Adjust for 0-indexed months
    const day = today.getDate();
    const year = today.getFullYear();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    setFormattedDate(`${formattedMonth}/${formattedDay}/${year}`);
    setTodayDate(today.toISOString().split("T")[0]);
  }

  function updateTasks(e, id) {
    const updatedTasks = todoTasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: e.target.checked };
      }
      return task;
    });
    setTodoTasks(updatedTasks);
  }

  const handleTaskUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `/api/tasks/updateTasks/${taskDocID}?_method=PUT`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: todoTasks,
        }),
      }
    );
    const data = await response.json();
    setCurrentDayTasks(data);
  };

  useEffect(() => {
    getTodayDate();
    const filteredTasks = createdTasks.filter(
      (task) => task.date === todayDate
    );
    setCurrentDayTasks(filteredTasks);

    if (filteredTasks.length > 0) {
      setTodoTasks(
        filteredTasks[0].tasks.sort((a, b) => a.priority - b.priority)
      );
      setTaskDocID(filteredTasks[0]._id);
    }
  }, [createdTasks]);

  console.log(currentDayTasks, todoTasks, taskDocID);
  return (
    <div>
      <h1>{formattedDate}</h1>
      <h1>Tasks To Get Done Today</h1>
      <form onSubmit={handleTaskUpdate}>
        {todoTasks.map((task) => {
          return (
            <div key={task.id}>
              <p>{task.priority}</p>
              <p readOnly>{task.task}</p>
              <input
                type="checkbox"
                name="completed"
                checked={task.completed}
                onChange={(e) => updateTasks(e, task.id)}
              />
            </div>
          );
        })}
        <button>Update Tasks List</button>
      </form>
    </div>
  );
};

export default LiveTasks;
