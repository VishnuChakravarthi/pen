import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { DropzoneArea } from "material-ui-dropzone";
import { url } from "../../../api";
import axios from "axios";
// import { PDFReader } from "reactjs-pdf-reader";
import ClassicInputs from "../Inputs/ClassicInputs";
import DropdownInputs from "../Inputs/DropdownInputs";
import swal from "sweetalert";

const EditLesson = ({
  id,
  title,
  description,
  file_type,
  course_file,
  sharp_script,
  file_extension,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [lesson, setLesson] = useState({
    title: title,
    description: description,
    file_type: file_type,
    course_file: course_file,
    sharp_script: sharp_script,
    file_extension: file_extension,
  });

  const [fileType, setFileType] = useState(file_type);
  const [file, setFile] = useState(course_file);
  const [sharpscript, setSharpscript] = useState(sharp_script);

  const editLesson = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", lesson.title);
    formData.append("description", lesson.description);
    formData.append("file_type", fileType);
    formData.append("course_file", file);
    if (lesson.fileType === "video") {
      formData.append("sharp_script", sharpscript);
    }
    console.log("EditLesson", formData);

    const token = await localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post(`${url}/edit-lesson/${id}`, formData, {
        headers: headers,
      });
      console.log(response);
      swal("Success!", "Lesson Edited!", "success");
    } catch (error) {
      console.log(error);
      swal("OOPS!", "Editing Lesson Failed", "error");
    }
  };

  const setType = (e) => {
    setFileType(e.target.value);
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setIsModal(!isModal);
  };
  const handleInputs = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };
  const handleFeatureImage = (files) => {
    setFile(files[0]);
  };
  const handleSharpscript = (files) => {
    setSharpscript(files[0]);
  };

  const deleteLesson = async (event) => {
    event.preventDefault();

    const willArchive = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this lesson?",
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
      .delete(`${url}/delete-lesson/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Lesson Deleted!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "Deleting Lesson Failed", "error");
      });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-1">
        <p>
          <i className="mdi mdi-check pr-3" />
          {lesson.title}
        </p>
        <div>
          <button className="btn btn-secondary" onClick={toggleModal}>
            Edit
          </button>
          <button className="btn btn-danger ml-1" onClick={deleteLesson}>
            Delete
          </button>
        </div>
      </div>
      <EditModal
        isModal={isModal}
        setIsModal={setIsModal}
        lesson={lesson}
        handleInputs={handleInputs}
        fileType={fileType}
        setType={setType}
        handleFeatureImage={handleFeatureImage}
        handleSharpscript={handleSharpscript}
        editLesson={editLesson}
      />
    </React.Fragment>
  );
};

export default EditLesson;

const EditModal = ({
  isModal,
  setIsModal,
  lesson,
  handleInputs,
  fileType,
  setType,
  handleFeatureImage,
  handleSharpscript,
  editLesson,
}) => {
  return (
    <Modal
      isOpen={isModal}
      toggle={() => setIsModal(!isModal)}
      centered={true}
      size="lg"
    >
      <ModalHeader toggle={() => setIsModal(!isModal)}>Edit Lesson</ModalHeader>
      <ModalBody>
        <form>
          <ClassicInputs
            handleInputs={handleInputs}
            value={lesson.title}
            name="title"
            label="Title"
          />
          <ClassicInputs
            handleInputs={handleInputs}
            value={lesson.description}
            name="description"
            label="Description"
          />
          <div className="form-group row">
            <label className="col-sm-2  col-form-label">Existing File</label>
            <div className="col-sm-10">
              <h5>{lesson.file_type}</h5>
              {lesson.file_type === "image" && (
                <img src={lesson.course_file} alt="" className="img-fluid" />
              )}
              {lesson.file_type === "ppt" && (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${lesson.course_file}`}
                  width="800"
                  height="600"
                  title="ppt"
                ></iframe>
              )}
              {lesson.file_type === "video" && (
                <div className="text-center">
                  <video width="320" height="240" controls>
                    <source
                      src={lesson.course_file}
                      type={`video/${lesson.file_extension}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {lesson.file_type === "pdf" && (
                <div className="text-center">
                  <iframe
                    src={lesson.course_file}
                    width="800"
                    height="600"
                    title="pdf"
                  ></iframe>
                  {/* <PDFReader url={lesson.course_file} /> */}
                </div>
              )}
            </div>
          </div>
          <DropdownInputs
            handleInputs={setType}
            value={fileType}
            name="file_type"
            label="File Type"
            options={["ppt", "pdf", "video"]}
          />
          <div className="attached-files mt-4 row">
            <h4 className="header-title col-sm-2  mb-4">New Course File</h4>
            <section className="container border-custom col-sm-10 p-3">
              <DropzoneArea
                onChange={(files) => handleFeatureImage(files)}
                filesLimit={1}
              />
            </section>
          </div>
          {fileType === "video" && (
            <div className="attached-files mt-4 row">
              <h4 className="header-title col-sm-2  mb-4">Sharpscript</h4>
              <section className="container border-custom col-sm-10 p-3">
                <DropzoneArea
                  onChange={(files) => handleSharpscript(files)}
                  filesLimit={1}
                />
              </section>
            </div>
          )}
          <div className="text-right">
            <button className="btn btn-primary" onClick={(e) => editLesson(e)}>
              Submit
            </button>
          </div>
        </form>
        <hr />
        <div className="text-right">
          <button
            className="btn btn-danger"
            onClick={() => setIsModal(!isModal)}
          >
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
