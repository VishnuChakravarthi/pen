import React from "react";

function FillIn({ item, index, changeVal, showSubmit = true }) {
  return (
    <form>
      <div className="">
        <div className="form-group col-sm-6">
          <label for="exampleInputEmail1">Enter question</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter question"
          />
        </div>
        <div className="form-group col-sm-6">
          <label for="exampleInputEmail1">Enter Answer</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter answer"
          />
        </div>

        {showSubmit && (
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default FillIn;
