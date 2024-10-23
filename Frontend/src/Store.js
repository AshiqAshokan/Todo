import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice/authSlice'
import taskReducer from './Slice/TaskSlice'
import { apiSlice } from "./Slice/apiSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        tasks: taskReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store;