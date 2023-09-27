import React, { useState, useEffect } from "react";

const LiveTasks = ({ createdTasks }) => {
  const [currentDayTasks, setCurrentDayTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [todayDate, setTodayDate] = useState("");

  function getTodayDate() {
    const today = new Date();
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
    }
  }, [createdTasks]);

  console.log(currentDayTasks, todoTasks);
  return (
    <div>
      <h1>Tasks To Get Done Today</h1>
      <form>
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
