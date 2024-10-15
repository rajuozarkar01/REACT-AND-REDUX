import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick }) => {
  return (
    <>
      {todoItems.map((item) => (
        <TodoItem
          key={item.dueDate + item.name}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
          //App(), parent to TodoItems to child TodoItem it is not my functionality it's my child's.
        ></TodoItem>
      ))}
    </>
  );
};
export default TodoItems;
