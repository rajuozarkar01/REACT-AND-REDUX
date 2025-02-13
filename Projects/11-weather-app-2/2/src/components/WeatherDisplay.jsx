import React from "react";
import { useSelector } from "react-redux";

const WeatherDisplay = () => {
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error);

  if (error) return <p className="text-red-500 mt-3 text-center">{error}</p>;

  return (
    weather && (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner text-center">
        <h2 className="text-2xl font-bold">{weather.name}</h2>
        <p className="capitalize text-gray-700">
          {weather.weather[0].description}
        </p>
        <p className="text-xl font-semibold mt-2">🌡 {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
      </div>
    )
  );
};

export default WeatherDisplay;
