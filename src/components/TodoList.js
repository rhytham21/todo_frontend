import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import axios from "axios";

function TodoList() {
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
  });

  const [taskList, setTaskList] = useState([]);

  const onTaskNameChange = (event) => {
    setTask((prev) => {
      return { ...prev, taskName: event.target.value };
    });
  };

  const onDescriptionNameChange = (event) => {
    setTask((prev) => {
      return { ...prev, taskDescription: event.target.value };
    });
  };

  //   const handleChange = (event, field) => {
  //     setTask((prev) => {
  //       return { ...prev, [field]: event?.target?.value };
  //     });
  //   };

  const handleSubmit = async () => {
    try {
      if (!task.taskName || !task.taskName.length) {
        alert("Please enter task name");
        return;
      }
      const response = await axios.post("http://localhost:4001/task/add", {
        task,
      });
      console.log("Response => ", response);
    } catch (error) {}
  };

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4001/task/find");
      console.log(response?.data);
      setTaskList(response?.data?.task);
    } catch (error) {
        console.error("Error fetching tasks", error)
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo app</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Task:{" "}
          <input
            value={task?.taskName}
            onChange={(event) => {
              onTaskNameChange(event);
              //   handleChange(event, "taskName");
            }}
            type="text"
          />
        </label>
        <br />
        <label>
          Enter description:{" "}
          <input
            value={task?.taskDescription}
            onChange={(event) => {
              onDescriptionNameChange(event);
            }}
            type="text"
          />
        </label>
        <button type="submit">Submit 1</button>
      </form>
      <button onClick={handleSubmit}>Submit 2</button>
      <div className={styles.taskList}></div>
      <button onClick={getTasks}>Get Tasks</button>
      {taskList?.map((task,key)=>(
        <div key={key}>
            <h2>{task?.taskName},{task?.taskDescription}</h2>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
