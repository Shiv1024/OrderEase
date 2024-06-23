import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart(state, action)
        {
            // console.log("addToCart");
            state.push(action.payload);
            // console.log(state);
        },

        removeFromCart(state, action)
        {
            // console.log(state);
            // console.log("removeFromCart");
            return state.filter((temp) => temp.food.id !== action.payload.id);
        },

        increment(state, action)
        {
            // console.log("increment");
            state.forEach((temp) =>
            {
                if(temp.food.id === action.payload.id) temp.amount++;
            })
            // console.log(state);
        },

        decrement(state, action)
        {
            // console.log("decrement");
            state.forEach((temp) =>
            {
                if(temp.food.id === action.payload.id) temp.amount--;
            })
            // console.log(state);
        }

    }

});

export const {addToCart, removeFromCart, increment, decrement} = CartSlice.actions;

export default CartSlice.reducer;

