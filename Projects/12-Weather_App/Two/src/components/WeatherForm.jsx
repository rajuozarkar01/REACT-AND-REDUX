import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherByCity } from "../redux/weather/weatherAPI";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeatherByCity(city));
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Weather
      </button>
    </div>
  );
};

export default WeatherForm;
