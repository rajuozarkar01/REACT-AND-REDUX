// import BankAccount from "./BankAccount";
import Hello from "./Hello";
import Random from "./Random";
import RjButton from "./RjButton";
import KeyValuePairsDisplay from "./KeyValuePairsDisplay";
import StudentMarks from "./StudentMarks";
import AnonymousFunction from "./anonymousFunction";
import Mobile from "./Mobile";

import "./App.css";

function App() {
  const sum = ["hi",89 ,"parameter"]

  return (
    <>
      <h1 id="my-id">Identifying Components</h1>
      <Hello></Hello>
      <Random></Random>
      <Random></Random>
      <Random></Random>
      <Random></Random>
      <RjButton></RjButton>
      <KeyValuePairsDisplay></KeyValuePairsDisplay>
      <StudentMarks></StudentMarks>
      <Mobile></Mobile>
      <AnonymousFunction str = {sum}></AnonymousFunction>
      {/* <BankAccount></BankAccount> */}
    </>
  );
}

export default App;
