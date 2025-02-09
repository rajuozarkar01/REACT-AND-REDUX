import React, { useState } from "react";
import "./App.css";

// WeatherApp component fetches weather data from OpenWeatherMap API and displays it
const WeatherApp = () => {
  // State variables to store user input, weather data, and error messages
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // OpenWeatherMap API key (replace with your own API key)
  const API_KEY = "05d72ef477587dee2adf9fc7a94d35e5";

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) return; // Exit if city input is empty
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found"); // Handle errors if city is invalid
      }

      const data = await response.json();
      setWeather(data); // Update weather state with API response
    } catch (err) {
      setError(err.message); // Update error state with error message
    }
  };

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4 ">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2">
        {/* Input field for city name */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Button to fetch weather data */}
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Weather
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display weather information if available */}
      {weather && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p className="text-lg">Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
