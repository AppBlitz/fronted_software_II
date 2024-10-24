import userReducer from "./slice/userSlice.tsx";
import productReducer from "./slice/ProductSlice.tsx"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export { store };
