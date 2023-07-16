import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface moduleInterface {
  name: string
  id: number
}
// const modules: moduleInterface  = {
//   name: '',
//   id: 
// }
export const initialStateUser = {
  module: []
}


export const moduleSlice = createSlice({
  name: 'modules',
  initialState: initialStateUser,
  reducers: {
    getModule: (state, actions: PayloadAction<{ modules: [] }>) => {
      state.module = actions.payload.modules 
    }
  }
})


export const { getModule } = moduleSlice.actions

export default moduleSlice.reducer