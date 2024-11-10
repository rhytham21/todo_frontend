import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import axios from "axios";
import Task from "./task";

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
      setTask({taskName: "", taskDescription: ""})
      console.log("Response => ", response);
    } catch (error) {}
  };

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4001/task/find");
      console.log(response?.data);
      setTaskList(response?.data?.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(()=>{
    getTasks();
  },[])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo app</h1>

      <div className={styles.formContainer}>
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
            placeholder="Enter task title"
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
            placeholder="Enter task details and deadlines"
          />
        </label>
      </form>
      <button className= {styles.submitButton}onClick={handleSubmit}>Submit</button>
      <div className={styles.taskList}></div>
      <button className={styles.taskButton} onClick={getTasks}>Get Tasks</button>
      </div>
      
      <div className={styles.taskListContainer}>
        {taskList?.map((task, key) => (
          <Task
          key={key}
          task={task}
        />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
