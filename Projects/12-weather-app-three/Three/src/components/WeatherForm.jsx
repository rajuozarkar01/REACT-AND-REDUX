import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherByCity } from "../redux/weather/weatherAPI";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city)
      {
      dispatch(fetchWeatherByCity(city));
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-4 bg-white/20 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-md bg-white/80 outline-none text-gray-900"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Search
      </button>
    </form>
  );
};

export default WeatherForm;
