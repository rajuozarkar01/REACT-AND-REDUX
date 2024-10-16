import { useState } from "react";

export default function Checkbox() {
  const [bat, setLiked] = useState(true);

  function handleChange(event) {
    setLiked(event.target.checked);
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={bat} onChange={handleChange} />
        Raju liked React
      </label>
      <p>Master Raju {bat ? "liked" : "did not like"} React</p>
    </div>
  );
}
