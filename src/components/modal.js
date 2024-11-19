import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./modal.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { BaseAPI } from "./data";

function MyVerticallyCenteredModal(props) {
  const token = localStorage.getItem("authToken");
  const [updatedTask, setUpdatedTask] = useState({
    taskName: props?.task?.taskName || "",
    taskDescription: props?.task?.taskDescription || "",
  });

  const dispatch = useDispatch();

  // Handle input change in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle updating the task
  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `${BaseAPI}/task/update?id=${props?.task._id}`, //using query here instead. ?id = 
        { task: updatedTask } , {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(updateTask(response?.data?.task))
      console.log("Update Response =>", response);
      props?.onHide(); // Close the modal
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h2>Update Task</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={updatedTask.taskName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="taskDescription">Task Description</label>
            <input
              type="text"
              id="taskDescription"
              name="taskDescription"
              value={updatedTask.taskDescription}
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.submitButton} onClick={handleUpdate}>
            Update Task
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
