import { Customer } from "../interface/Customer.ts"
import { createSlice } from "@reduxjs/toolkit";

const initialState: Customer = {
  nameCustomer: "",
  email: "",
  password: ""
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, nameCustomer, password } = action.payload;
      state.nameCustomer = nameCustomer;
      state.email = email;
      state.password = password
    },
    changeEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { addUser, changeEmail } = userSlice.actions;

export default userSlice.reducer;
