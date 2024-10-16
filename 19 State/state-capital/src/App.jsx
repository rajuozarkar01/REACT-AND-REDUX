import StateName from "./components/StateName";
import AddStateCapital from "./components/AddStateCapital";
import StateCapitals from "./components/stateCapitals";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState } from "react";

function App() {
  const initialStateCapitals = [];
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

  const handleDeleteItem = (stateCapitalName) => {
    //filter method def. util true/truthy val return item stays if falsy/false val item goes out of arr.(delete)
    const newStateCapitls = stateCapitals.filter(
      (item) => item.state !== stateCapitalName
    );
    // !==, because == Item to be Deleted
    setStateCapitals(newStateCapitls);
    console.log(`Item Deleted:${stateCapitalName}`);

    return (
      <>
        <StateName />
        <AddStateCapital onNewItem={handleNewItem} />
        {stateCapitals.length === 0 && <WelcomeMessage />}
        {/* it todoItems empy show welcome message */}
        <StateCapitals
          stateCapitals={stateCapitals}
          onDeleteClick={handleDeleteItem}
        ></StateCapitals>
      </>
    );
  };
}
export default App;
