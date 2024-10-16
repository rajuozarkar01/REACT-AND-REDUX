import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
// import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";

function App() {
  const initialTodoItems = [];
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const handleNewItem = (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDueDate },
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = (todoItemName) => {
    //filter method def. util true/truthy val return item stays if falsy/false val item goes out of arr.(delete)
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    // !==, because == Item to be Deleted
    setTodoItems(newTodoItems);
    console.log(`Item Deleted:${todoItemName}`);
  };
  return (
    <>
      <div className="app-main">
        <div className="app-heading">
          <AppName />
        </div>
        <div className="app-container">
          <AddTodo onNewItem={handleNewItem} />
          {todoItems.length === 0 && <WelcomeMessage />}
          {/* it todoItems empy show welcome message */}
          <div className="items-container">
            <TodoItems
              todoItems={todoItems}
              onDeleteClick={handleDeleteItem}
            ></TodoItems>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
