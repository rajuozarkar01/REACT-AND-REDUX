import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./weatherAPI";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.error = "Failed to fetch weather data";
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.error = "Failed to fetch weather data";
      });
  },
});

export default weatherSlice.reducer;
