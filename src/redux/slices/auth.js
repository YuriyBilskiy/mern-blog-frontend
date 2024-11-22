import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async (params) => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchRegister = createAsyncThunk('/auth/register', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading',

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        }, 
        [fetchAuth.rejected]: (state) => {
            state.data = null;
            state.status = 'failed';
        },
        [fetchAuthMe.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        }, 
        [fetchAuthMe.rejected]: (state) => {
            state.data = null;
            state.status = 'failed';
        },
        [fetchRegister.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        }, 
        [fetchRegister.rejected]: (state) => {
            state.data = null;
            state.status = 'failed';
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;