import React from "react";
import LearningSide from "../Utils/LearningSide";
import { useStateValue } from "../../../StateProvider";
import { useEffect } from "react";
import Axios from "axios";
import { url } from "../../api";
import { useState } from "react";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import "./Discussion.css";
import { Helmet } from "react-helmet";

function Discussion({ match }) {
    const [{ darkMode }, dispatch] = useStateValue();
    const [discussion, setDiscussion] = useState();
    const [answerTitle, setAnswerTitle] = useState("");
    const [answerDesc, setAnswerDesc] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDesc, setQuestionDesc] = useState("");
    const [showReply, setShowReply] = useState(0);

    const token = localStorage.getItem("pn_en");

    useEffect(() => {
        if (document.getElementById("discussion")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("discussion").offsetHeight,
            });
        }
        fetchDiscussions();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchDiscussions = async () => {
        try {
            const response = await Axios.get(
                `${url}/discussion/${match.params.course_id}`
            );

            console.log(response.data.data);
            setDiscussion(response.data.data);
        } catch (e) {}
    };

    const convertDate = (posted) => {
        let date = new Date(posted);
        // console.log(date);
    };

    const reply = async (id) => {
        console.log(id);
        const postdata = { answer: answerTitle, description: answerDesc };
        try {
            const response = await Axios.post(
                `${url}/subdiscussion/${id}`,
                postdata,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            swal("Answer posted successfully", {
                icon: "success",
            });
        } catch (e) {
            return swal("Not posted", {
                icon: "warning",
            });
        }
        setShowReply(0);
        setAnswerTitle("");
        setAnswerDesc("");
        fetchDiscussions();
    };

    const addQuestion = async () => {
        try {
            const postdata = {
                question: questionTitle,
                description: questionDesc,
            };
            try {
                const response = await Axios.post(
                    `${url}/discussion/${match.params.course_id}`,
                    postdata,
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                );
                swal("Question posted successfully", {
                    icon: "success",
                });
            } catch (e) {
                return swal("Not posted", {
                    icon: "warning",
                });
            }
        } catch (e) {}
        setQuestionTitle("");
        setQuestionDesc("");
        fetchDiscussions();
    };

    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                <Helmet>
                    <title>Discussion | The Pen App</title>
                    <meta name="description" content="Discussion page" />
                </Helmet>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    id="discussion"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide
                                    id={match.params.course_id}
                                    tab="discuss"
                                />
                            </div>

                            <div
                                className="col-lg-10"
                                style={{ minHeight: "85vh" }}
                            >
                                <h1
                                    className="text-center pb-4 pt-4"
                                    style={darkMode ? { color: "white" } : null}
                                >
                                    {" "}
                                    Discussions
                                </h1>
                                <div
                                    className="product_single_content style2 mb30"
                                    style={
                                        darkMode
                                            ? {
                                                  color: "white",
                                                  background: "#1d1d1d",
                                              }
                                            : null
                                    }
                                >
                                    <h4
                                        className="aii_title"
                                        style={
                                            darkMode ? { color: "white" } : null
                                        }
                                    >
                                        Questions
                                    </h4>
                                    <div className="mbp_pagination_comments">
                                        {discussion?.map((discuss, i) => (
                                            <div
                                                key={i}
                                                className="mbp_first media discuss__questions"
                                            >
                                                <Link
                                                    to={`/learn/${match.params.course_id}/discussion/${discuss.id}`}
                                                >
                                                    <div className="media-body ">
                                                        <h4
                                                            className="sub_title mt-0"
                                                            style={
                                                                darkMode
                                                                    ? {
                                                                          color: "white",
                                                                      }
                                                                    : null
                                                            }
                                                        >
                                                            <span className="mr-2">
                                                                <i
                                                                    class="fas fa-user"
                                                                    style={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                ></i>
                                                            </span>
                                                            {discuss.name}
                                                        </h4>
                                                        <p
                                                            className="sspd_postdate fz14"
                                                            href="#"
                                                        >
                                                            {convertDate(
                                                                discuss.created_at
                                                            )}
                                                        </p>
                                                        <p
                                                            className="fz15 mt20"
                                                            style={
                                                                darkMode
                                                                    ? {
                                                                          color: "white",
                                                                      }
                                                                    : null
                                                            }
                                                        >
                                                            <strong>
                                                                Q:{" "}
                                                                {
                                                                    discuss.question
                                                                }
                                                            </strong>
                                                        </p>
                                                        <p
                                                            className="fz15 mt25 mb25 d-flex"
                                                            style={
                                                                darkMode
                                                                    ? {
                                                                          color: "white",
                                                                          paddingLeft:
                                                                              "40px",
                                                                      }
                                                                    : {
                                                                          paddingLeft:
                                                                              "40px",
                                                                      }
                                                            }
                                                        >
                                                            <strong className="mr-2">
                                                                a:{" "}
                                                            </strong>{" "}
                                                            <div>
                                                                {
                                                                    discuss.description
                                                                }
                                                            </div>
                                                        </p>{" "}
                                                        {/* <div className="custom_hr style2"></div> */}
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                        <div className="text-center mt50 mb30">
                                            <button
                                                type="button"
                                                className="more-review-btn btn"
                                            >
                                                See more discussions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="product_single_content style2"
                                    style={
                                        darkMode
                                            ? { background: "#1d1d1d" }
                                            : null
                                    }
                                >
                                    <div className="mbp_comment_form style2">
                                        <h4
                                            style={
                                                darkMode
                                                    ? { color: "white" }
                                                    : null
                                            }
                                        >
                                            Add Questions
                                        </h4>

                                        <div className="comments_form">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="exampleInputName1"
                                                    style={
                                                        darkMode
                                                            ? { color: "white" }
                                                            : null
                                                    }
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    value={questionTitle}
                                                    onChange={(e) =>
                                                        setQuestionTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputName1"
                                                    aria-describedby="textHelp"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    htmlFor="exampleFormControlTextarea1"
                                                    style={
                                                        darkMode
                                                            ? { color: "white" }
                                                            : null
                                                    }
                                                >
                                                    Question
                                                </label>
                                                <textarea
                                                    value={questionDesc}
                                                    onChange={(e) =>
                                                        setQuestionDesc(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="6"
                                                    style={{ maxWidth: "100%" }}
                                                ></textarea>
                                            </div>
                                            <button
                                                // type="submit"
                                                onClick={() => addQuestion()}
                                                className="btn btn-thm discussion__btn"
                                            >
                                                Submit Question{" "}
                                                <span className="flaticon-right-arrow-1"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default Discussion;
