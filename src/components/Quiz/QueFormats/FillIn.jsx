import React, { useState } from "react";

function FillIn({ whole, currItem, index, setNumQues }) {
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
            name="question"
            value={item?.question}
            onChange={(e) => handleInput(e)}
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
            name="point"
            value={item?.point}
            onChange={(e) => handleInput(e)}
          />
        </div>

        {/* {showSubmit && (
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
        )} */}
      </div>
    </form>
  );
}

export default FillIn;
