import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherByCoords } from "./redux/weather/weatherAPI";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

const WeatherApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeatherByCoords({ latitude, longitude }));
        },
        () => console.error("Location access denied")
      );
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <WeatherForm />
        <WeatherDisplay />
      </div>
    </div>
  );
};

export default WeatherApp;
