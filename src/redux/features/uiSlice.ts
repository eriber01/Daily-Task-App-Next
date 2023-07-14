import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateUser = {
  isOpen: false
}


export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialStateUser,
  reducers: {
    toggleModalTask: (state, actions: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = actions.payload.isOpen
    }
  }
})


export const { toggleModalTask } = uiSlice.actions

export default uiSlice.reducer