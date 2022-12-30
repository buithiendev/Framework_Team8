import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addToCart } from '~/utils/customerRoute';

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (pack, thunkAPI) => {
        // const { _id } = pack;
        // delete pack._id;
        // const res = await axios.post(`${updateUserRoute}/${_id}`, {
        //     ...pack,
        // });
        // return res.data;
    },
);

export const addCartItem = createAsyncThunk(
    'customer/addCartItem',
    async (pack, thunkAPI) => {
        const { _id } = pack;
        const response = await axios.post(`${addToCart}/${_id}`, pack);

        console.log(response);
    },
);

const cart = createSlice({
    name: 'cart',
    initialState: {
        status: false,
        listCarts: [],
    },
    extraReducers: {
        [addCartItem.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [addCartItem.fulfilled]: (state, action) => {
            state.success = true;
            state.loading = false;
            state.info = action.payload;
        },
        [addCartItem.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

const { reducer, actions } = cart;

export const { setInfoCurrentUser, clearCurrentUser } = actions;
export default reducer;
