import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";
import userSlice from './features/userSlice';
import createUpdateSlice from './features/createUpdateTaskSlice';
import uiSlice from './features/uiSlice';
import moduleSlice from './features/moduleSlice';

export const store = configureStore({
  reducer: {
    taskSlice,
    userSlice,
    createUpdateSlice,
    uiSlice,
    moduleSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch