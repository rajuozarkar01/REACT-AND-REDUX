import StateName from "./components/StateName";
import AddStateCapital from "./components/AddStateCapital";
import StateCapitals from "./components/stateCapitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const initialStateCapitals = [
    {
      state: "Maharashtra",
      capital: "Mumbai",
    },
    {
      state: "Rajastan",
      capital: "Jaipur",
    },
    {
      state: "Madhyapradesh",
      capital: "Bhopoal",
    },
  ];
  const [stateCapitals, setStateCapitals] = useState(initialStateCapitals);

  const handleNewItem = (stateName, stateCapital) => {
    console.log(`New state Added:${stateName} capital:${stateCapital} `);
    //spread operator
    const newStateCapitls = [
      ...stateCapitals,
      { state: stateName, capital: stateCapital },
    ];
    setStateCapitals(newStateCapitls);
  };
  return (
    <>
      <StateName />
      <AddStateCapital onNewItem={handleNewItem} />
      <StateCapitals stateCapitals={stateCapitals}></StateCapitals>
    </>
  );
}

export default App;
