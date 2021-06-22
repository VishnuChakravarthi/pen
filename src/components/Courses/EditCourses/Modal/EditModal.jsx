import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const EditDetails = ({ isModal, setIsModal, items, setItems, title }) => {
  const [newText, setNewText] = useState("");

  const add = (e) => {
    e.preventDefault();
    setItems([...items, newText]);
    setNewText("");
  };
  const remove = (skill) => {
    const newSkill = items.filter((skills) => skills !== skill);
    setItems(newSkill);
  };

  return (
    <Modal isOpen={isModal} toggle={() => setIsModal(!isModal)} centered={true}>
      <ModalHeader toggle={() => setIsModal(!isModal)}>
        Edit {title}
      </ModalHeader>
      <ModalBody>
        <form>
          {items.map((items, index) => (
            <span className="badge badge-primary p-2 mr-2" key={index}>
              {items}
              <span
                aria-hidden="true"
                className="ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => remove(items)}
              >
                &times;
              </span>
            </span>
          ))}
          <div className="row mt-3">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${title}`}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary" onClick={(e) => add(e)}>
                Add
              </button>
            </div>
          </div>
        </form>
        <hr />
        <div className="text-right">
          <button
            className="btn btn-danger"
            onClick={() => setIsModal(!isModal)}
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditDetails;
