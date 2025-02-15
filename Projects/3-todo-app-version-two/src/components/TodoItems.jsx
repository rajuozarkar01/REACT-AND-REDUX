import TodoItem from "./TodoItem";

// TodoItems.jsx (Intermediate Component)
// Accepts todoItems as props./

const TodoItems = ({ todoItems }) => {
  return (
    <>
{/* Maps through the todoItems array. */}
      {todoItems.map((item) => (
        <TodoItem
          key={item.dueDate + item.name}
// For each item, creates a TodoItem component and passes data (props).
          todoDate={item.dueDate}
          todoName={item.name}
        ></TodoItem>
      ))}
    </>
  );
};
export default TodoItems;
