import { useEffect, useState } from "react";

let CurrentTime = () => {
  const [time, setTime] = useState(new Date());
  // console.log("Current time printed"); :Debbuge

  // 13:03 YT,  stock's live price can be rendered
  
  useEffect(() => {
    // console.log("Inerval has been setup!")  :Debbuge
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000)

    return () =>{
      clearInterval(intervalId);
      // console.log("Cancelled the interval") :Debbuge
    }

  }, [])  
  return (
    <p className="lead">
      This is the current time: {time.toLocaleDateString()} -{" "}
      {time.toLocaleTimeString()}{" "}
    </p>
  );
};

export default CurrentTime;
