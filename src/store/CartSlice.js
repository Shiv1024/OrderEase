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
        },


        clearCart(state)
        {
            // state = [];
            state.splice(0, state.length);
            // console.log(state);
        },

        repeatOrder(state, action)
        {
            action.payload.forEach(item => {
                state.push({food: item.food, amount: item.amount});
            })

            // state = action.payload;
        }

    }

});

export const {addToCart, removeFromCart, increment, decrement, clearCart, repeatOrder} = CartSlice.actions;

export default CartSlice.reducer;

