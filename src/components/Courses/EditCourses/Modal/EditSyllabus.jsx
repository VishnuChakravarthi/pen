import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { url } from "../../../api";
import ClassicInputs from "../Inputs/ClassicInputs";
import swal from "sweetalert";

const EditSyllabus = ({ title, description, duration, id }) => {
  const [syllabus, setSyllabus] = useState({
    title: title,
    description: description,
    duration: duration.split(" ")[0],
  });

  const [isModal, setIsModal] = useState(false);

  const handleInputs = (e) => {
    setSyllabus({ ...syllabus, [e.target.name]: e.target.value });
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  const editSyllabus = async (e) => {
    e.preventDefault();
    const body = {
      title: syllabus.title,
      description: syllabus.description,
      duration: `${syllabus.duration} Weeks`,
    };
    const token = await localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const response = await axios.post(`${url}/edit-syllabus/${id}`, body, {
        headers: headers,
      });
      console.log(response);
      swal("Success!", "Syllabus Edited!", "success");
    } catch (error) {
      console.log(error);
      swal("OOPS!", "Editing Syllabus Failed", "error");
    }
    setIsModal(!isModal);
  };
  const deleteSyllabus = async (event) => {
    event.preventDefault();

    const willArchive = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this syllabus?",
      icon: "warning",
      dangerMode: true,
    });

    if (!willArchive) {
      return;
    }
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .delete(`${url}/delete-syllabus/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Syllabus Deleted!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "Deleting Syllabus Failed", "error");
      });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-1">
        <p>
          <i className="mdi mdi-check pr-3" />
          {syllabus.title}
        </p>
        <div>
          <button className="btn btn-secondary" onClick={toggleModal}>
            Edit
          </button>
          <button className="btn btn-danger ml-1" onClick={deleteSyllabus}>
            Delete
          </button>
        </div>
      </div>
      <ModalEdit
        isModal={isModal}
        setIsModal={setIsModal}
        syllabus={syllabus}
        handleInputs={handleInputs}
        editSyllabus={editSyllabus}
      />
    </React.Fragment>
  );
};

const ModalEdit = ({
  isModal,
  setIsModal,
  syllabus,
  handleInputs,
  editSyllabus,
}) => {
  return (
    <Modal isOpen={isModal} toggle={() => setIsModal(!isModal)} centered={true}>
      <ModalHeader toggle={() => setIsModal(!isModal)}>
        Edit Syllabus
      </ModalHeader>
      <ModalBody>
        <form>
          <ClassicInputs
            handleInputs={handleInputs}
            value={syllabus.title}
            name="title"
            label="Title"
          />
          <ClassicInputs
            handleInputs={handleInputs}
            value={syllabus.description}
            name="description"
            label="Description"
          />
          <div className="form-group row">
            <label className="col-sm-2  col-form-label" htmlFor="Duration">
              Duration
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="duration"
                value={syllabus.duration}
                onChange={(e) => handleInputs(e)}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn btn-primary"
              onClick={(e) => editSyllabus(e)}
            >
              Confirm Edit
            </button>
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
export default EditSyllabus;
