import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let foodItems = [

  ];

  return (
    <>
      <h1>Healthy Food</h1>
      <ErrorMessage items = {foodItems}></ErrorMessage>
      <FoodItems items = {foodItems}></FoodItems>
    </>
  );
}

export default App;
