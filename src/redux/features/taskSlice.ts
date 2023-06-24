import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { task } from "../../../interfaces";

interface taskState {
  task: task[],
  loading: boolean
}

export const initialStateTask: taskState = {
  task: [],
  loading: true
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialStateTask,
  reducers: {
    addTask: (state, actions) => {

      state.task = actions.payload

    },
    deleteTask: (state, actions: PayloadAction) => {

    }
  },
})


export const { addTask } = taskSlice.actions

export default taskSlice.reducer