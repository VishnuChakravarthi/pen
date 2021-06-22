import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "../../api";
import { useStateValue } from "../../../StateProvider";
import LearningSide from "../Utils/LearningSide";
import history from "../../../history";
import "./bookmark.css";
import { Helmet } from "react-helmet";

function BookMark({ match }) {
    const [{ darkMode }, dispatch] = useStateValue();
    const [bookmarks, setBookmarks] = useState([]);
    const [syllabusArr, setSyllabusArr] = useState([]);
    const [videos, setVideos] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [ppt, setPpt] = useState([]);

    const token = localStorage.getItem("Token");

    useEffect(() => {
        if (document.getElementById("bookmark")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("bookmark").offsetHeight,
            });
        }
        fetchBookmarks();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchBookmarks = async () => {
        try {
            const response = await Axios.get(
                `${url}/bookmarks/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data);
            // fetchSyllabusBookmark(response.data.data);
            // setBookmarks(response.data.data);
            // let syllabusArrgg = response.data.data.map(
            //     (bookmark) => bookmark.syllabus_id
            // );
            // console.log(syllabusArrgg, "syllabusArrrrrgjkjklj");
            // setSyllabusArr([...syllabusArr, ...new Set(syllabusArrgg)]);
            // fetchItems([...syllabusArr, ...new Set(syllabusArrgg)]);
            setBookmarks(response.data.data.filter((data) => data !== null));
        } catch (e) {
            console.log(e);
        }
    };

    console.log(bookmarks);

    const fetchItems = (syllabus) => {
        console.log(syllabus, "asasdsadasldkasldksladkaslkd");
        syllabus.map(async (syllabusid) => {
            const bm = await Axios.get(`${url}/bookmark/${syllabusid}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(bm);
            // let videoArr = [];
            // let pdfArr = [];
            // let pptArr = [];
            let videoArr = bm.data.data.filter((b) => {
                return b.type === "video";
            });
            console.log(videoArr, "asdasdasdasdsadsadsdsdsdasdas");
            setVideos([...videos, videoArr]);
            let pdfArr = bm.data.data.filter((b) => {
                return b.type === "pdf";
            });
            setPdf([...pdf, pdfArr]);
            let pptArr = bm.data.data.filter((b) => {
                return b.type === "ppt";
            });
            setPpt([...ppt, pptArr]);
        });
    };

    console.log(videos);
    console.log(pdf);
    console.log(ppt);

    const learningArea = (lesson_id, key) => {
        dispatch({
            type: "SET_RESUME_POINT",
            key,
        });
        history.push(`lesson/${lesson_id}`);
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Bookmarks | The Pen App</title>
                    <meta name="description" content="Bookmarks page" />
                </Helmet>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    onScroll={(e) => console.log(e)}
                    id="bookmark"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide
                                    id={match.params.course_id}
                                    tab="bookmark"
                                />
                            </div>
                            <div
                                className="col-lg-10"
                                style={{ minHeight: "85vh" }}
                            >
                                <h1
                                    className="text-center pt-4 pb-4"
                                    style={darkMode ? { color: "white" } : null}
                                >
                                    Bookmarks
                                </h1>

                                <div className="main_blog_post_content">
                                    {bookmarks.map((bookmark, i) => (
                                        <div
                                            key={i}
                                            className="row event_lists p0 border1px"
                                            style={
                                                darkMode
                                                    ? { background: "#1d1d1d" }
                                                    : null
                                            }
                                        >
                                            <div className="col-lg-12 pl15-xl p0">
                                                <div
                                                    className="blog_grid_post style2 event_lists mb0 bgtrans"
                                                    style={{
                                                        overflowY: "scroll",
                                                        boxShadow:
                                                            "rgb(32 32 32 / 15%) 0px 0px 30px 0px",
                                                    }}
                                                >
                                                    <div
                                                        className={`details customPadding ${
                                                            darkMode
                                                                ? "det"
                                                                : ""
                                                        }`}
                                                        style={{
                                                            height: "auto",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <h2 className="m-0">
                                                                {bookmark.title}
                                                            </h2>
                                                            <span>
                                                                {" "}
                                                                -{" "}
                                                                {
                                                                    bookmark.description
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="bookmark__view">
                                                            <div>Videos</div>
                                                            <div className="row">
                                                                {bookmark.lessons.map(
                                                                    (
                                                                        lesson
                                                                    ) => (
                                                                        <div className="col-md-12">
                                                                            {lesson.type ===
                                                                                "video" && (
                                                                                <div
                                                                                    className="bookmark__card"
                                                                                    onClick={() =>
                                                                                        learningArea(
                                                                                            lesson.lesson_id,
                                                                                            lesson.syllabus_id,
                                                                                            lesson.key
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            lesson.bookmark_name
                                                                                        }{" "}
                                                                                    </div>
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            lesson.title
                                                                                        }{" "}
                                                                                        -{" "}
                                                                                        {
                                                                                            lesson.description
                                                                                        }{" "}
                                                                                    </div>
                                                                                    {/* -
                                                                                    <button
                                                                                        className="bookmark__btn"
                                                                                        onClick={() =>
                                                                                            learningArea(
                                                                                                lesson.lesson_id,
                                                                                                lesson.syllabus_id,
                                                                                                lesson.key
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            lesson.key
                                                                                        }
                                                                                    </button> */}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>

                                                            <div>Text</div>
                                                            <div className="row">
                                                                {bookmark.lessons.map(
                                                                    (
                                                                        lesson
                                                                    ) => (
                                                                        <div className="col-md-12">
                                                                            {lesson.type ===
                                                                                "pdf" && (
                                                                                <div
                                                                                    className="bookmark__card "
                                                                                    onClick={() =>
                                                                                        learningArea(
                                                                                            lesson.lesson_id,
                                                                                            lesson.syllabus_id,
                                                                                            lesson.key
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            lesson.bookmark_name
                                                                                        }{" "}
                                                                                    </div>
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            lesson.title
                                                                                        }{" "}
                                                                                        -{" "}
                                                                                        {
                                                                                            lesson.description
                                                                                        }{" "}
                                                                                    </div>
                                                                                    {/* -
                                                                                    <button
                                                                                        className="bookmark__btn"
                                                                                        onClick={() =>
                                                                                            learningArea(
                                                                                                lesson.lesson_id,
                                                                                                lesson.syllabus_id,
                                                                                                lesson.key
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            lesson.key
                                                                                        }
                                                                                    </button> */}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>

                                                            <div>PPT</div>
                                                            <div className="row">
                                                                {bookmark.lessons.map(
                                                                    (
                                                                        lesson
                                                                    ) => (
                                                                        <div className="col-md-12">
                                                                            {lesson.type ===
                                                                                "ppt" && (
                                                                                <div
                                                                                    className="bookmark__card"
                                                                                    onClick={() =>
                                                                                        learningArea(
                                                                                            lesson.lesson_id,
                                                                                            lesson.syllabus_id,
                                                                                            lesson.key
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {" "}
                                                                                        {
                                                                                            lesson.bookmark_name
                                                                                        }
                                                                                    </div>
                                                                                    <div
                                                                                        style={{
                                                                                            color: "black",
                                                                                            fontWeight:
                                                                                                "600",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            lesson.title
                                                                                        }{" "}
                                                                                        -{" "}
                                                                                        {
                                                                                            lesson.description
                                                                                        }{" "}
                                                                                    </div>
                                                                                    {/* -
                                                                                    <button
                                                                                        className="bookmark__btn"
                                                                                        onClick={() =>
                                                                                            learningArea(
                                                                                                lesson.lesson_id,
                                                                                                lesson.syllabus_id,
                                                                                                lesson.key
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            lesson.key
                                                                                        }
                                                                                    </button> */}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default BookMark;
