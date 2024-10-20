import RjButton from "./RjButton";
import Hello from "./Hello";
import Random from "./Random";
import Checkbox from "./Checkbox";
import Form from "./Form";
import FormObject from "./FormObject";
import TextField from "./TextField";
import FormNestedObject from "./FormNestedObject";

function App() {
  return (
    <div>
      <h1>This is the debue to react</h1>
      <Hello />
      <Random></Random>
      <Random></Random>
      {/* <Random></Random>
      <Random></Random>
      <Random></Random> */}
      <RjButton></RjButton>
      <Checkbox></Checkbox>
      <Form></Form>
      <FormObject></FormObject>
      <TextField></TextField>
      <FormNestedObject></FormNestedObject>
    </div>
  );
}
export default App;
