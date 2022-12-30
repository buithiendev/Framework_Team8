import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { add, getAll } from '~/utils/StoreAPI';

export const addStore = createAsyncThunk(
    'stores/add',
    async (data, thunkAPI) => {
        const response = await axios.post(add, data);

        return response.data;
    },
);

export const getAllStore = createAsyncThunk('stores/getAll', async () => {
    const response = await axios.get(getAll);

    return response.data;
});

const initialState = {
    stores: [],
    loading: false,
    success: false,
};

const stores = createSlice({
    name: 'stores',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [addStore.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [addStore.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.stores.push(action.payload);
        },
        [addStore.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllStore.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getAllStore.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.stores = action.payload;
        },
        [getAllStore.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

const { reducer } = stores;

export default reducer;
