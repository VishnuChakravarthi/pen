import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import Dropzone from "react-dropzone";
import swal from "sweetalert";
import { DropzoneArea } from "material-ui-dropzone";

function Image({ whole, currItem, index, setNumQues, isImage, isFillUp }) {
  const [item, setItem] = useState(currItem);

  console.log(isFillUp);

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    const arr = whole;
    arr[index] = { ...arr[index], [name]: value };
    console.log(arr);
    setItem({ ...item, [name]: value });
    setNumQues(arr);
  };

  const handleInputImage = (name, value) => {
    console.log(name, value);
    // let name = name;
    // let value = value;
    const arr = whole;
    arr[index] = { ...arr[index], [name]: value[0] };
    console.log(arr);
    setItem({ ...item, [name]: value[0] });
    setNumQues(arr);
  };

  console.log(item);
  return (
    <React.Fragment>
      <form role="form">
        <div className="">
          {!isImage ? (
            <div className="form-group col-sm-6">
              <label for="exampleInputEmail1">Enter question</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="question"
                placeholder="Enter question"
                value={item?.question}
                onChange={(e) => handleInput(e)}
              />
            </div>
          ) : (
            <DropzoneArea
              onChange={(file) => handleInputImage("question", file)}
            />
          )}
          {
            !isFillUp
              ? ["optionA", "optionB", "optionC", "optionD"].map((n) => (
                  <div className="attached-files pl-3">
                    <h4 className="header-title ">{n}</h4>
                    <DropzoneArea
                      onChange={(file) => handleInputImage(n, file)}
                    />
                  </div>
                ))
              : null
            // <div className="form-group col-sm-6">
            //   <label for="exampleInputEmail1">Enter Question</label>
            //   <input
            //     type="text"
            //     className="form-control"
            //     id="exampleInputEmail1"
            //     name="question"
            //     value={item?.question}
            //     onChange={(e) => handleInput(e)}
            //   />
            // </div>
          }
          <div className="form-group col-sm-6">
            <label for="exampleInputEmail1">Enter Answer</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
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

          {/* {showSubmit && ( */}
          {/* <button type="submit" className="btn btn-primary m-3">
            Submit
          </button> */}
          {/* )} */}
        </div>
      </form>
    </React.Fragment>
  );
}

export default Image;
