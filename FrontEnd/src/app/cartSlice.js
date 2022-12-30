import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
    name: 'cart',
    initialState: {
        status: false,
        cart: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.status = true;
            state.cart = action.payload;
        },
        addItem: (state, action) => {
            state.cart.push(action.payload);
            localStorage.setItem('carts', JSON.stringify(state.cart));
        },
        removeItem: (state, action) => {
            const newList = state.cart.filter(
                (item, index) => index !== action.payload,
            );
            localStorage.setItem('carts', JSON.stringify(newList));
            state.cart = newList;
        },
        clearCart: (state) => {
            localStorage.setItem('carts', JSON.stringify([]));
            state.status = false;
            state.cart = [];
        },
    },
});

const { reducer, actions } = cart;

export const { setCart, clearCart, addItem, removeItem } = actions;
export default reducer;
