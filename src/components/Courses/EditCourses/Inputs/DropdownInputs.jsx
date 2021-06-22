import React from "react";

const ClassicInputs = ({ handleInputs, value, name, label, options }) => {
  return (
    <React.Fragment>
      <div className="form-group row">
        <label className="col-sm-2  col-form-label" htmlFor={name}>
          {label}
        </label>
        <div className="col-sm-10">
          <div className="form-group">
            <select
              className="form-control"
              name={name}
              onChange={(e) => handleInputs(e)}
              defaultValue={value}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClassicInputs;
