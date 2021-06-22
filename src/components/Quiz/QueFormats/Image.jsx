import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";

function Image({ item, index, changeVal, showSubmit = true }) {
  function submitfn() {
    swal({
      text: "You have successfully updated the course material",
      icon: "success",
    });
  }
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log(acceptedFiles);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const optionsDiv = () => {
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
      <div className="form-group col-sm-6 d-flex align-items-end pl-0">
        <div className="attached-files pl-3">
          <h4 className="header-title ">Attach File</h4>
          <section className="container border-custom  p-3">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4></h4>
              <ul>{files}</ul>
            </aside>
          </section>
        </div>
        <div className="col-sm-2">
          <span>
            <Button
              className="mr-1"
              color="secondary"
              id={"Tooltip-" + "1"}
              onClick={() => {
                const divs = options.options;
                divs.push(optionsDiv());
                setOptions({
                  options: divs,
                });
              }}
            >
              <i className="fas fa-plus"></i>
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target={"Tooltip-" + "1"}
              toggle={toggle}
            >
              Add option
            </Tooltip>
          </span>
        </div>
      </div>
    );
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [options, setOptions] = useState({
    options: [optionsDiv()],
  });

  console.log(options);
  return (
    <React.Fragment>
      <form role="form">
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
          {options.options.map((item, index) => (
            <>{item}</>
          ))}
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
          {showSubmit && <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>}
        </div>
      </form>
    </React.Fragment>
  );
}

export default Image;
