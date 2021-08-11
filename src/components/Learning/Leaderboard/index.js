import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import "./leaderboard.css";
import LearningSide from "../Utils/LearningSide";
import { useStateValue } from "../../../StateProvider";
import DonoutChart from "simple-react-donut-chart";
import "simple-react-donut-chart/src/style.css";
import { useEffect } from "react";
import { useState } from "react";
import { url } from "../../api";
import Axios from "axios";
import { Helmet } from "react-helmet";

const Leaderboard = ({ match }) => {
    const [{ darkMode }, dispatch] = useStateValue();
    const [per, setPer] = useState(0);
    const [perAs, setPerAs] = useState(0);
    const [ladder, setLadder] = useState();

    const [totalSyllabus, setTotalSyllabus] = useState([]);
    const [completedSyllabus, setCompletedSyllabus] = useState("");
    const [totalSylCompleted, setTotalSylCompleted] = useState("");
    const [allAssessments, setAllAssessments] = useState([]);
    const [completedAssessment, setCompletedAssessment] = useState("");
    const [totalAssesCompleted, setTotalAssesCompleted] = useState("");

    const rem = 0;

    const token = localStorage.getItem("pn_en");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // executeScroll();
        if (perAs < calculateAssessmentPercent()) {
            const interval = setInterval(() => {
                // console.log("per", per);
                setPerAs((perAs) => {
                    return perAs + 1;
                });
            }, 100);
            return () => clearInterval(interval);
        } else {
            return;
        }
    }, [perAs, allAssessments]);

    useEffect(() => {
        // console.log("yesssssssssssssssssssssssss");
        if (per < calculateCoursePercent()) {
            const interval = setInterval(() => {
                // console.log("per", per);
                if (per < 97) {
                    setPer((per) => {
                        return per + 3;
                    });
                }
                if (per >= 97) {
                    setPer((per) => {
                        return per + 1;
                    });
                }
            }, 100);
            return () => clearInterval(interval);
        } else {
            return;
        }
    }, [per, totalSyllabus]);

    useEffect(() => {
        if (document.getElementById("progress")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("progress").offsetHeight,
            });
        }
        fetchCourseProgress();
        fetchAssessmentProgress();
        fetchAllSyllabus();
        fetchLadder();
    }, []);

    useEffect(() => {
        fetchAllAssessments();
    }, [totalSyllabus]);

    const ladderRef = useRef(null);
    const laddermainRef = useRef(null);
    // if (ladderRef.current.onScroll()) {
    //     console.log(ladderRef.current.scrollTop);
    // }
    // const executeScroll = () => ladderRef.current.scrollIntoView();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchLadder = async () => {
        try {
            const response = await Axios.get(
                `${url}/ladder/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "sylabusssssssssssssss");
            setLadder(response.data.data);
        } catch (e) {}
    };

    const fetchAllSyllabus = async () => {
        try {
            const response = await Axios.get(
                `${url}/syllabus/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "sylabusssssssssssssss");
            setTotalSyllabus(response.data.data.map((syllabus) => syllabus.id));
        } catch (e) {}
    };

    const fetchAllAssessments = async () => {
        console.log(totalSyllabus);
        try {
            totalSyllabus.map(async (syllabus) => {
                const response = await Axios.get(
                    `${url}/view-assessment/${syllabus}`
                );
                console.log(response.data);
                if (response.data.error) {
                    setAllAssessments([]);
                } else {
                    setAllAssessments([
                        ...allAssessments,
                        ...response.data.data,
                    ]);
                }
            });
        } catch (e) {}
    };

    // console.log(allAssessments, "alllllllllllllllll");

    const fetchCourseProgress = async () => {
        try {
            const response = await Axios.get(
                `${url}/track/course/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "sdasdlsadjsldfjasldjas");
            setCompletedSyllabus(response.data.data[0].syllabus_id);
        } catch (e) {}
    };

    const fetchAssessmentProgress = async () => {
        try {
            const response = await Axios.get(
                `${url}/track/assessment/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "Assessment");
            if (!response.data.error) {
                setCompletedAssessment(response.data.data[0].assessment_id);
            } else {
                setCompletedAssessment("");
            }
        } catch (e) {}
    };

    const calculateCoursePercent = () => {
        console.log("totalsyllabus", totalSyllabus);
        const index = totalSyllabus.indexOf(completedSyllabus);
        const left = totalSyllabus.splice(0, index);
        const totalLen = totalSyllabus.length;
        const completed = totalLen - left.length;
        setTotalSylCompleted(completed);
        const completedPercentage = (completed * 100) / totalLen;
        return completedPercentage;
    };

    const calculateAssessmentPercent = () => {
        console.log("completedAssessment", completedAssessment);
        const index = allAssessments.indexOf(completedAssessment);
        console.log("index", index);

        const left = allAssessments.splice(0, index);
        const totalLen = allAssessments.length;
        const completed = totalLen - left.length;
        setTotalAssesCompleted(completed);
        const completedPercentage = (completed * 100) / totalLen;
        return completedPercentage;
    };

    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                <Helmet>
                    <title>Leaderboard | The Pen App</title>
                    <meta name="description" content="Leaderboard page" />
                </Helmet>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    id="progress"
                >
                    <div
                        className="container-fluid"
                        // style={{ marginTop: "40px" }}
                    >
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide
                                    id={match.params.course_id}
                                    tab="progress"
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
                                    Leaderboard
                                </h1>
                                <div
                                    className="container"
                                    style={{ width: "80%" }}
                                >
                                    <div className="row">
                                        <Card
                                            className="p-2 mr-3 position-relative mb-3"
                                            style={
                                                darkMode
                                                    ? {
                                                          background: "#1d1d1d",
                                                          width: "32%",
                                                          boxShadow:
                                                              "0 0 black",
                                                      }
                                                    : { width: "32%" }
                                            }
                                        >
                                            <Card.Body
                                                className={
                                                    darkMode ? "cardhead" : null
                                                }
                                            >
                                                <h2 className="text-center ">
                                                    Course Completion
                                                </h2>

                                                <div className="course__completion">
                                                    {/* <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div class="diwali-bottle-wrpper">
                                                    <div class="diwali-bottle">
                                                        <div class="bottle-shadow"></div>
                                                    </div>
                                                </div>
                                            </div> */}
                                                    <div
                                                        className="percentage__loader"
                                                        style={{
                                                            background: `linear-gradient(to top, #00b0f0 ${per}%, white ${rem}%) bottom`,
                                                            textAlign: "center",
                                                            position:
                                                                "absolute",
                                                            width: "70%",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                darkMode
                                                                    ? "/images/ink.png"
                                                                    : "/images/ink2.png"
                                                            }
                                                            alt="inkfill"
                                                            // width="90%"
                                                        />

                                                        <div className="percentage__display">
                                                            <p>{per}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>

                                        <Card
                                            className="p-2 mr-3 mb-3"
                                            style={
                                                darkMode
                                                    ? {
                                                          background: "#1d1d1d",
                                                          width: "32%",
                                                          boxShadow:
                                                              "0 0 black",
                                                      }
                                                    : { width: "32%" }
                                            }
                                        >
                                            <Card.Body
                                                className={
                                                    darkMode ? "cardhead" : null
                                                }
                                            >
                                                <h2 className="text-center">
                                                    Modules
                                                </h2>

                                                <div>
                                                    <div className="donut__container">
                                                        <DonoutChart
                                                            percentage={per}
                                                            colorOn="#f1f1f1"
                                                            colorOff="#4ada41fc"
                                                            labelOff="Me"
                                                            labelOn="You"
                                                            circleColor={
                                                                darkMode
                                                                    ? "#1d1d1d"
                                                                    : "#ffffff"
                                                            }
                                                            baseClass="customize"
                                                            textStyle={{
                                                                color: "#ff0000",
                                                            }}
                                                            labelStyle={{
                                                                off: {
                                                                    display:
                                                                        "none",
                                                                },
                                                                on: {
                                                                    display:
                                                                        "none",
                                                                },
                                                            }}
                                                        />
                                                        <div className="donut__label">
                                                            <p>
                                                                {
                                                                    totalSylCompleted
                                                                }
                                                                /
                                                                {
                                                                    totalSyllabus.length
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="p-2 mb-3"
                                            style={
                                                darkMode
                                                    ? {
                                                          background: "#1d1d1d",
                                                          width: "32%",
                                                          boxShadow:
                                                              "0 0 black",
                                                      }
                                                    : { width: "32%" }
                                            }
                                        >
                                            <Card.Body
                                                className={
                                                    darkMode ? "cardhead" : null
                                                }
                                            >
                                                <h2 className="text-center">
                                                    Assessment
                                                </h2>

                                                <div>
                                                    <div className="donut__container">
                                                        <DonoutChart
                                                            percentage={perAs}
                                                            colorOn="#96d4eafc"
                                                            colorOff="#00b0f0"
                                                            labelOff="Me"
                                                            labelOn="You"
                                                            circleColor={
                                                                darkMode
                                                                    ? "#1d1d1d"
                                                                    : "#ffffff"
                                                            }
                                                            baseClass="customize"
                                                            textStyle={{
                                                                color: "#ff0000",
                                                            }}
                                                            labelStyle={{
                                                                off: {
                                                                    fontSize:
                                                                        "16px",
                                                                },
                                                                on: {
                                                                    fontSize:
                                                                        "18px",
                                                                },
                                                            }}
                                                        />
                                                        <div className="donut__label">
                                                            <p>
                                                                {
                                                                    totalAssesCompleted
                                                                }
                                                                /
                                                                {
                                                                    allAssessments.length
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="p-2 ladder mr-3 mb-3"
                                            style={
                                                darkMode
                                                    ? {
                                                          background: "#1d1d1d",
                                                          width: "32%",
                                                          boxShadow:
                                                              "0 0 black",
                                                      }
                                                    : { width: "32%" }
                                            }
                                        >
                                            <Card.Body
                                                className={
                                                    darkMode ? "cardhead" : null
                                                }
                                            >
                                                <h2 className="text-center">
                                                    Ladder
                                                </h2>

                                                <div>
                                                    <div ref={laddermainRef}>
                                                        {ladder?.map(
                                                            (data, i) => {
                                                                if (data.you) {
                                                                    return (
                                                                        <div
                                                                            ref={
                                                                                ladderRef
                                                                            }
                                                                            key={
                                                                                i
                                                                            }
                                                                            style={{
                                                                                display:
                                                                                    "flex",
                                                                            }}
                                                                        >
                                                                            <div className="ladder__rank highlighted">
                                                                                {i +
                                                                                    1}
                                                                            </div>
                                                                            <div
                                                                                className="ladder__rank__display"
                                                                                style={
                                                                                    darkMode
                                                                                        ? {
                                                                                              color: "#ffffff",
                                                                                          }
                                                                                        : {
                                                                                              color: "black",
                                                                                          }
                                                                                }
                                                                            >
                                                                                {i +
                                                                                    1}
                                                                                /50
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            className="ladder__rank"
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {i +
                                                                                1}
                                                                        </div>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="p-2 mb-3"
                                            style={
                                                darkMode
                                                    ? {
                                                          background: "#1d1d1d",
                                                          width: "32%",
                                                          boxShadow:
                                                              "0 0 black",
                                                      }
                                                    : { width: "32%" }
                                            }
                                        >
                                            <Card.Body
                                                className={
                                                    darkMode ? "cardhead" : null
                                                }
                                            >
                                                <h2 className="text-center">
                                                    Skills Developed
                                                </h2>

                                                <div>
                                                    <span className="badge badge-custom-course badge-custom-course-leader m-2">
                                                        HTML
                                                    </span>
                                                    <br />
                                                    <span className="badge badge-custom-course badge-custom-course-leader m-2">
                                                        CSS
                                                    </span>
                                                    <br />
                                                    <span className="badge badge-custom-course badge-custom-course-leader m-2">
                                                        React
                                                    </span>
                                                    <br />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
};

export default Leaderboard;
