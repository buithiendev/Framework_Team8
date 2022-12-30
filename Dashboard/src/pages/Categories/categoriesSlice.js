import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    add,
    changeStatusRoute,
    getAll,
    update,
} from '~/utils/CategoriesAPIRoutes';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const res = await axios.get(getAll);
        return res.data;
    },
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (data, thunkAPI) => {
        const res = await axios.post(add, data);
        return res.data;
    },
);

export const changeStatus = createAsyncThunk(
    'categories/changeStatus',
    async (data, thunkAPI) => {
        const id = data.id;
        const res = await axios.post(`${changeStatusRoute}/${id}`, data);

        console.log(res.data);
        return res.data.category;
    },
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (data, thunkAPI) => {
        const id = data.get('id');
        const res = await axios.post(`${update}/${id}`, data);
        return res.data.category;
    },
);

const categories = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        success: false,
    },
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [addCategory.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [addCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload) state.categories.push(action.payload);
        },
        [addCategory.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [updateCategory.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.categories.find((category, index) => {
                if (category._id === action.payload._id) {
                    state.categories[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [changeStatus.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [changeStatus.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.categories.find((category, index) => {
                if (category._id === action.payload._id) {
                    state.categories[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [changeStatus.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
    },
});

const { reducer } = categories;

export default reducer;
