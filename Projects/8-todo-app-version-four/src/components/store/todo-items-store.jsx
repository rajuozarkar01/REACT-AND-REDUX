import { createContext } from "react";
import { useReducer } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],
  //as property: b'cuz totoItems is array
  addNewItem: () => {},
  //as property: b'cuz addNewItem is method
  deleteItem: () => {},
  //as property: b'cuz deleteItem is method
});

//reducer method it will take action obj n retur state(todoItems)
//reducer method/function  must be pure function
const todoItemsReducer = (currTodoItems, action) => {
  let newTodoItems = currTodoItems;
  if (action.type === "NEW_ITEM") {
    newTodoItems = [
      ...currTodoItems,
      { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
    ];
  } else if (action.type === "DELETE_ITEM") {
    newTodoItems = currTodoItems.filter(
      (item) => item.name !== action.payload.itemName
    );
    // setTodoItems(newTodoItems); useState method nomoer
  }
  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  // const [todoItems, setTodoItems] = useState([]);
  //useReducer intrudueced:04-11 :16:51:00, vdieo:9:19
  //gives 1 new todoItems 2. how to dispatch
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  //addNewItem:: it add's new Item
  const addNewItem = (itemName, itemDueDate) => {
    const newItemAction = {
      type: "NEW_ITEM",
      payload: {
        itemName,
        itemDueDate,
      },
    };
    dispatchTodoItems(newItemAction);
    // setTodoItems((todoItems) => {
    // const newTodoItems = [
    //   ...currTodoItems,
    //   { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
    // ];
    // setTodoItems(newTodoItems);
    // });
  };

  const deleteItem = (todoItemName) => {
    //filter method def. until true/truthy val return item stays if falsy/false val item goes out of arr.(delete)

    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        itemName: todoItemName,
      },
    };
    dispatchTodoItems(deleteItemAction);
  };
  return (
    <TodoItemsContext.Provider
      //key and  value is same then use only one
      value={{
        todoItems,
        addNewItem,
        deleteItem,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
