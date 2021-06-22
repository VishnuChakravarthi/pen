import React, { useEffect, useState } from "react";
import "../Learning.css";
import { Link } from "react-router-dom";
import LearningSide from "../Utils/LearningSide";
import { useStateValue } from "../../../StateProvider";
import { url } from "../../api";
import Axios from "axios";
import { Helmet } from "react-helmet";

function Lesson({ match }) {
    const [userCourses, setUserCourses] = useState([]);
    const [{ darkMode }, dispatch] = useStateValue();

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 1;
    // const headerBg = {
    //     background: "rgba(0,0,0,0.7)",
    // };

    // const [height, setHeight] = useState("50vh");
    const id = match.params.course_id;

    useEffect(() => {
        // const iframeHeight = document.querySelector("iframe").offsetHeight;
        fetchUserCourses();

        // setHeight(iframeHeight);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchUserCourses = async () => {
        try {
            const response = await Axios.get(`${url}/my-profile`, {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("Token")}`,
                },
            });
            console.log(response.data.data.courses);
            setUserCourses(response.data.data.courses);
        } catch (e) {}
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = userCourses?.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    const changePage = (number) => {
        // console.log(e.target.id);
        setCurrentPage(number);
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Learning | The Pen App</title>
                    <meta name="description" content="Learning page" />
                </Helmet>
                <section
                    className="our-team "
                    style={darkMode ? { background: "#151515" } : null}
                >
                    <div
                        className="container-fluid"
                        // style={{ marginTop: "40px" }}
                    >
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide id={id} tab="" />
                            </div>
                            <div className="col-lg-10">
                                <div className="row">
                                    <div className="col-lg-12">
                                        {currentCourses?.map((courses, i) => (
                                            <div
                                                key={i}
                                                className="courses_single_container"
                                            >
                                                <div className="cs_row_one">
                                                    <div className="cs_ins_container">
                                                        <div className="courses_big_thumb">
                                                            <div className="thumb flex-column">
                                                                <iframe
                                                                    title="learning"
                                                                    className="iframe_video custom-iframe-width"
                                                                    // src="//www.youtube.com/embed/57LQI8DKwec"
                                                                    src={
                                                                        courses.intro_file
                                                                    }
                                                                    frameBorder="0"
                                                                    allowFullScreen
                                                                ></iframe>
                                                                <div className="d-flex justify-content-lg-between mt-3">
                                                                    <div className="d-flex justify-content-end flex-basis-50">
                                                                        <button
                                                                            className="btn custom-button-control"
                                                                            onClick={() =>
                                                                                changePage(
                                                                                    currentPage -
                                                                                        1
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fas fa-caret-left fa-2x ml-1 mr-1"></i>
                                                                        </button>
                                                                        <button className="btn custom-button-control">
                                                                            <i
                                                                                className="fas fa-caret-right fa-2x ml-1 mr-1"
                                                                                onClick={() =>
                                                                                    changePage(
                                                                                        currentPage +
                                                                                            1
                                                                                    )
                                                                                }
                                                                            ></i>
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Lesson;
