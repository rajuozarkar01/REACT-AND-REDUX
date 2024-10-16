import Item from "../../../../18 Fragments/learning-Fragment/src/components/Item";

function StateCapital({ stateName, stateCapital }) {
  return (
    <>
      <div className="container ">
        <div className="row rj-row ">
          <div className="col-4" >{stateName}</div>
          <div  className="col-4" >{stateCapital}</div>
          <div className="col-2">
            <button type="button" className="btn btn-danger rj-button ">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default StateCapital;
