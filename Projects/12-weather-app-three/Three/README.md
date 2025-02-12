UI Improvements : To achieve a weather-themed design

1. Add animated icons (react-icons or lottie-react).
2. Change the background dynamically based on weather conditions.

1.   Changes in **WeatherDisplay.jsx**
Import react-icons for weather conditions.
Apply a dynamic background image.
Add Lottie animations

2. Changes in **WeatherForm.jsx**
To match the new design:
Add a modern input and button style.
Use Tailwind's glassmorphism effects.

3. Changes in **App.jsx**
Make sure to set a default full-page background in case no weather data is available.

4. UI changes in **WeatherApp.jsx** while keeping the geolocation feature intact:
1. Dynamic Background Based on Weather Conditions
Move the background styling logic from **WeatherDisplay.jsx** to **WeatherApp.jsx**.
This ensures that the whole page changes based on weather conditions.

2. Better Centering & Styling
Use bg-cover bg-center to make the background responsive.
Keep a default gradient if no weather data is available.



✔ Background updates dynamically based on the weather.
✔ Default gradient background if no weather data is available.
✔ Added smooth transitions (transition-all duration-500) for better UI feel.
✔ Used backdrop-blur-md to give a glassmorphism effect to the UI box.


 Used **Weather API's Built-in Icons**
Many weather APIs provide icons as URLs. Instead of Lottie or React Icons, you can directly use the API’s provided icon.

 **Key Fixes in the Code**
✅ Prevents crashes if weather.weather is missing or empty.
✅ Handles errors and displays an error message instead of crashing.
✅ Ensures smooth background updates without errors.