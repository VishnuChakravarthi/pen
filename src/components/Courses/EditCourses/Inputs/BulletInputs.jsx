import React, { useState } from "react";
import EditModal from "../Modal/EditModal";

const BulletInputs = ({ items, setItems, title }) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  return (
    <React.Fragment>
      {items.map((item, index) => (
        <div key={index} className="d-flex justify-content-between mb-1">
          <p>
            <i className="mdi mdi-check pr-3" />
            {item}
          </p>
        </div>
      ))}
      <div className="text-right">
        <button className="btn btn-primary py-1 px-3" onClick={toggleModal}>
          <p className="my-0" style={{ fontSize: "1.2rem" }}>
            Edit
          </p>
        </button>
      </div>
      <EditModal
        isModal={isModal}
        setIsModal={setIsModal}
        items={items}
        setItems={setItems}
        title={title}
      />
    </React.Fragment>
  );
};

export default BulletInputs;
