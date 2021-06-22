import React from "react";

const ClassicInputs = ({ handleInputs, value, name, label }) => {
  return (
    <React.Fragment>
      <div className="form-group row">
        <label className="col-sm-2  col-form-label" htmlFor={name}>
          {label}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name={name}
            value={value === null ? "" : value}
            onChange={(e) => handleInputs(e)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClassicInputs;
