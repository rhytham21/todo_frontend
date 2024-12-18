import React, { useState } from "react";
import styles from "./task.module.css";
import axios from "axios";
import Modal from "./modal"; // Import the Modal component
import MyVerticallyCenteredModal from "./modal";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/taskSlice";
import { BaseAPI } from "./data";

function Task({ task }) {
  const token = localStorage.getItem("authToken");

  const [modalShow, setModalShow] = useState(false);

  console.log("Task => ", task);

  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      const response = await axios.post(
        `${BaseAPI}/task/delete/${task?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        } //using params '/' in front of url
      );
      dispatch(deleteTask(response?.data?.task?._id));
      console.log("Response => ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className={styles.taskCard}>
        <div className={styles.taskName}>{task?.taskName}</div>
        <div className={styles.taskDescription}>{task?.taskDescription}</div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.updateButton}
            onClick={() => {
              console.log("Clicked");
              setModalShow(true);
            }}
          >
            Update
          </button>
          <button className={styles.deleteButton} onClick={() => onDelete()}>
            Delete
          </button>
        </div>

        {/* Modal for Update */}
        {/* <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        task={task}
      /> */}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        task={task}
      />
    </>
  );
}

export default Task;
