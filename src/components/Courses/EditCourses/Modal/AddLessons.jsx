import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useState, useRef } from "react";
import axios from "axios";
import { url } from "../../../api";
import { DropzoneArea } from "material-ui-dropzone";
import swal from "sweetalert";

const AddLessons = ({ addLesson, setAddLesson, id }) => {
  const [type, setType] = useState("ppt");
  const [file, setFile] = useState({});
  const title = useRef("");
  const description = useRef("");
  const [sharpscript, setSharpscript] = useState("");

  const handleCourseFile = (files) => {
    setFile(files[0]);
  };
  const handleSharpscript = (files) => {
    setSharpscript(files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log({
      id,
      title: title.current.value,
      description: description.current.value,
      file,
      type,
    });

    formData.append("syllabus_id", id);
    formData.append("title", title.current.value);
    formData.append("description", description.current.value);
    formData.append("course_file", file);
    formData.append("file_type", type);

    if (type === "video") {
      formData.append("sharpscript", sharpscript);
    }
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(`${url}/add-lesson`, formData, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        swal("Success!", "Lesson Added!", "success");
      })
      .catch((e) => {
        console.log(e);
        swal("OOPS!", "Adding Lesson Failed", "error");
      });
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={addLesson}
        toggle={() => setAddLesson(!addLesson)}
        centered={true}
        size="lg"
        style={{ zIndex: "6000" }}
      >
        <ModalHeader toggle={() => setAddLesson(!addLesson)}>
          Add Lesson
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>
                      <input className="form-control" type="text" ref={title} />
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        ref={description}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>File Type</th>
                    <td>
                      <select
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="ppt">Presentation</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </td>
                  </tr>
                  {type === "ppt" && (
                    <tr>
                      <th>File </th>
                      <td>
                        <section className="container border-custom col-sm-10 p-3">
                          <DropzoneArea
                            onChange={(files) => handleCourseFile(files)}
                            filesLimit={1}
                          />
                        </section>
                      </td>
                    </tr>
                  )}
                  {type === "pdf" && (
                    <tr>
                      <th>File </th>
                      <td>
                        <section className="container border-custom col-sm-10 p-3">
                          <DropzoneArea
                            onChange={(files) => handleCourseFile(files)}
                            filesLimit={1}
                          />
                        </section>
                      </td>
                    </tr>
                  )}
                  {type === "video" && (
                    <>
                      <tr>
                        <th>File </th>
                        <td>
                          <section className="container border-custom col-sm-10 p-3">
                            <DropzoneArea
                              onChange={(files) => handleCourseFile(files)}
                              filesLimit={1}
                            />
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <th>Sharpscript </th>
                        <td>
                          <section className="container border-custom col-sm-10 p-3">
                            <DropzoneArea
                              onChange={(files) => handleSharpscript(files)}
                              filesLimit={1}
                            />
                          </section>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div
            className="d-flex"
            style={{ width: "100%", justifyContent: "flex-end" }}
          >
            <button
              className="btn btn-primary mr-3"
              type="submit"
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Submit
            </button>
            <Button color="danger" onClick={() => setAddLesson(!addLesson)}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddLessons;
