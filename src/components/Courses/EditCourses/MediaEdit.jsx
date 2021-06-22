import React, { useState } from "react";
import ReactPlayer from "react-player";
import EditImage from "./Modal/EditImage";

const MediEdit = ({ courseDetail }) => {
  const [isIntro, setIsIntro] = useState(false);
  const [isFeature, setIsFeature] = useState(false);

  const toggleIntro = (e) => {
    e.preventDefault();
    setIsIntro(!isIntro);
  };
  const toggleFeature = (e) => {
    e.preventDefault();
    setIsFeature(!isFeature);
  };

  return (
    <React.Fragment>
      <div className="card-box">
        <div className="attached-files mt-4">
          <h2>Attached Files </h2>
          <div className="container-fluid p-3">
            <h3>Intro File</h3>
            {courseDetail.intro_file_type === "youtube" && (
              <ReactPlayer url={courseDetail.intro_file} />
            )}
          </div>
          <div className="text-right mt-3">
            <button className="btn btn-primary" onClick={toggleIntro}>
              Edit Intro File
            </button>
          </div>
          <div className="container-fluid p-3">
            <h3>Feature Image</h3>
            <img
              src={courseDetail.feature_image}
              alt="Feature file"
              className="img-fluid"
            />
            <div className="text-right mt-3">
              <button className="btn btn-primary" onClick={toggleFeature}>
                Edit Feature File
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditImage
        isModal={isIntro}
        setIsModal={setIsIntro}
        title="Intro File"
        course={courseDetail}
        id={courseDetail.course_id}
      />
      <EditImage
        isModal={isFeature}
        setIsModal={setIsFeature}
        title="Feature Image"
        course={courseDetail}
        id={courseDetail.course_id}
      />
    </React.Fragment>
  );
};

export default MediEdit;
