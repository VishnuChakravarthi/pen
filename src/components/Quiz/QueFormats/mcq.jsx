import React, { useState } from "react";
import { Button } from "reactstrap";

function Mcq({ currItem, index, whole, setNumQues, submitQues, showSubmit }) {
  const [item, setItem] = useState(currItem);
  console.log(item);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const arr = whole;
    arr[index] = { ...arr[index], [name]: value };
    console.log(arr);
    setItem({ ...item, [name]: value });
    setNumQues(arr);
  };
  console.log(item);

  return (
    <React.Fragment>
      <form onSubmit={submitQues}>
        <div className="">
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputEmail1">Enter question</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter question"
              name="question"
              value={item?.question}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputPassword1">Option 1</label>
            <input
              type="text"
              className="form-control"
              name={`optionA`}
              value={item?.optionA}
              placeholder="Enter options"
              onChange={(e) => handleInput(e)}
            />
            <label htmlFor="exampleInputPassword1">Option 2</label>
            <input
              type="text"
              className="form-control"
              name={`optionB`}
              placeholder="Enter options"
              value={item?.optionB}
              onChange={(e) => handleInput(e)}
            />
            <label htmlFor="exampleInputPassword1">Option 3</label>
            <input
              type="text"
              className="form-control"
              name={`optionC`}
              placeholder="Enter options"
              value={item?.optionC}
              onChange={(e) => handleInput(e)}
            />
            <label htmlFor="exampleInputPassword1">Option 4</label>
            <input
              type="text"
              className="form-control"
              name={`optionD`}
              placeholder="Enter options"
              value={item?.optionD}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputEmail1">Enter Answer</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter answer"
              name="answer"
              value={item?.answer}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="exampleInputEmail1">Enter Point</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter answer"
              name="point"
              value={item?.point}
              onChange={(e) => handleInput(e)}
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
