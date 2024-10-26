import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState();

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };
  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = (event) => {
    // console.log(event);
    event.preventDefault(); //don't send by default to server after submit I will handler the value will submit to local method
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
    //time stamp 6:56:56 need to understand
  };

  return (
    <div className="container items-container">
      <form className="row rj-row" onSubmit={handleAddButtonClicked}>
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo Here"
            value={todoName}
            onChange={handleNameChange}
          />
        </div>
        <div className="col-4">
          <input type="date" value={dueDate} onChange={handleDateChange} />
        </div>
        <div className="col-2">
          <button
            // type="button"  by default 'submit' type
            className="btn btn-success rj-button"
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
