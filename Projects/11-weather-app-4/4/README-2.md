Weather App is well-structured with Redux for state management and modularized files. Let's break down each module, the logic it holds, and how data flows between them.

---

## **1️⃣ Redux (`src/redux/`)**

This folder handles state management using Redux.

### **📄 store.js**

- Creates the Redux store.
- Combines reducers (right now, it includes the `weatherSlice`).
- Wraps the app with `Provider` in `main.jsx`.

### **📁 weather/** _(Handles weather-related state and API requests)_

#### **📄 weatherSlice.js**

- Defines Redux state for weather data.
- Contains actions (e.g., `setWeather`, `setForecast`).
- Reducers update the weather state based on dispatched actions.
- Example state:

  ```js
  const initialState = {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  };
  ```

- **Methods/Actions:**
  - `setWeather(data)` → Updates current weather state.
  - `setForecast(data)` → Updates forecast data.
  - `setLoading(true/false)` → Controls loading state.
  - `setError(message)` → Stores error messages.

---

#### **📄 weatherAPI.js**

- Handles API calls separately.
- Fetches weather data from an API.
- Returns JSON data to be stored in Redux.

- **Methods:**
  ```js
  export const fetchWeather = async (city) => { ... }
  export const fetchForecast = async (city) => { ... }
  ```
  - `fetchWeather(city)` → Fetches current weather for a city.
  - `fetchForecast(city)` → Fetches 5-day forecast for the city.

**📌 Execution Flow:**

1. `WeatherForm.jsx` dispatches an action to fetch weather data.
2. `weatherAPI.js` makes an API call and returns data.
3. `weatherSlice.js` updates Redux state.
4. `WeatherDisplay.jsx` and `ForecastDisplay.jsx` read the updated state and display data.

---

## **2️⃣ Components (`src/components/`)**

### **📄 WeatherForm.jsx** _(Handles city input and search)_

- Renders an input field and a search button.
- Captures user input (city name).
- Dispatches Redux actions to fetch weather.

**📌 Execution Flow:**

1. User enters a city name and submits the form.
2. Calls `fetchWeather(city)` and `fetchForecast(city)`.
3. Dispatches actions like `setWeather(data)`.
4. Redux updates state, and UI components re-render.

---

### **📄 WeatherDisplay.jsx** _(Displays fetched weather data)_

- Connects to Redux and reads `currentWeather` from state.
- Displays temperature, humidity, etc.
- Shows an error message if fetching fails.

**📌 Execution Flow:**

1. Subscribes to Redux `currentWeather` state.
2. If weather data exists, displays it.
3. If `error` exists, shows an error message.

---

### **📄 ForecastDisplay.jsx** _(Shows 5-day forecast)_

- Reads `forecast` data from Redux.
- Maps through forecast data and displays it.

**📌 Execution Flow:**

1. Reads forecast data from Redux.
2. Displays temperature trends for the next 5 days.

---

## **3️⃣ Main Components**

### **📄 WeatherApp.jsx** _(Connects components & Redux)_

- Acts as the container for all components.
- Connects `WeatherForm`, `WeatherDisplay`, and `ForecastDisplay`.

**📌 Execution Flow:**

1. Contains the main layout.
2. Displays `WeatherForm` for input.
3. Shows `WeatherDisplay` and `ForecastDisplay` based on Redux state.

---

### **📄 App.jsx & main.jsx**

- **`App.jsx`** → Wraps `WeatherApp` with styling/themes.
- **`main.jsx`** → Wraps everything in Redux `<Provider store={store}>`.

---

## **🛠 Summary of Execution Flow**

1. **User enters a city** in `WeatherForm.jsx` and submits.
2. `fetchWeather(city)` & `fetchForecast(city)` **fetch data** in `weatherAPI.js`.
3. Data is **stored in Redux** (`weatherSlice.js`).
4. `WeatherDisplay.jsx` & `ForecastDisplay.jsx` **read the updated state** and show results.
5. `WeatherApp.jsx` **orchestrates everything**, displaying UI components.

This modular structure ensures clean separation of concerns and reusability.
