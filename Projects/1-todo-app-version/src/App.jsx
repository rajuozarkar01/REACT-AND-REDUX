import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItem1 from "./components/TodoItem1";
import TodoItem2 from "./components/TodoItem2";
import TodoItem3 from "./components/TodoItem3";
import "./App.css";
function App() {
  return (
    <center className="todo-container shadow">
      <AppName />
      <div className="items-container">
        <AddTodo />
        <TodoItem1 />
        <TodoItem2 />
        <TodoItem3 />
      </div>
    </center>
  );
}

export default App;
