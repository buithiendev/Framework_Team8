import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addRoute, getAllRoute, updateRoute } from '~/utils/SeriesAPIRoutes';

export const addSeries = createAsyncThunk('series/addSeries', async (data, thunkAPI) => {
    const res = await axios.post(addRoute, data);

    return res.data;
});

export const updateSeries = createAsyncThunk('series/updateSeries', async (data, thunkAPI) => {
    const res = await axios.post(`${updateRoute}/${data.categoryId}`, data);

    return res.data;
});

export const getAllSeries = createAsyncThunk('series/getAllSeries', async () => {
    const res = await axios.get(getAllRoute);

    return res.data;
});

const series = createSlice({
    name: 'series',
    initialState: {
        loading: false,
        success: false,
        series: [],
    },
    reducers: {},
    extraReducers: {
        [getAllSeries.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getAllSeries.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.series = action.payload;
        },
        [getAllSeries.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [addSeries.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [addSeries.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.series.push(action.payload);
        },
        [addSeries.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [updateSeries.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateSeries.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.series.filter((seri, index) => {
                if (seri._id === action.payload._id) {
                    state.series[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateSeries.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
    },
});

const { reducer } = series;

export default reducer;
