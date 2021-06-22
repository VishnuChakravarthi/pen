// import React, { useState } from "react";
import React from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "./style.css";

function MyVerticallyCenteredModal(props) {
  // const mystyle = {
  //   cursor: "pointer",
  // };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-auto"
      style={{
        width: "auto",
      }}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" method="post">
          <label for="uploadfile" className="m-0">
            Upload File
          </label>
          <input type="file" className="ml-2" name="uploadfile"></input>
          <div
            className="mt-1"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button type="submit" className="btn btn-default btn-primary mr-1">
              Submit
            </button>
            <span
              onClick={props.onHide}
              className="btn btn-default btn-secondary"
            >
              Close
            </span>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
