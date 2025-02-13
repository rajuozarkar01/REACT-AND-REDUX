import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCoords } from "./redux/weather/weatherAPI";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

const weatherBackgrounds = {
  Clear: "url('/assets/sunny.jpg')",
  Clouds: "url('/assets/cloudy.jpg')",
  Rain: "url('/assets/rainy.jpg')",
  Snow: "url('/assets/snowy.jpg')",
  Thunderstorm: "url('/assets/thunderstorm.jpg')",
  Default: "linear-gradient(to right, #38bdf8, #3b82f6)", // Fallback gradient
};

const WeatherApp = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error); // Get error state
  const [background, setBackground] = useState(weatherBackgrounds.Default);

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

  // ✅ Safely update background when weather data changes
  useEffect(() => {
    if (
      weather &&
      weather.weather &&
      Array.isArray(weather.weather) &&
      weather.weather.length > 0
    ) {
      const condition = weather.weather[0]?.main;
      setBackground(
        weatherBackgrounds[condition] || weatherBackgrounds.Default
      );
    } else {
      setBackground(weatherBackgrounds.Default); // Reset to default if no valid data
    }
  }, [weather]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-500"
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-white drop-shadow-md mb-6">
        Weather App
      </h1>
      <div className="w-full max-w-md bg-white/80 p-6 rounded-lg shadow-lg backdrop-blur-md">
        <WeatherForm />
        {error ? (
          <p className="text-red-500 text-center font-semibold">❌ {error}</p>
        ) : (
          <WeatherDisplay />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
