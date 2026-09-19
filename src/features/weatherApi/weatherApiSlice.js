import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        temperature: null,
        description: "",
        minTemp: null,
        maxTemp: null,
        temperatureIcon: null,
    },
    status: "idle",
    error: null,
};

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=35.5317&lon=35.7901&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );

            const weather = response.data;

            return {
                temperature: Math.round(weather.main.temp),
                description: weather.weather[0].description,
                minTemp: Math.round(weather.main.temp_min),
                maxTemp: Math.round(weather.main.temp_max),
                temperatureIcon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const weatherApiSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })

            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })

            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default weatherApiSlice.reducer;