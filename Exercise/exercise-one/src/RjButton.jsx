import { useState } from "react";


function RjButton(){
  let [count, setCount] = useState(14);
  return<button onClick={()=>setCount((count)=>count+14)}>
    Table of 12 = {count}
  </button>
}
export default RjButton;  