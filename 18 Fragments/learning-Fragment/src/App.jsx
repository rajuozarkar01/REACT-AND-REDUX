import Container from "./components/Container";
import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let foodItems = ["Green Vegetables", "Milk", "Fruits And Nuts", "Roti","Rice", "Wine","Samosa"];

  return (
  <>
    <Container>
    <Container><h1 className="dynamic">Healthy Food</h1></Container>
    <ErrorMessage items = {foodItems}></ErrorMessage>
    <FoodItems items = {foodItems}></FoodItems>
    </Container>
    <Container><p>"Good food, good mood, good for you." "Eating well is a form of self-respect." "Nourishing my body and soul." "Healthy choices, happy vibes." </p></Container>
  </>
  );
}

export default App;
