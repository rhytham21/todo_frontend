import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TodoList.module.css";
import axios from "axios";
import Task from "./task"; // Ensure the correct path
import { useSelector, useDispatch } from "react-redux";
import { addTask, setTasks } from "../redux/taskSlice";
import { BaseAPI } from "./data";

function TodoList() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
  });

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => ({
    tasks: state.tasks.tasks,
  }));

  const onTaskNameChange = (event) => {
    setTask((prev) => ({ ...prev, taskName: event.target.value }));
  };

  const onDescriptionNameChange = (event) => {
    setTask((prev) => ({ ...prev, taskDescription: event.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (!task.taskName || !task.taskName.length) {
        alert("Please enter task name");
        return;
      }

      const response = await axios.post(
        `${BaseAPI}/task/add`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTask({ taskName: "", taskDescription: "" });
      dispatch(addTask(response?.data?.task));
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BaseAPI}/task/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setTasks(response?.data?.tasks));
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo app</h1>

      <div className={styles.formContainer}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Enter Task:
            <input
              value={task?.taskName}
              onChange={onTaskNameChange}
              type="text"
              placeholder="Enter task title"
            />
          </label>
          <br />
          <label>
            Enter Description:
            <input
              value={task?.taskDescription}
              onChange={onDescriptionNameChange}
              type="text"
              placeholder="Enter task details and deadlines"
            />
          </label>
        </form>
        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.taskListContainer}>
        {tasks?.map((task, key) => (
          <Task key={key} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
