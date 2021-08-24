import React, { useState, useEffect, useCallback } from "react";
import { url } from "../api";
import axios from "axios";
import AddQuestions from "./AddQuestions";

function AddQuiz() {
  const [asses, setAsses] = useState("");
  const [courses, setCourses] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [page, setPage] = useState(1);
  const [page1Data, setData] = useState("");
  const [lesson, setLesson] = useState([]);
  const [id, setId] = useState("");
  const [sylId, setSylId] = useState("");

  const token = localStorage.getItem("Token");
  console.log("Basic " + token);

  useEffect(() => {
    const fetchCourses = async () => {
      await axios({
        method: "get",
        url: `${url}/view-all-courses`,
        headers: { Authorization: `Basic ${token}` },
      })
        .then((res) => {
          console.log(res.data.data);
          setCourses(res.data.data);
          setId(res.data.data[0].course_id);
        })
        .catch((e) => console.log(e));
    };
    fetchCourses();
  }, [token]);

  useEffect(() => {
    const getSyl = async () => {
      try {
        await axios({
          method: "get",
          url: `${url}/syllabus/${id}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          console.log(res.data.data);
          setSyllabus(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSyl();
  }, [id, token]);

  useEffect(() => {
    const getLessons = async () => {
      try {
        await axios({
          method: "get",
          url: `${url}/view-lessons/${sylId}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          console.log(res.data.data);
          setLesson(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLessons();
  }, [sylId, token]);

  const onSubmit = async () => {
    console.log(asses);
    await axios
      .post(`${url}/add-assessment`, asses, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
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
            <div className="container-fluid ">
              <div className="d-flex justify-content-between align-center">
                <h3 className="mb-2">Add Assessment</h3>
                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => setPage(2)}
                  >
                    Add Quiz
                  </button>
                </div>
              </div>
              <form className="form-horizontal">
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    // htmlFor="simpleinput"
                  >
                    Course
                  </label>
                  <div className="col-sm-10">
                    <select
                      className=" form-control"
                      placeholder="Select Course"
                      // onChange={(e) => getLessons(e.target.value)}
                      onChange={(e) => setId(e.target.value)}
                    >
                      {courses.map((course, index) => (
                        <option value={course.course_id} key={index}>
                          {course.course_title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    // htmlFor="simpleinput"
                  >
                    Syllabus
                  </label>
                  <div className="col-sm-10">
                    <select
                      className=" form-control"
                      placeholder="Select Course"
                      // onChange={(e) => getLessons(e.target.value)}
                      onChange={(e) => setSylId(e.target.value)}
                    >
                      <option selected disabled>
                        Select a Syllabus
                      </option>
                      {syllabus.map((course, index) => (
                        <option value={course.id} key={index}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    // htmlFor="simpleinput"
                  >
                    Lesson
                  </label>
                  <div className="col-sm-10">
                    <select
                      className=" form-control"
                      placeholder="Select Lesson"
                      onChange={(e) =>
                        setAsses({ ...asses, lesson_id: e.target.value })
                      }
                    >
                      <option selected disabled>
                        Select a lesson
                      </option>
                      {lesson?.map((lesson, index) => (
                        <>
                          <option value={lesson.id} key={index}>
                            {lesson.title}
                          </option>
                        </>
                      ))}
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
