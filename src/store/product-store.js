import { configureStore } from "@reduxjs/toolkit";
import productItemsSlice from "./product-items";

const store = configureStore({
    reducer: {
        productItem: productItemsSlice.reducer,
    }
})

export default store;