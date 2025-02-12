import React from "react";
import WeatherApp from "./WeatherApp"; // Ensure this path is correct

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <WeatherApp />
    </div>
  );
};

export default App; // Make sure you're exporting it
