import userReducer from "./UserSlice.tsx"
import productReducer from "./ProductSlice.tsx"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export { store }
