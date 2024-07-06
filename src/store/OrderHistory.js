import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const OrderHistory = createSlice({
    name: 'history',
    initialState,
    reducers: {

        addToHistory(state, action)
        {
            // var d = new Date();
            // console.log(d);
            // const tempObj = {action.payload, d};
            state.unshift({cartItems: action.payload.cartItems, totalPrice: action.payload.totalPrice, currDate: action.payload.currDate});
        },

    }

});

export const {addToHistory} = OrderHistory.actions;

export default OrderHistory.reducer;

