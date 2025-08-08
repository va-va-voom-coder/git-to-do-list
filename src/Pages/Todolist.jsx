import React, { useState, useEffect } from "react";
import "../Pages/todolist.css";

function Todolist() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");

  const getTaskKey = (name) => `tasks_${name}`;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.name) {
      setUserName(user.name);
      const taskKey = getTaskKey(user.name);

      const storedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      const taskKey = getTaskKey(userName);
      localStorage.setItem(taskKey, JSON.stringify(tasks));
    }
  }, [tasks, userName]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setTask("");
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="page-center">
      <div className="center-box">
        <h1>{userName ? `${userName}, your To-Do List` : "To-Do List"}</h1>

        <div className="task-input-group">
          <label htmlFor="task-input">Task:</label>
          <input
            id="task-input"
            type="text"
            placeholder="Add your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask} className="add-btn">
            Add
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={t.completed ? "completed" : ""}>
              <label className="task-item">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleComplete(t.id)}
                />
                <span>{t.text}</span>
              </label>
              <button onClick={() => handleDelete(t.id)} className="delete-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todolist;
