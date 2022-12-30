import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAll } from '~/utils/ProductAPIRoutes';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const res = await axios.get(getAll);

    return res;
})

const initialState = {
    products: [],
    loading: false,
    success: false,
}

const products = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.products = action.payload;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})

const {reducer} = products;

export default reducer;