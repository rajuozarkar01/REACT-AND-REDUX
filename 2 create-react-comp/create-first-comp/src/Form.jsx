import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("Master Raju !");
  const [age, setAge] = useState(42);

  // The difference between passing an updater and passing the next state directly

  function increment() {
    // Passing the updater function
    setAge((age) => age + 1);

    //Passing the next state directly
    // setAge(age + 1);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button
        onClick={() => {
          //without updater function passing it will =(+1)
          increment();
          increment();
          increment();
        }}
      >
        Increment age(+3)
      </button>
      <p>
        Hello, {name}. You are {age}
      </p>
    </div>
  );
}
