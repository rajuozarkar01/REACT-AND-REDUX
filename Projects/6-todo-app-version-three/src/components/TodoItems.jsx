import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick }) => {
  return (
    <>
      {todoItems.map((item) => (
        <TodoItem
          key={item.dueDate + item.name}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick = {onDeleteClick}
        ></TodoItem>
      ))}
    </>
  );
};
export default TodoItems;
