import React from "react";
import LearningSide from "../../Utils/LearningSide";
import { useStateValue } from "../../../../StateProvider";
import { useEffect } from "react";
import Axios from "axios";
import { url } from "../../../api";
import { useState } from "react";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import "../Discussion.css";
import { Link } from "react-router-dom";

function Replies({ match }) {
    const [{ darkMode }, dispatch] = useStateValue();
    const [discussion, setDiscussion] = useState({});
    // const [subDiscussion, setSubDiscussion] = useState([]);
    const [answerTitle, setAnswerTitle] = useState("");
    const [answerDesc, setAnswerDesc] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDesc, setQuestionDesc] = useState("");
    const [showReply, setShowReply] = useState(0);

    const token = localStorage.getItem("Token");

    useEffect(() => {
        if (document.getElementById("discussion")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("replies").offsetHeight,
            });
        }
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        try {
            const response = await Axios.get(
                `${url}/discussion/${match.params.course_id}`
            );

            console.log(response.data.data);
            console.log(match.params.discuss_id);
            setDiscussion(
                ...response.data.data.filter((discuss) => {
                    console.log(discuss.id);
                    return discuss.id === +match.params.discuss_id;
                })
            );
            // setSubDiscussion((discussion) => discussion.sub_discussion);
        } catch (e) {}
    };

    console.log(discussion);

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    id="replies"
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
                                    <Link
                                        to={`/learn/${match.params.course_id}/discussion`}
                                    >
                                        <i className="fas fa-arrow-left back__arrow"></i>
                                    </Link>{" "}
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
                                        {/* {discussion?.map((discuss, i) => ( */}
                                        <div
                                            // key={i}
                                            className="mbp_first media"
                                        >
                                            {/* <img
                                                src="images/resource/review1.png"
                                                className="mr-3"
                                                alt="review1.png"
                                            /> */}
                                            <div className="media-body">
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
                                                    {discussion.name}
                                                </h4>
                                                <p
                                                    className="sspd_postdate fz14"
                                                    href="#"
                                                >
                                                    {convertDate(
                                                        discussion.created_at
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
                                                        Q: {discussion.question}
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
                                                        {discussion.description}
                                                    </div>
                                                </p>
                                                <div
                                                    className="ssp_reply float-right discuss__reply__btn"
                                                    style={{
                                                        display:
                                                            showReply ===
                                                            discussion.id
                                                                ? "none"
                                                                : "block",
                                                    }}
                                                    onClick={() =>
                                                        setShowReply(
                                                            discussion.id
                                                        )
                                                    }
                                                >
                                                    <span className="flaticon-consulting-message"></span>
                                                    <span className="pl10">
                                                        Reply
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        display:
                                                            showReply ===
                                                            discussion.id
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
                                                    <div className="reply__container">
                                                        <div className="reply__form">
                                                            <h4>Answer</h4>
                                                            {/* <div className="form-group">
                                                                <label
                                                                    htmlFor="exampleInputName1"
                                                                    style={
                                                                        darkMode
                                                                            ? {
                                                                                  color:
                                                                                      "white",
                                                                              }
                                                                            : null
                                                                    }
                                                                >
                                                                    Title
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="exampleInputName1"
                                                                    aria-describedby="textHelp"
                                                                    style={{
                                                                        maxWidth:
                                                                            "100%",
                                                                    }}
                                                                    value={
                                                                        answerTitle
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswerTitle(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div> */}
                                                            <div className="form-group">
                                                                {/* <label
                                                                    htmlFor="exampleFormControlTextarea1"
                                                                    style={
                                                                        darkMode
                                                                            ? {
                                                                                  color:
                                                                                      "white",
                                                                              }
                                                                            : null
                                                                    }
                                                                >
                                                                    Question
                                                                </label> */}
                                                                <textarea
                                                                    className="form-control"
                                                                    id="exampleFormControlTextarea1"
                                                                    rows="6"
                                                                    style={{
                                                                        maxWidth:
                                                                            "100%",
                                                                    }}
                                                                    value={
                                                                        answerDesc
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswerDesc(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                ></textarea>
                                                            </div>
                                                            <div className="reply__btns__div">
                                                                <button
                                                                    onClick={() =>
                                                                        setShowReply(
                                                                            false
                                                                        )
                                                                    }
                                                                    className="btn btn-thm discussion__btn discussion__btn__cancel"
                                                                >
                                                                    Cancel
                                                                    {/* <span className="flaticon-right-arrow-1"></span> */}
                                                                </button>
                                                                <button
                                                                    className="btn btn-thm discussion__btn"
                                                                    onClick={() =>
                                                                        reply(
                                                                            discussion.id
                                                                        )
                                                                    }
                                                                >
                                                                    Submit
                                                                    Answer{" "}
                                                                    {/* <span className="flaticon-right-arrow-1"></span> */}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="custom_hr style2"></div> */}
                                                {discussion.sub_discussion?.map(
                                                    (subdiscuss, i) => (
                                                        <div
                                                            key={i}
                                                            className="mbp_sub media"
                                                            // style={{
                                                            //     marginLeft:
                                                            //         "70px",
                                                            // }}
                                                        >
                                                            {/* <img
                                                                src="images/resource/review1.png"
                                                                className="mr-3"
                                                                alt="review1.png"
                                                            /> */}

                                                            <div className="media-body pt20">
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
                                                                    {
                                                                        subdiscuss.name
                                                                    }
                                                                </h4>
                                                                <p className="sspd_postdate fz14">
                                                                    {convertDate(
                                                                        subdiscuss.created_at
                                                                    )}
                                                                </p>
                                                                <p
                                                                    className="fz15 mt20 mb20"
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
                                                                            subdiscuss.answer
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
                                                                            subdiscuss.description
                                                                        }
                                                                    </div>
                                                                </p>
                                                                {/* <p
                                                                    className="fz15 mt25"
                                                                    style={
                                                                        darkMode
                                                                            ? {
                                                                                  color: "white",
                                                                              }
                                                                            : null
                                                                    }
                                                                >
                                                                    {
                                                                        subdiscuss.description
                                                                    }
                                                                </p>{" "} */}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* <div className="custom_hr"></div>

                                        <div className="custom_hr style3"></div> */}
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
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default Replies;
