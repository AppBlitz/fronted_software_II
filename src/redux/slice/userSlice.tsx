import { Customer } from "../../interface/Customer.ts";
import { createSlice } from "@reduxjs/toolkit";

// Función para recuperar el usuario de localStorage
const loadUserFromLocalStorage = (): Customer => {
  const storedUser = localStorage.getItem("user");
  return storedUser
    ? JSON.parse(storedUser)
    : { nameCustomer: "", email: "", password: "" };
};

const initialState: Customer = loadUserFromLocalStorage();
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, nameCustomer, password } = action.payload;
      state.nameCustomer = nameCustomer;
      state.email = email;
      state.password = password;
    },
    changeEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { addUser, changeEmail } = userSlice.actions;

export default userSlice.reducer;
