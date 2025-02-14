function TodoItem1() {
  let todoName = "Buy Milk";
  let todoDate = "3/9/2024";
  return (
    <div className="container ">
      <div class="row rj-row">
        <div class="col-6">{todoName}</div>
        <div class="col-4">{todoDate}</div>
        <div class="col-2">
          <button type="button" class="btn btn-danger rj-button ">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem1;
