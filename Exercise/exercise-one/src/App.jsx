import Hello from "./Hello";
import Random from "./Random";
import RjButton from "./RjButton";
import KeyValuePairsDisplay from "./KeyValuePairsDisplay";
import Mobile from "./Mobile";
import FavoritColor from "./FavoritColor";
import AnonymousFunction from "./AnonymousFunction";
import "./App.css";
import CaruseState from "./CaruseState";

function App() {
  const sum = ["hi", 89, "parameter"];

  return (
    <>
      <h1 id="my-id">Identifying Components</h1>
      <Hello></Hello>
      <Random></Random>
      <Random></Random>
      <Random></Random>
      <Random></Random>
      <RjButton></RjButton>
      <KeyValuePairsDisplay></KeyValuePairsDisplay>
      <Mobile></Mobile>
      <AnonymousFunction str={sum}></AnonymousFunction>
      <FavoritColor></FavoritColor>
      <CaruseState></CaruseState>
    </>
  );
}

export default App;
