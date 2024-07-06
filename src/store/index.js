import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import HistoryReducer from "./OrderHistory";

const store = configureStore({

    reducer: {
        cart: CartReducer,
        history: HistoryReducer
    }

});

export default store;