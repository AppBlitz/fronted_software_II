import {Products} from "../interface/Product.ts"
import {createSlice} from "@reduxjs/toolkit";

const initialState: Products[] = []; // Usamos un array para manejar múltiples productos

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newProduct: Products = action.payload; // Se espera que el payload contenga un objeto de tipo Products
            state.push(newProduct); // Agregamos el nuevo producto al array de productos
        },

    },
});

export const selectProducts = (state:{products: Products[]}) => state.products;

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;