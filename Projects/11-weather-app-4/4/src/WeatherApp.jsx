import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByCoords,
  fetchForecastByCity,
} from "./redux/weather/weatherAPI";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay"; // New component

const WeatherApp = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const [loading, setLoading] = useState(true);

  // Check if Geolocation is Working
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Geolocation success:", position.coords);
    },
    (error) => {
      console.error("Geolocation error:", error);
    }
  );

  // Fetch weather by geolocation on first render
  // If it logs "Dispatching fetchWeatherByCoords with: ...", Redux is receiving the coordinates
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            "Dispatching fetchWeatherByCoords with:",
            latitude,
            longitude
          );
          dispatch(fetchWeatherByCoords({ lat: latitude, lon: longitude }));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported.");
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch forecast when weather data is available
  useEffect(() => {
    if (weather) {
      dispatch(fetchForecastByCity(weather.name));
      setLoading(false); // Stop loading once weather data is fetched
    }
  }, [weather, dispatch]);

  // const weather = useSelector((state) => state.weather.data);
  const weatherStatus = useSelector((state) => state.weather.status);
  console.log("Updated Weather State:", weather); //Debbug

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white drop-shadow-md mb-6">
        Weather App
      </h1>

      {/* Main Layout Container */}
      <div className="w-full max-w-4xl bg-white/80 p-6 rounded-lg shadow-lg">
        {/* First Two Sections (Search Box & Weather Data) in a row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-1/2">
            <WeatherForm /> {/* Search Box */}
            <WeatherDisplay /> {/* Weather Data */}
          </div>

          {/* Third Section (5-Day Forecast) Parallelly */}
          <div className="w-full md:w-1/2">
            <ForecastDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
