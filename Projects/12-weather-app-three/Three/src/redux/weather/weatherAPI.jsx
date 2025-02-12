import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (city) => {
    const response = await fetch(
      `${baseUrl}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    return response.json();
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ latitude, longitude }) => {
    const response = await fetch(
      `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    return response.json();
  }
);
