import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllUsersRoute, registerRoute, updateStatus,updateUserRoute } from '~/utils/UsersAPIRoutes';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axios.get(getAllUsersRoute);
    return res.data;
});

export const addUser = createAsyncThunk('users/addUser', async (data, thunkAPI) => {
    const { firstName, lastName, email, role, password, phone, status } = data;
    const res = await axios.post(registerRoute, {
        firstName,
        lastName,
        email,
        role,
        password,
        phone,
        status,
    });
    return res.data.user;
});

export const updateStatusUser = createAsyncThunk('users/updateStatusUser', async (data, thunkAPI) => {
    const { id, status } = data;
    const res = await axios.post(`${updateStatus}/${id}`, {
        status: status,
    });
    return res.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (pack, thunkAPI) => {
    const { id, data } = pack;
    const res = await axios.post(`${updateUserRoute}/${id}`, {
        ...data,
    });
    return res.data;
});

const users = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        success: false,
    },
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
        },
        [addUser.pending]: (state, action) => {
            state.loading = true;
        },
        [addUser.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload) state.users.push(action.payload);
        },
        [addUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateStatusUser.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateStatusUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.users.find((user, index) => {
                if (user._id === action.payload._id) {
                    state.users[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateStatusUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.success = true;
            state.loading = false;
            state.users.find((user, index) => {
                if (user._id === action.payload._id) {
                    state.users[index] = action.payload;
                    return true;
                }
                return false;
            });
            
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

const { reducer } = users;

export default reducer;
