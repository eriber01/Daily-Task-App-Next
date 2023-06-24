import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user } from "../../../interfaces";

export const initialStateUser: user = {
  email: '',
  uid: '',
  isLogin: false
}


export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    getUser: (state, actions: PayloadAction<user>) => {
      state.isLogin = actions.payload.isLogin
      state.email = actions.payload.email
      state.uid = actions.payload.uid
    }
  }
})


export const { getUser } = userSlice.actions

export default userSlice.reducer