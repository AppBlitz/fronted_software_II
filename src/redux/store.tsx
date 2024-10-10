import userReducer from "./UserSlice.tsx"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export { store }
