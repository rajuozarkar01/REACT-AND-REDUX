import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import { TodoItemsContext } from "./components/store/todo-items-store";
import "./App.css";
function App() {
  const [todoItems, setTodoItems] = useState([]);

  //handleNewItem instead addNewItem:: it add's new Item
  const addNewItem = (itemName, itemDueDate) => {
    setTodoItems((currValue) => {
      const newTodoItems = [
        ...currValue,
        { name: itemName, dueDate: itemDueDate },
      ];
      return newTodoItems;
    });
  };

  //handleDeleteItme instead deleteItem: it deletes Item
  const deleteItem = (todoItemName) => {
    //filter method def. util true/truthy val return item stays if falsy/false val item goes out of arr.(delete)
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    // !==, because == Item to be Deleted
    setTodoItems(newTodoItems);
    console.log(`Item Deleted:${todoItemName}`);
  };
  return (
    // array, object any can be passed as 'value'
    <TodoItemsContext.Provider
      // value={{
      //   todoItems: todoItems,
      //   addNewItem: addNewItem,
      //   deleteItem: deleteItem,
      // }}
      //key and  value is same then use only one
      value={{
        todoItems,
        addNewItem,
        deleteItem,
      }}
    >
      <div className="app-main">
        <AppName />
        <AddTodo />
        <WelcomeMessage></WelcomeMessage>
        <TodoItems></TodoItems>
      </div>
    </TodoItemsContext.Provider>
  );
}

export default App;

//In This version it provide all three values in Context.Provider in effect previously passed props elemenited and all the component gained their value's from Context.provider
