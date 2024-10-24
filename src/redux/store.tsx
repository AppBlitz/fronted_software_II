import {userSlice} from "./slice"
import productReducer from "./ProductSlice.tsx"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export { store }
