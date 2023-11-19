import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import authSlice from "./Slices/authSlice";

const store = configureStore({
    reducer:{
        cartSlice,
        authSlice,
    }
})

export default store;