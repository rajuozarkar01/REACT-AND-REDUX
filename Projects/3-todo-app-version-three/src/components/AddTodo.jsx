function AddTodo() {
  return (
    <div className="container items-container">
      <div className="row rj-row">
        <div className="col-6">
          <input type="text" placeholder="Enter Todo Here" />
        </div>
        <div className="col-4">
          <input type="date" />
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-success rj-button">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddTodo;
