import React, { useState, useEffect } from "react";
import MCQ from "./QueFormats/mcq";
import FillIn from "./QueFormats/FillIn";
import Image from "./QueFormats/Image";
import axios from "axios";
import { url } from "../api";

const AddQuestions = () => {
  const [type, setType] = useState("mcq");
  const [numQues, setNumQues] = useState([
    { question: "", answer: "", option: [], image: "" },
  ]);
  const [id, setId] = useState("1");

  const [courses, setCourses] = useState([]);
  const [lesson, setLesson] = useState([]);

  const token = localStorage.getItem("Token");

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
        })
        .catch((e) => console.log(e));
    };
    fetchCourses();
  }, [token]);

  useEffect(() => {
    const getLessons = async () => {
      try {
        await axios({
          method: "get",
          url: `${url}/view-lessons/${id}`,
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
  }, [id, token]);

  const changeNumQues = (i, curr) => {
    setNumQues([...numQues.slice(0, i), curr, ...numQues.slice(i + 1)]);
  };

  const renderAddQue = (item, index) => {
    return (
      <div className="card-box m-3" key={index}>
        <div className="d-flex justify-content-between">
          <h4 className="header-title mb-4">Add questions</h4>

          <div className="form-group row col-sm-2">
            <select
              className="form-control col-sm-6"
              onChange={(e) => setType(e.target.value)}
            >
              <label className="col-sm-6  col-form-label">Question type</label>
              <option value="mcq">Mcq</option>
              <option value="fillin">Fill In</option>
              <option value="image">Image</option>
            </select>
          </div>
        </div>

        <div className="form-group row col-sm-6 ml-1">
          <label className="form-check-label mb-2">Course</label>
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
        <div className="form-group row col-sm-6 ml-1">
          <label className="form-check-label mb-2">Lesson</label>
          <select className=" form-control" placeholder="Select Lesson">
            {lesson.map((lesson, index) => (
              <option value={lesson.title} key={index}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>

        {type === "mcq" ? (
          <MCQ
            Item={item}
            index={index}
            changeVal={(i, curr) => changeNumQues(i, curr)}
            showSubmit={false}
          />
        ) : type === "fillin" ? (
          <FillIn
            item={item}
            index={index}
            changeVal={(i, curr) => changeNumQues(i, curr)}
            showSubmit={false}
          />
        ) : (
          <Image
            item={item}
            index={index}
            changeVal={(i, curr) => changeNumQues(i, curr)}
            showSubmit={false}
          />
        )}
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              {numQues.map((item, index) => renderAddQue(item, index))}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-purple btn-rounded w-md waves-effect waves-light mb-3"
                  onClick={(e) =>
                    setNumQues([
                      ...numQues,
                      { question: "", answer: "", option: [], image: "" },
                    ])
                  }
                >
                  <i className="mdi mdi-plus"></i>Add question
                </button>
                <button type="submit" className="ml-2 btn btn-primary mb-3">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddQuestions;
