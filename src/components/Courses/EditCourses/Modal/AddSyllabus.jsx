import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { url } from "../../../api";
import ClassicInputs from "../Inputs/ClassicInputs";
import swal from "sweetalert";

const AddSyllabus = ({ isModal, setIsModal, courseId }) => {
  const [syllabus, setSyllabus] = useState({
    title: "",
    description: "",
    duration: 0,
  });
  const handleInputs = (e) => {
    setSyllabus({ ...syllabus, [e.target.name]: e.target.value });
  };

  const addSyllabus = async (e) => {
    e.preventDefault();
    const body = {
      title: syllabus.title,
      description: syllabus.description,
      duration: `${syllabus.duration} Weeks`,
      course_id: courseId,
    };
    console.log(body);
    const token = await localStorage.getItem("Token");
    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const response = await axios.post(`${url}/add-syllabus`, body, {
        headers: headers,
      });
      console.log(response);
      swal("Success!", "Syllabus Added!", "success");
    } catch (error) {
      console.log(error);
      swal("OOPS!", "Adding Syllabus Failed", "error");
    }
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={isModal}
        toggle={() => setIsModal(!isModal)}
        centered={true}
      >
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
                  placeholder="duration in weeks"
                  value={syllabus.duration}
                  onChange={(e) => handleInputs(e)}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={(e) => addSyllabus(e)}
              >
                Add Syllabus
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
    </React.Fragment>
  );
};

export default AddSyllabus;
