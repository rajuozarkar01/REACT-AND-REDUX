import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import { TodoItemsCnotext } from "./components/store/todo-items-store";
import "./App.css";
function App() {
  const [todoItems, setTodoItems] = useState([]);
  const handleNewItem = (itemName, itemDueDate) => {
    //   const newTodoItems = [
    //     ...currValue,
    //     {name: itemName, dueDate: itemDueDate},
    //   ];
    //   return newTodoItems;
    // });
    // Compact version is below

    //currValue means 'todoItems' with annonymous meth. to setT
    setTodoItems((currValue) => {
      const newTodoItems = [
        ...currValue,
        { name: itemName, dueDate: itemDueDate },
      ];
      return newTodoItems;
    });
  };

  const handleDeleteItem = (todoItemName) => {
    //filter method def. util true/truthy val return item stays if falsy/false val item goes out of arr.(delete)
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    // !==, because == Item to be Deleted
    setTodoItems(newTodoItems);
    console.log(`Item Deleted:${todoItemName}`);
  };
  return (
    <TodoItemsContext.Provider>
      <div className="app-main">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        {/* it todoItems empy show welcome message */}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
        ></TodoItems>
      </div>
    </TodoItemsContext.Provider>
  );
}

export default App;
