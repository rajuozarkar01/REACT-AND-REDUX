import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);
  // count is your stateful value.

  //Event handlers
  const handleIncrease = () => setCount((prevCount) => prevCount + 1);
  // prevCount ensures you're working with the latest state, which is important when updates are asynchronous.

  const handleDecrease = () => setCount((prevCount) => prevCount - 1);  // counter below zero

  // const handleDecrease = () =>
  //   setCount((prevCount) => Math.max(prevCount - 1, 0));
  // counter should not to go below zero

  const handleReset = () => setCount(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") handleIncrease();
      if (event.key === "ArrowDown") handleDecrease();
      if (event.key === "Escape") handleReset();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <h1>Counter App</h1>
      <h2>{count}</h2>
      {/* {count} inside the JSX braces dynamically renders the current count value */}

      <button onClick={handleIncrease} className="button">
        Increase
      </button>
      <button onClick={handleDecrease} className="button">
        Decrease
      </button>
      <button onClick={handleReset} className="button">
        Reset
      </button>
    </div>
  );
}

export default Counter;
