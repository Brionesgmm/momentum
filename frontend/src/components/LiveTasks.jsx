import React, { useState, useEffect } from "react";

const LiveTasks = ({ createdTasks, setIsMakingChanges }) => {
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
    setIsMakingChanges(true);
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
    setIsMakingChanges(false);
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
  }, [createdTasks, todayDate]);

  console.log(currentDayTasks, todoTasks, taskDocID);
  return (
    <div>
      <h1 className="mainTitle">Today: {formattedDate}</h1>
      <h1 className="subTitle">Get It Done!</h1>
      <form className="activeTasksForm" onSubmit={handleTaskUpdate}>
        {todoTasks.map((task) => {
          return (
            <div className="activeTasks" key={task.id}>
              <p>{task.priority}.</p>
              <label htmlFor={task.id} readOnly>
                {task.task}
              </label>
              <input
                id={task.id}
                type="checkbox"
                name="completed"
                checked={task.completed}
                onChange={(e) => updateTasks(e, task.id)}
              />
            </div>
          );
        })}
        <button className="submitBtn">Update Tasks List</button>
      </form>
    </div>
  );
};

export default LiveTasks;
