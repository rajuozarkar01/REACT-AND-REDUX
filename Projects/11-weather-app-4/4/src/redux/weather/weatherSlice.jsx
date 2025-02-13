import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByCoords, fetchWeatherByCity, fetchForecastByCity } from "./weatherAPI"; // ✅ Import fetchWeatherByCity

const initialState = {
  data: null,
  forecast: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle geolocation-based weather fetch
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Handle city-based weather fetch (this was missing)
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // ✅ Update weather data when city search is successful
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle 5-day forecast fetch
      .addCase(fetchForecastByCity.fulfilled, (state, action) => {
        state.forecast = action.payload;
      });
  },
});

export default weatherSlice.reducer;
