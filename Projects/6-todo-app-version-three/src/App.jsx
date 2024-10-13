import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const initialTodoItems = [
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
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const handleNewItem = (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
  };
  return (
    <>
      <div className="app-main">
        <div className="app-heading">
          <AppName />
        </div>
        <div className="app-container">
          <AddTodo onNewItem = {handleNewItem} />
          <div className="items-container">
            <TodoItems todoItems={todoItems}></TodoItems>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
