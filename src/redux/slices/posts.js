import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fecthPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
})

export const fetchTags = createAsyncThunk('/')
const initialState = {
    posts: {
        items:[],
        status: 'loading',
    },

    tags: {
        items: [],
        status: 'loading'
    }
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {
        
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts = 'failed';
        }
    }
})

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading'
        }
    }
})

export const postsReducer = postsSlice.reducer;