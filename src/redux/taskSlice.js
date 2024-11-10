import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      console.log("Action payload => ", action.payload);
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (updatedTaskIndex !== -1) {
        //if index not found, findIndex() returns -1. Thus here the index IS FOUND!
        state.tasks[updatedTaskIndex] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
