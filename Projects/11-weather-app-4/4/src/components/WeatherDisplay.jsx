import React from "react";
import { useSelector } from "react-redux";

const WeatherDisplay = () => {
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error);

  if (error) {
    return <p className="text-red-500 mt-3 text-center font-semibold">❌ {error}</p>;
  }

  if (!weather || !weather.weather || !Array.isArray(weather.weather) || weather.weather.length === 0) {
    return <p className="text-gray-600 mt- text-center">No weather data available.</p>;
  }

  // Get icon URL from weather API (Example: OpenWeather API)
  const iconCode = weather.weather[0]?.icon; 
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="mt-4 p-4 rounded-lg shadow-lg text-center text-gray-900 bg-white/80 backdrop-blur-md">
      <h2 className="text-4xl font-bold">{weather.name}</h2>
      <p className="capitalize text-lg">{weather.weather[0].description}</p>
      <img src={iconUrl} alt="Weather Icon" className="w-24 h-24 mx-auto" />
      <p className="text-2xl font-semibold mt-2">🌡 {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
