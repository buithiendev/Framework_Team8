import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk('users/updateUser', async (pack, thunkAPI) => {
    // const { _id } = pack;
    // delete pack._id;
    // const res = await axios.post(`${updateUserRoute}/${_id}`, {
    //     ...pack,
    // });
    // return res.data;
});

const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
        status: false,
        info: null,
    },
    reducers: {
        setInfoCurrentUser: (state, action) => {
            state.status = true;
            state.info = action.payload;
        },
        clearCurrentUser: (state) => {
            state.status = false;
            state.info = null;
        },
    },
    extraReducers: {
        [updateUser.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.success = true;
            state.loading = false;
            state.info = action.payload;
            
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        },
    }
});

const { reducer, actions } = currentUser;

export const { setInfoCurrentUser, clearCurrentUser } = actions;
export default reducer;
