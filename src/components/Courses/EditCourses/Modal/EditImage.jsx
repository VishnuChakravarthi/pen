import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { url } from "../../../api";
import swal from "sweetalert";
import DropdownInputs from "../Inputs/DropdownInputs";

const EditImage = ({ isModal, setIsModal, title, course, id }) => {
  const [introFile, setIntroFile] = useState({});
  const [featureFile, setFeatureFile] = useState("");
  const [fileType, setFileType] = useState("youtube");

  // console.log({ id, title });

  const handleIntroImage = (files) => {
    setIntroFile(files[0]);
  };
  const handleFeatureImage = (files) => {
    setFeatureFile(files[0]);
  };

  const editCourse = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("course_id", id);
    formData.append("course_title", course.course_title);
    formData.append("category_id", course.category_id);
    formData.append("category", course.category);
    formData.append("short_description", course.short_description);
    formData.append("course_description", course.course_description);
    formData.append("course_type", course.course_type);
    formData.append("course_outcome1", course.course_outcome1);
    formData.append("course_outcome2", course.course_outcome2);
    formData.append("course_outcome3", course.course_outcome3);
    formData.append("price_type", course.price_type);
    formData.append("what_learns", JSON.stringify(course.what_learns));
    formData.append("requirements", JSON.stringify(course.requirements));
    formData.append("skills_developed", course.skills_developed);

    if (course.price_type === "Paid") {
      formData.append("price1", course.price1);
      formData.append("price2", course.price2);
      formData.append("price3", course.price3);
    }

    if (title === "Intro File") {
      formData.append("feature_image", course.feature_image);
      formData.append("intro_file", introFile);
      formData.append("intro_file_type", fileType);
      console.log({ introFile, fileType });
    }
    if (title === "Feature Image") {
      formData.append("feature_image", featureFile);
      formData.append("intro_file", course.intro_file);
      formData.append("intro_file_type", course.intro_file_type);
    }
    console.log("EditImage", formData);

    const token = await localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post(
        `${url}/edit-course/${course.course_id}`,
        formData,
        {
          headers: headers,
        }
      );
      console.log(response);
      swal("Success!", "Course Edited!", "success");
    } catch (error) {
      console.log(error);
      swal("OOPS!", "Editing Course Failed", "error");
    }
  };

  const handleInputs = (e) => {
    setFileType(e.target.value);
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={isModal}
        toggle={() => setIsModal(!isModal)}
        centered={true}
        size="lg"
      >
        <ModalHeader toggle={() => setIsModal(!isModal)}>
          Edit {title}
        </ModalHeader>
        <ModalBody>
          <form className="px-5">
            <div className="attached-files mt-4 row">
              <h4 className="mb-4">New {title}</h4>
              <section className="container border-custom col-sm-10 p-3">
                {title === "Intro File" ? (
                  <React.Fragment>
                    <DropdownInputs
                      handleInputs={handleInputs}
                      value="youtube"
                      name="Intro File Type"
                      label="file_type"
                      options={["image", "youtube"]}
                    />
                    {fileType === "image" ? (
                      <DropzoneArea
                        onChange={(files) => handleIntroImage(files)}
                        filesLimit={1}
                      />
                    ) : (
                      <input
                        className="form-control"
                        value={introFile}
                        onChange={(e) => setIntroFile(e.target.value)}
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <DropzoneArea
                    onChange={(files) => handleFeatureImage(files)}
                    filesLimit={1}
                  />
                )}
              </section>
            </div>
            <div className="text-right  mt-3">
              <button className="btn btn-primary" onClick={editCourse}>
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
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditImage;
