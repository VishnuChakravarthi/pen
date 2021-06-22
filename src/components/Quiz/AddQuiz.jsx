import React, { useState, useEffect, useCallback } from "react";
import { url } from "../api";
import axios from "axios";
import AddQuestions from "./AddQuestions";

function AddQuiz() {
  const [asses, setAsses] = useState("");
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(2);
  const [page1Data, setData] = useState("");
  const [lesson, setLesson] = useState([]);

  const token = localStorage.getItem("Token");
  console.log("Basic " + token);

  useEffect(() => {
    const fetchCourses = async () => {
      await axios({
        method: "get",
        url: `${url}/view-all-courses`,
        headers: { Authorization: `Basic ${token}` },
      }).then((res) => {
        console.log(res.data.data);
        setCourses(res.data.data);
      });
    };
    if (!courses.length > 0) fetchCourses();
  }, [courses, token]);
  console.log(asses);

  const getLessons = useCallback(
    async (id) => {
      try {
        await axios({
          method: "get",
          url: `${url}/view-lessons/${id}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          console.log(res.data.data);
          console.log(lesson);
          setLesson(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [lesson, token]
  );

  const onSubmit = async () => {
    console.log(asses);
    await axios({
      method: "post",
      url: `${url}/add-assessment`,
      headers: { Authorization: `Basic ${token}` },
      body: asses,
    }).then((res) => {
      console.log(res);
    });
    setData(asses);
    setPage(2);
  };

  if (page === 1) {
    return (
      <React.Fragment>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <h3 className="mb-2">Add Assessment</h3>
              <form className="form-horizontal">
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Courses
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="course_id"
                      className="form-control"
                      required
                      onChange={(e) => {
                        setAsses({ ...asses, course_id: e.target.value });
                        getLessons(e.target.value);
                      }}
                    >
                      <option value="none">Select Course</option>
                      {courses.map((item, index) => {
                        return (
                          <option value={item.course_id}>
                            {item.course_title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      onChange={(e) => {
                        setAsses({ ...asses, title: e.target.value });
                      }}
                      maxLength="300"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
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
                      onChange={(e) => {
                        setAsses({ ...asses, description: e.target.value });
                      }}
                      maxLength="2500"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Duration
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="Duration"
                      onChange={(e) => {
                        setAsses({ ...asses, duration: e.target.value });
                      }}
                      maxLength="100"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Feature Image
                  </label>
                  <div className="col-sm-10">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        name="feature_image"
                        onChange={(e) => {
                          setAsses({
                            ...asses,
                            feature_image: e.target.value,
                          });
                        }}
                        required
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Start Time
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="time"
                      className="form-control"
                      name="start_time"
                      onChange={(e) => {
                        setAsses({ ...asses, start_time: e.target.value });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    End Time
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="time"
                      className="form-control"
                      name="end_time"
                      onChange={(e) => {
                        setAsses({ ...asses, end_time: e.target.value });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    Start Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      name="start_date"
                      onChange={(e) => {
                        setAsses({ ...asses, start_date: e.target.value });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    End Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      onChange={(e) => {
                        setAsses({ ...asses, end_date: e.target.value });
                      }}
                      required
                    />
                  </div>
                </div>
              </form>
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => onSubmit()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <AddQuestions data={page1Data} />;
  }
}

export default AddQuiz;
