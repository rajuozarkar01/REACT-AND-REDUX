import { useContext } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { TodoItemsContext } from "./store/todo-items-store";

// function TodoItem({ todoName, todoDate, onDeleteClick }) { now don't expet onDeleteClick
function TodoItem({ todoName, todoDate }) {
  // deleteItem = useContext(TodoItemsContext)
  //deleteItem from useContext(TodoItemsContext) after de structure
  const { deleteItem } = useContext(TodoItemsContext);

  return (
    <div className="container ">
      <div className="row rj-row">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger rj-button"
            // onClick={() => onDeleteClick(todoName)}
            // instead onDeleteClick we use deleteItem
            onClick={() => deleteItem(todoName)}

            // this is actual event handler not a component
          >
            <TbHttpDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
