import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let foodItem = ["Pulses", "Leafy Veggitable", "Milk", "Roti", "Salad"];
  return (
    <>
      <h1>Healthy Food</h1>
      <ul class="list-group">
        {foodItem.map((item) => (
          <li class="list-group-item">{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
