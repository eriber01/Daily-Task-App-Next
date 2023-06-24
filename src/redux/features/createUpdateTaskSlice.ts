import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { task } from '../../../interfaces';


interface task2 {
  name?: string
  description?: string
  module?: string
  priority?: string
  id?: string | null
}

const initialState: task = {
  name: '',
  description: '',
  module: '',
  priority: '0',
  status: 0,
  id: ''
}

export const createUpdateSlice = createSlice({
  name: 'createUpdateTask',
  initialState,
  reducers: {
    createUpdateTask: (state, actions: PayloadAction<{ path: keyof task2, value: any }>) => {
      const { path, value } = actions.payload
      state[path] = value
    },
    getTaskForEdit: (state, actions: PayloadAction<task>) => {
      const payload = actions.payload

      state.name = payload.name
      state.description = payload.description
      state.module = payload.module
      state.priority = payload.priority
      state.status = payload.status
      state.id = payload.id

    },
    resetTask: (state) => {

      state.name = ''
      state.description = ''
      state.module = ''
      state.priority = '0'
      state.status = 0
      state.id = ''
    }
  }
})


export const { createUpdateTask, resetTask, getTaskForEdit } = createUpdateSlice.actions

export default createUpdateSlice.reducer