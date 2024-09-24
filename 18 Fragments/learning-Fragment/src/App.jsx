import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "./components/Container";
import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import FoodInput from "./components/FoodInput";
import { useState } from "react";

function App() {
  // let foodItems = [
  //   "Green Vegetables",
  //   "Milk",
  //   "Fruits And Nuts",
  //   "Roti",
  //   "Rice",
  //   "Wine",
  //   "Samosa",
  // ];

  // let textStateArr = useState("Food Item Entered by user");
  // let textToShow = textStateArr[0];
  // let setTextState = textStateArr[1];

  let [foodItems, setFoodItems] = useState([]);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      let newFoodItem = event.target.value;
      event.target.value = "";
      let newItems = [...foodItems, newFoodItem];
      setFoodItems(newItems);
      console.log("Food value enterd is " + newFoodItem);
    }
  };

  return (
    <>
      <Container>
        <h1 className="app-heading">Healthy Food</h1>
        <FoodInput handleKeyDown={onKeyDown}></FoodInput>
        <ErrorMessage items={foodItems}></ErrorMessage>
        {/* <p>{textToShow}</p> */}
        <FoodItems items={foodItems}></FoodItems>
      </Container>
      {/* <Container><p>"Good food, good mood, good for you." "Eating well is a form of self-respect." "Nourishing my body and soul." "Healthy choices, happy vibes." </p></Container> */}
    </>
  );
}

export default App;
