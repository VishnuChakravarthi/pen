import React, { useState, useEffect, useCallback } from "react";
import MCQ from "./QueFormats/mcq";
import FillIn from "./QueFormats/FillIn";
import Image from "./QueFormats/Image";
import axios from "axios";
import { url } from "../api";
import TrueOrFalse from "./QueFormats/TrueOrFalse";
import swal from "sweetalert";

const allType = [
  { name: "MCQ", value: "mcq" },
  { name: "Solution MCQ", value: "problem-solution-mcq" },
  { name: "Solution fillup", value: "problem-solution-fillup" },
  { name: "True or False", value: "true-false" },
  { name: "Video Audio Choose", value: "video-audio-choose" },
  { name: "Video Audio Image", value: "video-audio-image" },
  { name: "Fillup", value: "fillup" },
  { name: "Video Audio Fillup", value: "video-audio-fillup" },
];

const AddQuestions = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [assessId, setAssessId] = useState();

  const [numQues, setNumQues] = useState();
  const [courseId, setCourseId] = useState();
  const [syllabus, setSyllabus] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [showQues, setShowQues] = useState(false);

  const [courses, setCourses] = useState([]);
  const [assess, setAssess] = useState([]);

  const token = localStorage.getItem("Token");
  console.log(courseId);
  useEffect(() => {
    if (assessId) {
      setNumQues([
        {
          assessment_id: assessId,
          type: "mcq",
          question: "",
          answer: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          point: "",
        },
      ]);
      setShowQues(true);
    }
  }, [assessId]);

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

  // useEffect(() => {
  const getAccess = async (lessonId) => {
    try {
      await axios({
        method: "get",
        url: `${url}/view-assessment/${lessonId}`,
        headers: { Authorization: `Basic ${token}` },
      }).then((res) => {
        console.log(res.data.data);
        setAssess(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //   getAccess();
  // }, [lessonId, token]);

  const getSyl = async (id) => {
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

  // useEffect(() => {
  const getLessons = async (courseId) => {
    try {
      await axios({
        method: "get",
        url: `${url}/view-lessons/${courseId}`,
        headers: { Authorization: `Basic ${token}` },
      }).then((res) => {
        console.log(res.data.data);
        setLesson(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(courseId);
  // if (courseId) {
  //   getLessons();
  // }
  // }, [courseId, token]);

  const changeNumQues = (i, curr) => {
    setNumQues([...numQues.slice(0, i), curr, ...numQues.slice(i + 1)]);
  };

  const changeType = (type, i) => {
    console.log(type, i);
    const quesArr = numQues;
    if (type === "mcq" || type === "problem-solution-mcq") {
      quesArr[i] = {
        assessment_id: assessId,
        type,
        question: "",
        answer: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        point: "",
      };
    }
    if (
      type === "problem-solution-fillup" ||
      type === "fillup" ||
      type === "true-false"
    ) {
      quesArr[i] = {
        assessment_id: assessId,
        type,
        question: "",
        answer: "",
        point: "",
      };
    }
    if (type === "video-audio-fillup") {
      quesArr[i] = {
        assessment_id: assessId,
        type,
        question: [],
        answer: "",
        point: "",
      };
    }
    if (type === "video-audio-choose") {
      quesArr[i] = {
        assessment_id: assessId,
        type,
        question: [],
        answer: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        point: "",
      };
    }
    if (type === "video-audio-image") {
      quesArr[i] = {
        assessment_id: assessId,
        type,
        question: [],
        answer: "",
        optionA: [],
        optionB: [],
        optionC: [],
        optionD: [],
        point: "",
      };
    }
    console.log(quesArr);
    setNumQues(quesArr);
    forceUpdate();
  };

  const submitQues = async () => {
    console.log(numQues);

    const asyncForEach = async (arr, callback) => {
      for (let i = 0; i < arr.length; i++) {
        await callback(arr[i]);
      }
    };

    const hitit = async () => {
      await asyncForEach(numQues, async (ques) => {
        if (
          ques.type === "video-audio-fillup" ||
          ques.type === "video-audio-image" ||
          ques.type === "video-audio-choose"
        ) {
          const fd = new FormData();
          const keys = Object.keys(ques);
          console.log(keys);
          keys.map((key) => fd.append(key, ques[key]));

          await axios
            .post(`${url}/add-question`, fd, {
              headers: { Authorization: `Basic ${token}` },
            })
            .then(() => {})
            .catch((e) =>
              swal("Error", "The assessment is not added", "error")
            );
          return;
        }
        await axios
          .post(`${url}/add-question`, ques, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then(() => {})
          .catch((e) => swal("Error", "The assessment is not added", "error"));
      });
      console.log("Success");
      swal("Success", "The assessment is added", "success");
    };
    hitit();
  };

  const renderAddQue = (item, index) => {
    return (
      <div className="card-box m-3" key={index}>
        <div className="d-flex justify-content-between">
          <h4 className="header-title mb-4">Add questions</h4>
          <div className="form-group row col-sm-4">
            <select
              className="form-control col-sm-12"
              value={item.type}
              onChange={(e) => changeType(e.target.value, index)}
            >
              {allType.map((type) => (
                <option value={type.value}>{type.name}</option>
              ))}
              {/* <option value="mcq">Mcq</option>
              <option value="fillin">Fill In</option>
              <option value="image">Image</option> */}
            </select>
          </div>
        </div>

        {item.type === "mcq" || item.type === "problem-solution-mcq" ? (
          (console.log(numQues),
          (
            <MCQ
              whole={numQues}
              currItem={item}
              index={index}
              setNumQues={setNumQues}
              submitQues={() => submitQues()}
              showSubmit={false}
            />
          ))
        ) : item.type === "fillup" ||
          item.type === "problem-solution-fillup" ? (
          <FillIn
            whole={numQues}
            currItem={item}
            index={index}
            setNumQues={setNumQues}
          />
        ) : item.type === "true-false" ? (
          <TrueOrFalse
            whole={numQues}
            currItem={item}
            index={index}
            setNumQues={setNumQues}
          />
        ) : item.type === "video-audio-fillup" ? (
          <Image
            isImage={true}
            whole={numQues}
            currItem={item}
            index={index}
            setNumQues={setNumQues}
            isFillUp={true}
          />
        ) : (
          <Image
            currItem={item}
            index={index}
            setNumQues={setNumQues}
            whole={numQues}
            isImage={true}
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
              <div className="form-group row col-sm-6 ml-1">
                <label className="form-check-label mb-2">Course</label>
                <select
                  className=" form-control"
                  placeholder="Select Course"
                  // onChange={(e) => getLessons(e.target.value)}
                  onChange={(e) => getSyl(e.target.value)}
                >
                  <option selected disabled>
                    Select an Course
                  </option>
                  {courses.map((course, index) => (
                    <option value={course.course_id} key={index}>
                      {course.course_title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group row col-sm-6 ml-1">
                <label
                  className=" col-form-label"
                  // htmlFor="simpleinput"
                >
                  Syllabus
                </label>
                {/* <div className=""> */}
                <select
                  className=" form-control"
                  placeholder="Select Lesson"
                  onChange={(e) => getLessons(e.target.value)}
                >
                  <option selected disabled>
                    Select a Syllabus
                  </option>
                  {syllabus?.map((syl, index) => (
                    <>
                      <option value={syl.id} key={index}>
                        {syl.title}
                      </option>
                    </>
                  ))}
                </select>
                {/* </div> */}
              </div>

              <div className="form-group row col-sm-6 ml-1">
                <label
                  className=" col-form-label"
                  // htmlFor="simpleinput"
                >
                  Lesson
                </label>
                {/* <div className=""> */}
                <select
                  className=" form-control"
                  placeholder="Select Lesson"
                  onChange={(e) => getAccess(e.target.value)}
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
                {/* </div> */}
              </div>

              <div className="form-group row col-sm-6 ml-1">
                <label className="form-check-label mb-2">Assessment</label>
                <select
                  className=" form-control"
                  placeholder="Select Lesson"
                  onChange={(e) => setAssessId(e.target.value)}
                >
                  <option selected disabled>
                    Select an assessment
                  </option>
                  {assess.map((lesson, index) => (
                    <>
                      <option value={lesson.id} key={index}>
                        {lesson.title}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              {showQues && (
                <>
                  {numQues.map((item, index) => renderAddQue(item, index))}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-purple btn-rounded w-md waves-effect waves-light mb-3"
                      onClick={(e) =>
                        setNumQues([
                          ...numQues,
                          {
                            type: "mcq",
                            question: "",
                            answer: "",
                            optionA: "",
                            optionB: "",
                            optionC: "",
                            optionD: "",
                            point: "",
                          },
                        ])
                      }
                    >
                      <i className="mdi mdi-plus"></i>Add question
                    </button>
                    <button
                      type="submit"
                      onClick={() => submitQues()}
                      className="ml-2 btn btn-primary mb-3"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddQuestions;
