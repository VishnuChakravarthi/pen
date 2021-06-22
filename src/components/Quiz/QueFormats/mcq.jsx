import React, { useState } from "react";
import { Button } from "reactstrap";

function Mcq({ Item, index, changeVal, showSubmit = true }) {
  const OptionsDiv = (length) => {
    // eslint-disable-next-line no-unused-vars
    let name = 0;
    return (
      <div className="form-group col-sm-6 d-flex align-items-end pl-0">
        <div className="col-sm-10">
          <label htmlFor="exampleInputPassword1">Add Options</label>
          <input
            type="text"
            className="form-control"
            name={`options_${length}`}
            placeholder="Enter options"
          />
        </div>
        <div className="col-sm-2">
          <span>
            <Button
              className="mr-1"
              color="secondary"
              id={`Tooltip-1`}
              onClick={() => {
                const divs = options.options;

                divs.push(OptionsDiv(divs.length));

                setOptions({
                  options: divs,
                });

                name = options.options.length;
              }}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </span>
        </div>
        <div className="col-sm-2">
          <span>
            <Button
              className="mr-1"
              color="secondary"
              id={`Tooltip-1`}
              onClick={() => {
                const divs = options.options;

                if (divs.length !== 1 && divs.length !== 0) {
                  divs.pop(OptionsDiv(divs.length));
                  setOptions({
                    options: divs,
                  });

                  name = options.options.length;
                }
              }}
            >
              <i className="fas fa-minus"></i>
            </Button>
          </span>
        </div>
      </div>
    );
  };

  const [options, setOptions] = useState({
    options: [OptionsDiv()],
  });

  return (
    <React.Fragment>
      <form>
        <div className="">
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputEmail1">Enter question</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter question"
            />
          </div>
          {options.options.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputEmail1">Enter Answer</label>
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
    </React.Fragment>
  );
}

export default Mcq;
