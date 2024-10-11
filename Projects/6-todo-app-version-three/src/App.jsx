import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const todoItems = [
    {
      name: "Buy milk",
      dueDate: "3/9/2024",
    },
    {
      name: "Go to College",
      dueDate: "3/9/2024",
    },
    {
      name: "Complete state Project",
      dueDate: "3/9/2024",
    },
  ];
  const [] = useState(todoItems);
  return (
    <>
      <div className="app-main">
        <div className="app-heading">
          <AppName />
        </div>
        <div className="app-container">
          <AddTodo />
          <div className="items-container">
            <TodoItems todoItems={todoItems}></TodoItems>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
