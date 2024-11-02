import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";

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
    console.log(`New Item Added: ${itemName} Date: ${itemDueDate}`);
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDueDate },
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = (todoItemName) => {
    //filter creates new array without chainging existing here: setTodoItems() supposed not to change
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    //onClicked delet button. name will be deleted
    //!= these item will be in array and will not be deleted
    //newTodoItems array will be created
    setTodoItems(newTodoItems);
    console.log(`Item Deleted: ${todoItemName}`);
  };
  return (
    <>
      <div className="app-main">
        <div className="app-heading">
          <AppName />
        </div>
        <div className="app-container">
          <AddTodo onNewItem={handleNewItem} />
          {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
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
