import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weatherApi/weatherApiSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});