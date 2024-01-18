import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: {
    id: string;
    email: string;
    password: string;
    name:string
  } | null;
}

const intialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
        state.userInfo = null;
        localStorage.clear();
      },
  },
});

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer;