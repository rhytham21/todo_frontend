import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import axios from "axios";
import Task from "./task";
import { useSelector, useDispatch } from "react-redux";
import { addTask, setTasks } from "../redux/taskSlice";

function TodoList() {
  // State to manage the current task being added
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
  });

  // State to manage the list of tasks
  const [taskList, setTaskList] = useState([]);

  //Redux setup
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => {
    return {
      tasks: state.tasks.tasks, // Selecting tasks from Redux state
    };
  });

  //Handler to change the taskName
  const onTaskNameChange = (event) => {
    setTask((prev) => {
      return { ...prev, taskName: event.target.value }; //Update the taskName in state
    });
  };

  //Handler to change the taskDescription
  const onDescriptionNameChange = (event) => {
    setTask((prev) => {
      return { ...prev, taskDescription: event.target.value }; //Update the taskDescription in state
    });
  };

  //   const handleChange = (event, field) => {
  //     setTask((prev) => {
  //       return { ...prev, [field]: event?.target?.value };
  //     });
  //   };

  //Handler for task submission
  const handleSubmit = async () => {
    try {
      if (!task.taskName || !task.taskName.length) {
        alert("Please enter task name"); //check to alert if taskName is missing
        return;
      }
      //POST request to add the task
      const response = await axios.post("http://localhost:4001/task/add", {
        task,
      });
      //update the taskName and taskDescription in state
      setTask({ taskName: "", taskDescription: "" });
      // Dispatch an action to add the new task to Redux state
      dispatch(addTask(response?.data?.task));
    } catch (error) {}
  };

  //Function to fetch task from server
  const getTasks = async () => {
    try {
      //GET request to get all the tasks
      const response = await axios.get("http://localhost:4001/task/find");
      console.log(response?.data); //Log the fetched tasks
      //Dispatch an action to set fetched tasks
      dispatch(setTasks(response?.data?.tasks));
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
        <div className={styles.taskList}></div>
        
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
