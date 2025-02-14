function TodoItem3(){
  let todoName = "Start a Bussines";
  let todoDate = "15/02/2025";
  return(
    <div className="container">
      <div className="row rj-row">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button type="button" className="btn btn-danger rj-button">Delete</button> 
        </div>
      </div>
    </div>
  )
}

export default TodoItem3;