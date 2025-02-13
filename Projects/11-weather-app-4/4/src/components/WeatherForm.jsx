import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherByCity } from "../redux/weather/weatherAPI";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    
    console.log("Dispatching fetchWeatherByCity with:", city); // Debug log
    dispatch(fetchWeatherByCity(city));
    
    setCity(""); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 bg-white/20 p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 rounded-md bg-white/80 outline-none text-gray-900"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
        Get Weather
      </button>
    </form>
  );
};

export default WeatherForm;
