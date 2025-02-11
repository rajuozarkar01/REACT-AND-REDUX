# Weather App

# *Data Flow in the Weather App*

1. *User Input or Geolocation Data → Fetch API → State Update → UI Render*
   - The app takes user input (city name) or geolocation (latitude & longitude).
   - It sends a request to the weather API using the `fetch` function.
   - Once data is received, it updates the `weather` state.
   - React re-renders the UI with the latest weather data.

---

# *Logic Flow (Step by Step Explanation)*

# *1. Setting Up State Variables (`useState`)*

- `city`: Stores the city name entered by the user.
- `weather`: Stores the weather data fetched from the API.
- `error`: Stores error messages if API calls fail.

---

# *2. Fetching Weather Data by City Name (`fetchWeather`)*

- The function `fetchWeather(city)` is called when the user clicks the "Get Weather" button.
- It constructs a request URL:
  ```js
  `${baseUrl}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  ```
- Sends the request using `fetch()`.
- Converts the response to JSON and updates `weather` state.
- Clears errors if the API call is successful.
- If an error occurs, it updates the `error` state.

---

# *3. Fetching Weather by User’s Location (`fetchWeatherByCoords`)*

- When the page loads, the app tries to get the user's current location using `navigator.geolocation.getCurrentPosition()`.
- If successful, it extracts latitude and longitude and calls `fetchWeatherByCoords(latitude, longitude)`.
- This function constructs a request URL similar to `fetchWeather`, but with coordinates:
  ```js
  `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  ```
- Fetches weather data and updates the `weather` state.
- If geolocation access is denied, it sets an error message.

---

# *4. User Interface Rendering*

- The app displays an input field for the user to enter a city name.
- The "Get Weather" button triggers `fetchWeather(city)`.
- If `weather` contains data, it displays:
  - City name
  - Weather description
  - Temperature
  - Humidity
  - Wind speed
- If an error occurs, it is displayed in red.

---

# *Flow Summary*

1. On page load, try fetching weather by geolocation.
2. If geolocation fails, show an error message.
3. User enters a city name and clicks "Get Weather".
4. App fetches weather data and updates state.
5. UI re-renders with new weather information.

This logic ensures the app works with both geolocation and manual city input! 🚀
