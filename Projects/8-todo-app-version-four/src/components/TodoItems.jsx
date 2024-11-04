import TodoItem from "./TodoItem";
import { TodoItemsContext } from "./store/todo-items-store";
import { useContext } from "react";

const TodoItems = () => {
  // const {contextObj} = useContext(TodoItemsContext);
  // const todoItems = contextObj.todoItems;
  //above code using object destructuring
  const { todoItems} = useContext(TodoItemsContext);

  return (
    <>
      {todoItems.map((item) => (
        <TodoItem
          key={item.dueDate + item.name}
          todoDate={item.dueDate}
          todoName={item.name}
          // onDeleteClick={onDeleteClick}
          //App(), parent to TodoItems to child TodoItem it is not my functionality it's my child's.

          //now deleteItem from Context.provider
          
        ></TodoItem>
      ))}
    </>
  );
};
export default TodoItems;
