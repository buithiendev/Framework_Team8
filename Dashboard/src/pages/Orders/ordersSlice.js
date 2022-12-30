import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    getAllOrders,
    updateAllStatusAPI,
    updateImeiAPI,
    updateStatusAPI,
    updateStatusPaymentAPI,
} from '~/utils/OrderAPIRoutes';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
    const response = await axios.get(getAllOrders);

    return response.data;
});

export const updateImei = createAsyncThunk(
    'orders/updateImei',
    async (data, thunkAPI) => {
        const response = await axios.post(`${updateImeiAPI}/${data.id}`, data);

        return response.data;
    },
);

export const updateStatus = createAsyncThunk(
    'orders/updateStatus',
    async (data, thunkAPI) => {
        const response = await axios.post(
            `${updateStatusAPI}/${data.id}`,
            data,
        );

        return response.data;
    },
);

export const updateStatusPayment = createAsyncThunk(
    'orders/updateStatusPayment',
    async (data, thunkAPI) => {
        const response = await axios.post(
            `${updateStatusPaymentAPI}/${data.id}`,
            data,
        );

        return response.data;
    },
);

export const updateAllStatus = createAsyncThunk(
    'orders/updateAllStatus',
    async (data, thunkAPI) => {
        const response = await axios.post(
            `${updateAllStatusAPI}/${data.id}`,
            data,
        );

        return response.data;
    },
);

const categories = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        success: false,
    },
    reducers: {},
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orders = action.payload;
        },
        [getOrders.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [updateImei.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateImei.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orders.find((order, index) => {
                if (order._id === action.payload._id) {
                    state.orders[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateImei.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [updateStatus.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateStatus.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orders.find((order, index) => {
                if (order._id === action.payload._id) {
                    state.orders[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateStatus.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [updateAllStatus.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateAllStatus.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orders.find((order, index) => {
                if (order._id === action.payload._id) {
                    state.orders[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateAllStatus.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
    },
});

const { reducer } = categories;

export default reducer;
