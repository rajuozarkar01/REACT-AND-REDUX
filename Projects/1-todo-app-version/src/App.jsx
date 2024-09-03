import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItem1 from "./components/TodoItem2";
import TodoItem2 from "./components/TodoItem2";
function App() {
  return (
    <center class="todo-container">
      <AppName/>
      <AddTodo/>
      <TodoItem1/>
      <TodoItem2 />

    </center>
  );
}

export default App;
