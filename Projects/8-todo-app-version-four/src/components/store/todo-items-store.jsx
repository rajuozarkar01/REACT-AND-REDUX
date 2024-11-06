import { createContext } from "react";


export const TodoItemsContext = createContext({
  todoItems: [],
  //as property: b'cuz totoItems is array
  addNewItem: () => {},
  //as property: b'cuz addNewItem is method
  deleteItem: () => {},
  //as property: b'cuz deleteItem is method
});
