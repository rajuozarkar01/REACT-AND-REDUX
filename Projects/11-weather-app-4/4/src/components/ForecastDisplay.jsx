import React from "react";
import { useSelector } from "react-redux";

const ForecastDisplay = () => {
  const forecast = useSelector((state) => state.weather.forecast);

  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return <p className="text-center text-gray-500">No forecast data available.</p>;
  }
  // Return 6-Day forecase
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-center tracking-tight pb-4 ...">5-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-4">
        {forecast.list.slice(0, 6).map((day, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded-lg shadow">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.weather[0].description}</p>
            <p>{day.main.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
