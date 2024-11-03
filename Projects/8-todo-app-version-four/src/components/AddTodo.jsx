import { useState, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "./AddTodo.module.css"
import { useContext } from "react";
import { TodoItemsContext } from "./store/todo-items-store";
// function AddTodo({onNewItem}) {
//because obj {onNewItem} is now addNewItem
//it's from Context.Provider Value. addNewItem
//addNewItem will call everythen onNewItem used
function AddTodo({}) {
  const { addNewItem } = useContext(TodoItemsContext);
  const todoNameElement = useRef();
  const dueDateElement = useRef();

  const handleAddButtonClicked = (event) => {
    // console.log(event);
    event.preventDefault(); //don't send by default to server after submit I will handler the value will submit to local method
    const todoName = todoNameElement.current.value;
    const dueDate = dueDateElement.current.value;
    todoNameElement.current.value = "";
    dueDateElement.current.value = "";

    // onNewItem(todoName, dueDate);
    //because obj {onNewItem} is now addNewItem
    //addNewItem will call everythen onNewItem used
    addNewItem(todoName, dueDate);

    //time stamp 6:56:56 need to understand
  };

  return (
    <div className="container items-container ">
      <form className="row rj-row " onSubmit={handleAddButtonClicked}>
        <div className="col-6">
          <input
            type="text"
            ref={todoNameElement}
            placeholder="Enter Todo Here"
          />
        </div>
        <div className="col-4">
          <input type="date" ref={dueDateElement} />
        </div>
        <div className="col-2">
          <button
            // type="button"  by default 'submit' type
            className="btn btn-success rj-button "
            //onSubmit={handleAddButtonClicked}  on submit handler no need to press button by default do.
            // onClick={handleAddButtonClicked}
            type="submit" // by default... will call onSubmit handler
          >
            <IoMdAdd />
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTodo;
