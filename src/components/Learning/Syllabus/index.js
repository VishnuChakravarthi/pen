import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useStateValue } from "../../../StateProvider";
// import axios from "axios";
import { url } from "../../api";
import LearningSide from "../Utils/LearningSide";
import "./syllabus.css";
import { Helmet } from "react-helmet";
import history from "../../../history";
import Axios from "axios";
import { AirlineSeatReclineNormalRounded } from "@material-ui/icons";
import { colorCycle } from "precise-ui/dist/es6";

function Syllabus({ match }) {
    const [milestoneData, setMilestoneData] = useState([]);
    const [progress, setProgress] = useState("");
    const [colorBg, setColorBg] = useState(true);
    const [{ darkMode }, dispatch] = useStateValue();
    const token = localStorage.getItem("Token");
    const id = match.params.course_id;

    useEffect(() => {
        fetchMilestone();
        fetchTrackProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (document.getElementById("syllabus")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("syllabus").offsetHeight,
            });
        }
    }, [milestoneData]);

    const fetchMilestone = async () => {
        try {
            const response = await fetch(
                `${url}/syllabus/${match.params.course_id}`
            );
            var data = await response.json();
            console.log(data.data);
            setMilestoneData(data.data);
        } catch (e) {
            // if(!milestoneData)
            setMilestoneData([]);
        }
    };

    const fetchTrackProgress = async () => {
        try {
            const response = await Axios.get(
                `${url}/track/course/${match.params.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "asdasdasdasdsadasdsds");
            // console.log(response.data.data[0]);

            setProgress(response.data.data[0].syllabus_id);
            // return response.data.data[0];
        } catch (e) {}
    };

    // console.log(progress);

    const redirect = (lesson_id) => {
        history.push(`/learn/${match.params.course_id}/lesson/${lesson_id}`);
    };

    // const shadow = {
    //     boxShadow: "0px 1px 13px 1px rgba(0,0,0,0.03)",
    // };

    const milestoneRender = () => {
        if (milestoneData && milestoneData.length > 0) {
            var milestoneComponent = milestoneData.map((data, index) => {
                // {
                //     data.id === +progress && setColorBg(false);
                // }
                return (
                    <Card
                        key={index}
                        className={`col-sm-6 col-lg-3 m-2 p-0 syllabus ${
                            darkMode ? "shadow2" : "shadow1"
                        }`}
                        onClick={() => redirect(data.lessons[0].id)}
                        // style={index % 1 === 0 ? shadow1 : shadow2}
                        style={
                            darkMode
                                ? { background: "#1d1d1d", cursor: "pointer" }
                                : { cursor: "pointer" }
                        }
                    >
                        <div
                            style={
                                data.id <= +progress
                                    ? {
                                          background: "rgb(123 208 239)",
                                          padding: "10px",
                                          borderRadius: "15px",
                                          height: "100%",
                                      }
                                    : {
                                          background: "white",
                                          padding: "10px",
                                          borderRadius: "15px",
                                      }
                            }
                        >
                            <Card.Body className="">
                                <h3 className="text-center ">{data.title}</h3>
                                <Card.Text>
                                    <>{data.description}</>
                                </Card.Text>
                            </Card.Body>
                            <ul className="mb0 p-3">
                                <li>
                                    <span className="flaticon-appointment mr-3"></span>{" "}
                                    {data.duration}
                                </li>
                                <li>
                                    <span className="flaticon-clock mr-3"></span>
                                    {data.modules
                                        ? data.modules
                                        : "Not assigned"}
                                </li>
                                <li>
                                    <span className="fas fa-pen mr-3"></span>
                                    {data.project
                                        ? data.project
                                        : "Not assigned"}
                                </li>
                            </ul>
                        </div>
                    </Card>
                );
            });
        } else {
            return <h5>Nothing to show</h5>;
        }

        return (
            <div className="row justify-content-center">
                {milestoneComponent}
            </div>
        );
    };

    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                <Helmet>
                    <title>Syllabus | The Pen App</title>
                    <meta name="description" content="Syllabus page" />
                </Helmet>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    id="syllabus"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide id={id} tab="syllabus" />
                            </div>
                            <div
                                className="col-lg-10 text-center"
                                style={{ minHeight: "85vh" }}
                            >
                                <div className="main-title text-center mb-0">
                                    <h1
                                        className="mt0 pb-4 pt-4"
                                        style={
                                            darkMode ? { color: "white" } : null
                                        }
                                    >
                                        Syllabus
                                    </h1>
                                </div>
                                {milestoneRender()}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Syllabus;
