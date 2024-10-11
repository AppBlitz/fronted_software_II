import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RemoveProducts, Products } from "../../interface/Product.ts";
const initialState: Products[] = [];
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Products>) => {
      const { id } = action.payload;
      if (
        (state.length === 0,
          state.filter((item) => item.id === id).length === 0)
      ) {
        state.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<RemoveProducts>) => {
      const { id } = action.payload;
      if (state.some((item) => item.id === id)) {
        return (state = state.filter((item) => item.id !== id));
      }
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
