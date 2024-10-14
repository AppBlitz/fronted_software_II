import { Customer } from "../../interface/Customer.ts";
import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = (): Customer => {
  const storedUser = localStorage.getItem("user");
  return storedUser
    ? JSON.parse(storedUser)
    : {
      nameCustomer: "",
      email: "",
      password: "",
      phoneNumber: "",
      numerIdentification: "",
      image: "",
      id: "",
    };
};

const initialState: Customer = loadUserFromLocalStorage();
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        id,
        email,
        nameCustomer,
        password,
        image,
        numberIdentification,
        phoneNumber,
      } = action.payload;
      state.id = id;
      state.nameCustomer = nameCustomer;
      state.email = email;
      state.password = password;
      state.image = image;
      state.numberIdentification = numberIdentification;
      state.phoneNumber = phoneNumber;
    },
    changeEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { addUser, changeEmail } = userSlice.actions;

export default userSlice.reducer;
