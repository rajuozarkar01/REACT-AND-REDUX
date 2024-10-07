import { useState } from "react"

function FavoritColor(){
  const[color, setColor] = useState("red");
  return<>
  <h1>My favorite color is: {color}</h1>
  <button onClick={()=>setColor("Blue")}>Change color</button>
 
  </>

}
export default FavoritColor