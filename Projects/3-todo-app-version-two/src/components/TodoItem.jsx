// TodoItem.jsx (Single To-Do Item)
// Receives props (todoName and todoDate).
// Displays the received data.

function TodoItem({ todoName, todoDate }) {
  return (
    <div className="container ">
      <div className="row rj-row">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button type="button" className="btn btn-danger rj-button ">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
