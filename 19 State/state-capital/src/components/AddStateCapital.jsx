import { useState } from "react";

function AddStateCapital({ onNewItem }) {
  const [stateName, setState] = useState();
  const [stateCapital, setCapital] = useState();

  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleCapitalChange = (event) => {
    setCapital(event.target.value);
  };

  const handleAddButtonClicked = () => {
    onNewItem(stateName, stateCapital);
    setCapital("");
    setState("");
  };

  return (
    <>
      <div className="container state-container">
        <div className="row rj-row">
          <div className="col-4 ">
            <input
              type="text"
              placeholder="Enter State here"
              value={stateName}
              onChange={handleStateChange}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Enter Capital here"
              value={stateCapital}
              onChange={handleCapitalChange}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-success rj-button"
              onClick={handleAddButtonClicked}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStateCapital;
