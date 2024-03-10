import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
function App() {
  const [tasks, setTasks] = useState([]);
  const [removetasks, setRemoveTasks] = useState([]);

  const addTask = () => {
    const task = document.getElementById("input-task").value;
    if (!task) return;
    setTasks((t) => [...t, task]);
    document.getElementById("input-task").value = "";
  };

  const removeTask = (index) => {
    if (tasks.length == 1) localStorage.removeItem("task");
    setRemoveTasks((r) => [...r, tasks[index]]);
    setTasks((t) => t.filter((_, i) => i != index));
  };
  const deleteTask = (index) => {
    if (removetasks.length == 1) localStorage.removeItem("remove");
    setRemoveTasks((r) => r.filter((_, i) => i != index))
  }
  const remove_icon = (
    <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "#50668b" }} />
  );
  const upIcon = <FontAwesomeIcon icon={faArrowUp} size="lg" />;
  const downIcon = <FontAwesomeIcon icon={faArrowDown} size="lg" />;

  useEffect(() => {
    if (tasks && tasks.length > 0)
      localStorage.setItem("task", JSON.stringify(tasks));
    if (removetasks && removetasks.length > 0)
      localStorage.setItem("remove", JSON.stringify(removetasks));
  }, [tasks, removetasks]);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem("task"));
    if (task && task.length > 0) {
      setTasks(task);
    }
    const rtask = JSON.parse(localStorage.getItem("remove"));
    if (rtask && rtask.length > 0) {
      setRemoveTasks(rtask);
    }
  }, []);

  const handleUpMove = (index) => {
    if (index == 0) return;
    const temp = tasks[index - 1];
    tasks[index - 1] = tasks[index];
    tasks[index] = temp;
    setTasks([...tasks]);
  };
  const handleDownMove = (index) => {
    if (index == tasks.length - 1) return;
    const temp = tasks[index + 1];
    tasks[index + 1] = tasks[index];
    tasks[index] = temp;
    setTasks([...tasks]);
  };

  return (
    <div className="main_container">
      <h2>ToDo List</h2>
      <div>
        <input
          type="text"
          id="input-task"
          placeholder="Enter Task"
          className="input_field"
        />
        <button onClick={addTask} className="add_btn">
          Add task
        </button>
      </div>
      <div className="Task-container">
        <div className="to-do-list">
          <h3>Tasks</h3>
          <ol>
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                {`${index+1}. ${task}`}
                <span>
                  <a title="Remove">
                    <button
                      onClick={() => removeTask(index)}
                      className="remove">
                      {remove_icon}
                    </button>
                  </a>
                  <button onClick={() => handleUpMove(index)} className="up-btn">{upIcon}</button>
                  <button onClick={() => handleDownMove(index)} className="down-btn">
                    {downIcon}
                  </button>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="removed-list">
          <h3>Completed tasks</h3>
          <ol>
            {removetasks.map((task, index) => (
              <li key={index} className="removed-item">
                {task}
                <span>
                  <a title="Remove">
                    <button
                      onClick={() => deleteTask(index)}
                      className="remove">
                      {remove_icon}
                    </button>
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
