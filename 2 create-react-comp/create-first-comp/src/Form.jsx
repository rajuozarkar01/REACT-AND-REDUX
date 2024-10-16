import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("Unknown");
  const [age, setAge] = useState(42);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button onClick={() => setAge(age + 1)}>Increment age</button>
      <p>
        Hello, {name}. You are {age}
      </p>
    </div>
  );
}
