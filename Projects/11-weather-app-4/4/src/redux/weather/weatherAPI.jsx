import { createAsyncThunk } from "@reduxjs/toolkit";

// Replace with your OpenWeatherMap API Key
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

console.log("API Key:", apiKey);    //Debugge
console.log("Base URL:", baseUrl);  //Debugge

// Fetch current weather by city name
export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (city) => {
    const response = await fetch(
      `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  }
);

// Fetch 5-day weather forecast
export const fetchForecastByCity = createAsyncThunk(
  "weather/fetchForecastByCity",
  async (city) => {
    const response = await fetch(
      `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Forecast not available");
    return await response.json();
  }
);
// Handle Errors in Fetch Request
// Modify weatherAPI.jsx to 'log' the fetch request:
export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
      const response = await fetch(
        `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        console.error("API Response Error:", response.status, response.statusText);
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      console.log("Weather API Response:", data);
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

