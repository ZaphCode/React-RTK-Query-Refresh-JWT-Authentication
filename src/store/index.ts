import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api";
import authReducer from "./slices/authSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: true
    
})

export type Store = ReturnType<typeof store.getState>

export default store