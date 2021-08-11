import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Learning/Learning.css";

const CourseVid = () => {
    const [dark, setDark] = useState("false");
    const [sharp, setSharp] = useState("");
    const [courseUrl, setCourseUrl] = useState([
        "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        "https://www.youtube.com/watch?v=HWTF-oi70e4",
        "https://www.youtube.com/watch?v=pBD1C5JxRho",
    ]);
    const [i, setI] = useState(0);
    const [video, setVideo] = useState(courseUrl[i]);
    const changeVideo = (val) => {
        setVideo(courseUrl[i - val]);
        setI(i - val);
    };

    const getlesson = async () => {
        const token = localStorage.getItem("pn_en");
        const syllabus_id = 1;
        await axios({
            method: "get",
            url: `http://epen.nyxwolves.tech/api/view-lessons/${syllabus_id}`,
            headers: { Authorization: `Basic ${token}` },
        })
            .then(async (res) => {
                const data = res.data.data;
                // Get lesson id and get syllabus sharp script by using setSharp()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getlesson();
    }, []);
    return (
        <React.Fragment>
            <div
                className="container"
                style={{
                    background: dark === "true" && "black",
                    height: "100%",
                }}
            >
                <div className="video-container text-center">
                    <div className="d-flex justify-content-end col-sm-11">
                        <button
                            className={`btn ${
                                dark === "true"
                                    ? `custom-button-control-dark`
                                    : `custom-button-control-sun`
                            }`}
                            disabled={i === 0}
                            onClick={() => changeVideo(1)}
                        >
                            <i class="fas fa-caret-left fa-2x ml-1 mr-1"></i>
                        </button>
                        <button
                            className={`btn ${
                                dark === "true"
                                    ? `custom-button-control-dark`
                                    : `custom-button-control-sun`
                            }`}
                            disabled={i === courseUrl.length - 1}
                            onClick={() => changeVideo(-1)}
                        >
                            <i class="fas fa-caret-right fa-2x ml-1 mr-1"></i>
                        </button>
                    </div>
                    <div style={{ marginTop: "-40px" }}>
                        <ReactPlayer
                            url={video}
                            controls={true}
                            width="80%"
                            style={{ margin: "3rem auto 0.5rem" }}
                        />
                    </div>
                </div>
                <div
                    className="container px-5 mt-3 mx-3"
                    style={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    {sharp}
                </div>
            </div>
        </React.Fragment>
    );
};

export default CourseVid;
