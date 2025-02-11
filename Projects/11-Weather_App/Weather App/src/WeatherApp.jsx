import React, { useState, useEffect } from "react";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // console.log("API Key:", apiKey);
  // console.log("Base URL:", baseUrl);

  // Fetch weather by city name
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `${baseUrl}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data); // Update state with weather data
      setError(null); // Clear errors
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Failed to fetch weather data");
    }
  };

  // Fetch weather by geolocation coordinates
  const fetchWeatherByCoords = async (latitude, longitude) => {
    console.log("Latitude:", latitude, "Longitude:", longitude); // Debugging
    try {
      const response = await fetch(
        `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log("Weather Data:", data); // Debugging
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Failed to fetch weather data");
    }
  };

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", latitude, longitude);
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Location access denied:", error);
          setError("Location access denied. Enter a city manually.");
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Weather
          </button>
        </div>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {weather && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner text-center">
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="capitalize text-gray-700">
              {weather.weather[0].description}
            </p>
            <p className="text-xl font-semibold mt-2">
              🌡 {weather.main.temp}°C
            </p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
