import React, { useEffect, useState } from "react";
import "./Learning.css";
import LearningSide from "./Utils/LearningSide";
import { useStateValue } from "./../../StateProvider";
import { url } from "../api";
import Axios from "axios";
import BookIcon from "@material-ui/icons/Book";
import { createRef } from "react";
import BookmarkModal from "./Utils/BookmarkModal";
import history from "../../history";
import { useRef } from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Learning = React.memo(function Learning({ match }) {
    const video = createRef();
    const pptDoc = createRef();
    const pdfDoc = createRef();

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [syllabus, setSyllabus] = useState([]);
    const [currentSyllabus, setCurrentSyllabus] = useState("");
    const [allLessons, setAllLessons] = useState([]);
    const [syllabusLesson, setSyllabusLesson] = useState([]);
    const [count, setCount] = useState(0);
    const [displaySide, setDisplaySide] = useState(true);
    const [allCourseAsses, setAllCourseAsses] = useState([]);

    const [videoBookmarkTime, setVideoBookmarkTime] = useState(0);
    const [lesson, setLesson] = useState([]);
    const [{ darkMode, key }, dispatch] = useStateValue();
    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 1;
    const id = match.params.course_id;

    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetchSyllabus();
        fetchLesson();
        fetchAllCourseandAssess();
        setCount(0);
    }, [match.params.lesson_id]);

    useEffect(() => {
        // fetchSyllabusLesson(match.params.syllabus_id);
        setCourseProgress();
    }, [syllabusLesson]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const setCourseProgress = async () => {
        // let count = 0;
        console.log(syllabusLesson, "sdfsdfsdfsdfsdfsdfdfsdfdsfdsf");
        // let syllabus_id = "";
        const syllabus_id = syllabusLesson?.find((syl) => {
            console.log(syl, "sdfsdfsdfsdfsdfsdfdfsdfdsfdsf");
            if (syl.lessons.includes(+match.params.lesson_id)) {
                return syl.syllabus;
            }
        });
        setCurrentSyllabus(syllabus_id?.syllabus);
        // console.log(syllabus_id?.syllabus);
        // count++;
        if (syllabusLesson.length >= 1 && syllabus_id && count <= 1) {
            setCount((count) => count + 1);
            const postData = {
                course_id: match.params.course_id,
                syllabus_id: syllabus_id.syllabus,
                lesson_id: match.params.lesson_id,
            };
            try {
                const response = await Axios.post(
                    `${url}/track/course`,
                    postData,
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                );
                console.log(response.data);
            } catch (e) {}
        }
    };

    console.log(displaySide);

    const fetchAllCourseandAssess = async () => {
        try {
            const response = await Axios.get(`${url}/view-all-courses`);
            console.log(response);
            setAllCourseAsses(response.data.data);
        } catch (e) {}
    };

    const fetchSyllabus = async () => {
        // setLesson(data[0].lessons);
        try {
            const response = await Axios.get(
                `${url}/syllabus/${match.params.course_id}`
            );
            setSyllabus(response.data.data);
            var arr = response.data.data.map((res) => res.lessons);
            var syl = response.data.data.map((syllabus) => syllabus.id);
            console.log(syl);
            fetchAllLessons(arr);
            fetchSyllabusLesson(arr, syl);
        } catch (e) {}
    };

    const fetchAllLessons = (response) => {
        setAllLessons([]);
        response.map((lesson) =>
            setAllLessons((allLessons) => [
                ...allLessons,
                ...lesson.map((les) => les.id),
            ])
        );
    };

    console.log(allLessons);

    const fetchSyllabusLesson = (response, syl) => {
        console.log(syl);
        setSyllabusLesson([]);
        response.map((lesson, i) =>
            setSyllabusLesson((syllabusLesson) => [
                ...syllabusLesson,
                {
                    syllabus: syl[i],
                    lessons: [...lesson.map((les) => les.id)],
                },
            ])
        );
        // setCourseProgress();
    };

    console.log(syllabusLesson);

    const fetchLesson = async () => {
        // setLesson(data[0].lessons);
        try {
            const response = await Axios.get(
                `${url}/view-single-lesson/${match.params.lesson_id}`
            );
            setLesson(response.data.data);
        } catch (e) {}
    };

    useEffect(() => {
        if (document.getElementById("learning")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("learning").offsetHeight,
            });
        }
    }, [currentPage]);

    const getCurrentPagePpt = () => {
        // var iFrame = document.getElementById("iframe_id");
        console.log(pptDoc.current);
        console.log(pptDoc.current.page);
    };

    const getCurrentPagePdf = () => {
        var object_id = document.getElementById("object_id");
        console.log(pdfDoc);
        console.log(object_id.contentDocument);
        if (object_id.contentDocument) {
            var currentPageNum =
                object_id.contentDocument.getElementById("pageNumber").value;
        }
        alert(currentPageNum);
    };

    const openBookmark = (type) => {
        setOpen(true);
        setModalType(type);
        if (type === "video") {
            setVideoBookmarkTime(
                Math.round(video.current.currentTime * 100) / 100
            );
        }
    };

    const handleLessonChange = (type) => {
        console.log(allLessons.indexOf(+match.params.lesson_id));
        console.log(allLessons.length);
        if (
            type === "plus" &&
            allLessons.indexOf(+match.params.lesson_id) >= allLessons.length - 1
        ) {
            const response = Axios.post(
                `${url}/course-completion`,
                { course_id: match.params.course_id },
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            history.push(`/learn/${match.params.course_id}/syllabus`);
        }
        if (
            type === "plus" &&
            allLessons.indexOf(+match.params.lesson_id) < allLessons.length - 1
        ) {
            console.log("inplus");
            // console.log(
            //     allLessons[allLessons.indexOf(+match.params.lesson_id)]
            // );
            history.push(
                `/learn/${match.params.course_id}/lesson/${
                    allLessons[allLessons.indexOf(+match.params.lesson_id) + 1]
                }`
            );
        }
        if (
            type === "minus" &&
            allLessons.indexOf(+match.params.lesson_id) > 0
        ) {
            console.log("inminus");

            history.push(
                `/learn/${match.params.course_id}/lesson/${+allLessons[
                    allLessons.indexOf(+match.params.lesson_id) - 1
                ]}`
            );
        }
    };

    // useEffect(() => {
    //     if (video.current) {
    //         console.log(video.current.currentTime);
    //         video.current.currentTime = key;
    //     }
    // });

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Learning | The Pen App</title>
                    <meta name="description" content="Learning page" />
                </Helmet>
                <section
                    className="our-team"
                    style={darkMode ? { background: "#121212" } : null}
                    id="learning"
                >
                    <div
                        className="container-fluid"
                        // style={{ marginTop: "40px" }}
                    >
                        <div className="row">
                            <div
                                className="col-lg-2 p0"
                                style={{
                                    boxShadow:
                                        "rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px",
                                }}
                                // style={
                                //     displaySide
                                //         ? {
                                //               position: "relative",
                                //               left: "0",
                                //               display: "block",
                                //               transition: "1s",
                                //           }
                                //         : {
                                //               position: "relative",
                                //               left: "-20%",
                                //               display: "none",
                                //               transition: "1s",
                                //           }
                                // }
                            >
                                {displaySide ? (
                                    <>
                                        <LearningSide
                                            id={id}
                                            setDisplaySide={setDisplaySide}
                                            displaySide={displaySide}
                                            tab="learn"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="sidemenu__fl"
                                            style={{ left: 0, right: "auto" }}
                                            onClick={() =>
                                                setDisplaySide(!displaySide)
                                            }
                                        >
                                            <i class="fas fa-chevron-right"></i>
                                        </div>
                                        <div
                                            style={{
                                                padding: "30px 20px 20px",
                                            }}
                                            className="course__sidebar"
                                        >
                                            {console.log(allCourseAsses)}
                                            {syllabus?.map(
                                                (course) => (
                                                    console.log(
                                                        course.lessons.length
                                                    ),
                                                    (
                                                        <>
                                                            <div className="lesson__title">
                                                                {course.title}
                                                            </div>
                                                            {course?.lessons
                                                                ?.length
                                                                ? course.lessons?.map(
                                                                      (
                                                                          lesson
                                                                      ) => (
                                                                          <Link
                                                                              to={`/learn/${match.params.course_id}/lesson/${lesson.id}`}
                                                                          >
                                                                              <div className=" course__disp">
                                                                                  <div className="col-md-12 p-0">
                                                                                      <div className="course__title">
                                                                                          <i className="fas fa-book mr-2"></i>
                                                                                          {
                                                                                              lesson.title
                                                                                          }
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          </Link>
                                                                      )
                                                                  )
                                                                : null}
                                                            {course?.assessments
                                                                ?.length
                                                                ? course.assessments?.map(
                                                                      (
                                                                          assess
                                                                      ) => (
                                                                          <div className="course__disp">
                                                                              <div className="col-md-12 p-0">
                                                                                  <div className="course__title">
                                                                                      <i className="fas fa-pen-fancy mr-2"></i>
                                                                                      {
                                                                                          assess.title
                                                                                      }
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                      )
                                                                  )
                                                                : null}
                                                        </>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div
                                className="col-lg-10"
                                style={{ minHeight: "85vh" }}
                            >
                                <div className="row">
                                    <div className="col-lg-12 p0">
                                        {/* {currentCourses?.map((course, i) => ( */}
                                        <div
                                            // key={i}
                                            className="courses_single_container"
                                        >
                                            <div className="cs_row_one">
                                                <div className="cs_ins_container">
                                                    <div className="courses_big_thumb">
                                                        <div
                                                            className="thumb flex-column"
                                                            style={{
                                                                height: "85vh",
                                                            }}
                                                        >
                                                            {lesson.file_type ===
                                                            "video" ? (
                                                                <div
                                                                    style={{
                                                                        margin: "auto",
                                                                        width: "70%",
                                                                    }}
                                                                >
                                                                    <video
                                                                        id="video"
                                                                        title="learning"
                                                                        className="iframe_video custom-iframe-width"
                                                                        src={
                                                                            lesson.course_file
                                                                        }
                                                                        ref={
                                                                            video
                                                                        }
                                                                        frameBorder="0"
                                                                        allowFullScreen
                                                                        controls
                                                                    >
                                                                        {/* <source
                                                                                src={
                                                                                    course.course_file
                                                                                }
                                                                                type="video/webm"
                                                                            ></source> */}
                                                                    </video>
                                                                    <div
                                                                        className="bookmark__float"
                                                                        onClick={
                                                                            // getCurrentTime
                                                                            () =>
                                                                                openBookmark(
                                                                                    "video"
                                                                                )
                                                                        }
                                                                    >
                                                                        <BookIcon />
                                                                    </div>
                                                                    {/* <button
                                                                        onClick={() =>
                                                                            openBookmark(
                                                                                "video"
                                                                            )
                                                                        }
                                                                    >
                                                                        Click
                                                                    </button> */}
                                                                </div>
                                                            ) : null}
                                                            {lesson.file_type ===
                                                            "ppt" ? (
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        marginTop:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    <iframe
                                                                        id="iframe_id"
                                                                        src={`//docs.google.com/gview?url=${lesson.course_file}&embedded=true`}
                                                                        ref={
                                                                            pptDoc
                                                                        }
                                                                        className="pdf__viewer"
                                                                    ></iframe>
                                                                    <div
                                                                        className="bookmark__float"
                                                                        onClick={
                                                                            // getCurrentPagePpt
                                                                            () =>
                                                                                openBookmark(
                                                                                    "ppt"
                                                                                )
                                                                        }
                                                                    >
                                                                        <BookIcon />
                                                                    </div>
                                                                    {/* <button
                                                                        onClick={() =>
                                                                            setCurrentTime()
                                                                        }
                                                                    >
                                                                        Click
                                                                    </button> */}
                                                                </div>
                                                            ) : null}
                                                            {lesson.file_type ===
                                                            "pdf" ? (
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        marginTop:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    <object
                                                                        id="object_id"
                                                                        data={`${lesson.course_file}#page=${key}`}
                                                                        ref={
                                                                            pdfDoc
                                                                        }
                                                                        className="pdf__viewer"
                                                                    ></object>
                                                                    <div
                                                                        className="bookmark__float"
                                                                        onClick={
                                                                            // getCurrentPagePdf
                                                                            () =>
                                                                                openBookmark(
                                                                                    "pdf"
                                                                                )
                                                                        }
                                                                    >
                                                                        <BookIcon />
                                                                    </div>
                                                                    {/* <button
                                                                        onClick={() =>
                                                                            setCurrentTime()
                                                                        }
                                                                    >
                                                                        Click
                                                                    </button> */}
                                                                </div>
                                                            ) : null}
                                                            <div className="d-flex justify-content-lg-between mt-3">
                                                                <div
                                                                    className="d-flex justify-content-end"
                                                                    style={{
                                                                        flexBasis:
                                                                            "55%",
                                                                    }}
                                                                >
                                                                    <button
                                                                        className="btn custom-button-control"
                                                                        style={{
                                                                            color: darkMode
                                                                                ? "white"
                                                                                : "black",
                                                                        }}
                                                                        // disabled={
                                                                        //     currentPage <=
                                                                        //     1
                                                                        //         ? true
                                                                        //         : false
                                                                        // }
                                                                        onClick={() =>
                                                                            // changePage(
                                                                            //     currentPage -
                                                                            //         1
                                                                            // )
                                                                            handleLessonChange(
                                                                                "minus"
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-caret-left fa-2x ml-1 mr-1"></i>
                                                                    </button>
                                                                    <button
                                                                        className="btn custom-button-control"
                                                                        style={{
                                                                            color: darkMode
                                                                                ? "white"
                                                                                : "black",
                                                                        }}
                                                                        // disabled={
                                                                        //     currentPage >=
                                                                        //     lesson.length
                                                                        //         ? true
                                                                        //         : false
                                                                        // }
                                                                        onClick={() =>
                                                                            // changePage(
                                                                            //     currentPage +
                                                                            //         1
                                                                            // )
                                                                            handleLessonChange(
                                                                                "plus"
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-caret-right fa-2x ml-1 mr-1"></i>
                                                                    </button>
                                                                </div>
                                                                {/* <div className="d-flex justify-content-end align-self-center">
                                                                    {" "}
                                                                   
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ))} */}
                                    </div>
                                    <BookmarkModal
                                        open={open}
                                        setOpen={setOpen}
                                        modalType={modalType}
                                        videoTime={videoBookmarkTime}
                                        currentSyllabus={currentSyllabus}
                                        match={match}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
});

export default Learning;
