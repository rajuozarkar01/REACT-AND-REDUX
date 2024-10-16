import { useState } from "react";

function RjButton() {
  const [text, setText] = useState("hello Raju !");

  function handleChange(e) {
    setText(e.target.value);
  }
  // understanding the useState throu RjButton()
  return (
    <>
      <input value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
      <button onClick={() => setText("Hello Master Raju!")}>Reset</button>
    </>
  );
}

export default RjButton;
