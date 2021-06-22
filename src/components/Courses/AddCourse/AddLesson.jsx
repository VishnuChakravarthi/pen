import React, { useState } from "react";
import axios from "axios";
import { url } from "../../api";
import { DropzoneArea } from "material-ui-dropzone";
import { useHistory } from "react-router-dom";

const AddLesson = (props) => {
  console.log(props.data, "data from before step");
  // const course_id = 1;
  const token = localStorage.getItem("Token");
  const [numlessons, setLessonVals] = useState("");
  const [lessons, setLessons] = useState([]);
  const [courseFile, setCourseFile] = useState({});
  // const [sharpScript, setSharpScript] = useState({});
  const history = useHistory();
  const onSubmit = () => {
    console.log(lessons);
    lessons.forEach(async (item, index) => {
      let fd = new FormData();
      fd.append("syllabus_id", item.syllabus_id);
      fd.append("title", item.title);
      fd.append("description", item.description);
      fd.append("course_file", courseFile);
      fd.append("file_type", item.file_type);
      // fd.append("sharp_script", sharpScript);

      await axios
        .post(`${url}/add-lesson`, fd, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then((res) => console.log(res), history.push("/courses"));
    });
  };
  const generateLessons = () => {
    const num = parseInt(numlessons);
    var arr = [];
    for (var i = 0; i < num; i++) {
      console.log(i);
      arr.push({
        syllabus_id: props.data[0].syllabus_id,
        title: "",
        description: "",
        file_type: "image",
        file: "",
      });
    }
    setLessons(arr);
  };

  const handleCourseFile = (files) => {
    setCourseFile(files[0]);
  };

  // const handleSharpScript = (files) => {
  //   setSharpScript(files[0]);
  // };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <h3 className="mt-4 mb-3">Lessons</h3>
              {/* {props.miles.map((data, i) =>  */}
              <div className="form-group row">
                {/* <div>Syllabus Name : {data.title}</div> */}
                <label className="col-sm-2  col-form-label" for="simpleinput">
                  {" "}
                  Enter Number of Lessons
                </label>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control"
                    name="lesson_count"
                    value={numlessons}
                    onChange={(e) => setLessonVals(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => generateLessons()}
                  >
                    Enter
                  </button>
                </div>
              </div>
              {/* )} */}
              {lessons.map((item, index) => {
                return (
                  <form className="form-horizontal" key={index}>
                    <h1>Lesson {index + 1}</h1>

                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        for="simpleinput"
                      >
                        Milestones
                      </label>
                      <div className="col-sm-8">
                        <select
                          name="syllabus_id"
                          className="form-control"
                          required
                          // defaultValue={props.data[0].syllabus_id}
                          // value={lessons.file_type}
                          onChange={(e) => {
                            setLessons([
                              ...lessons.slice(0, index),
                              {
                                ...lessons[index],
                                syllabus_id: e.target.value,
                              },
                              ...lessons.slice(index + 1),
                            ]);
                          }}
                        >
                          {props.data.map((item, index) => {
                            return (
                              <option value={item.syllabus_id}>
                                {props.miles[index].title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        for="simpleinput"
                      >
                        Title
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={item.title}
                          onChange={(e) => {
                            setLessons([
                              ...lessons.slice(0, index),
                              { ...lessons[index], title: e.target.value },
                              ...lessons.slice(index + 1),
                            ]);
                          }}
                          maxLength="500"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        for="simpleinput"
                      >
                        Description
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          type="text"
                          className="form-control"
                          name="Description"
                          rows="2"
                          cols="50"
                          value={item.description}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setLessons([
                                ...lessons.slice(0, index),
                                {
                                  ...lessons[index],
                                  description: e.target.value,
                                },
                                ...lessons.slice(index + 1),
                              ]);
                            }
                          }}
                          required
                        />
                        <span className="color-gray">
                          {item.description
                            ? item.description.length + "/500"
                            : "0/500"}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        for="simpleinput"
                      >
                        File type
                      </label>
                      <div className="col-sm-10">
                        <select
                          name="lesson_file_type"
                          className="form-control"
                          required
                          defaultValue="image"
                          value={item.file_type}
                          onChange={(e) => {
                            setLessons([
                              ...lessons.slice(0, index),
                              {
                                ...lessons[index],
                                file_type: e.target.value,
                              },
                              ...lessons.slice(index + 1),
                            ]);
                          }}
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        for="simpleinput"
                      >
                        Course File
                      </label>
                      <div className="col-sm-10">
                        <div className="custom-file">
                          {/* <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            name="course_file"
                            onChange={(e) => {
                            }}
                            required
                          /> */}
                          <DropzoneArea
                            onChange={(files) => handleCourseFile(files)}
                            filesLimit={1}
                          />
                          {/* <label className="custom-file-label" for="customFile">
                            Choose file
                          </label> */}
                        </div>
                      </div>
                    </div>
                  </form>
                );
              })}
              {lessons.length ? (
                <button
                  type="submit"
                  className="btn-primary btn"
                  onClick={(e) => {
                    onSubmit();
                  }}
                >
                  Submit
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddLesson;
