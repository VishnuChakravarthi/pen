import React, { useEffect, useState } from "react";
import { url } from "../../api";
import { Link } from "react-router-dom";
import "react-bootstrap";
import LearningSide from "../Utils/LearningSide";
import { useStateValue } from "../../../StateProvider";
import "./Assessments.css";
import { Helmet } from "react-helmet";
import { Card } from "react-bootstrap";

function Asses({ match }) {
    const [data, setData] = useState([]);
    const [results, setResults] = useState({});
    const [height, setHeight] = useState(false);
    const [assessmentLabel, setAssessmentLabel] = useState("assess0");
    const token = localStorage.getItem("Token");

    const [{ darkMode }, dispatch] = useStateValue();

    const course_id = match.params.course_id;

    useEffect(() => {
        fetchData();
        // fetchMilestone();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (document.getElementById("assessement")) {
            dispatch({
                type: "SET_SCROLL_POSITION",
                scroll: document.getElementById("assessement").offsetHeight,
            });
        }
    }, [data]);

    // const fetchMilestone = async () => {
    //     try {
    //         const response = await fetch(
    //             `${url}/syllabus/${match.params.course_id}`
    //         );
    //         var data = await response.json();
    //         console.log(data.data);
    //         setMilestoneData(data.data);
    //     } catch (e) {
    //         // if(!milestoneData)
    //         setMilestoneData([]);
    //     }
    // };

    // const heightCheck = () => {
    //     if (document.getElementById("assessement")) {
    //         dispatch({
    //             type: "SET_SCROLL_POSITION",
    //             scroll: document.getElementById("assessement").offsetHeight,
    //         });
    //     }
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/view-assessment/${course_id}`);
            const response2 = await fetch(`${url}/result/1`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });

            const data = await response.json();
            const data2 = await response2.json();

            setData(data.data);
            setResults(data2.data);
        } catch (e) {}
    };

    console.log(data, "assess");

    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                <Helmet>
                    <title>Assessments | The Pen App</title>
                    <meta name="description" content="Assessments page" />
                </Helmet>
                <section
                    className="blog_post_container"
                    style={darkMode ? { background: "#121212" } : null}
                    id="assessement"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2 p0">
                                <LearningSide id={course_id} tab="assess" />
                            </div>

                            <div
                                className="col-lg-10"
                                // style={{ marginLeft: "240px" }}
                                style={{ minHeight: "85vh" }}
                            >
                                <h1
                                    className="text-center pb-4 pt-4"
                                    style={
                                        darkMode
                                            ? {
                                                  color: "white",
                                              }
                                            : null
                                    }
                                >
                                    Assessments
                                </h1>
                                <div
                                    className="accordion"
                                    id="accordionExample"
                                >
                                    {data?.map((item, i) => (
                                        <div
                                            key={i}
                                            className="card"
                                            style={
                                                darkMode
                                                    ? {
                                                          background:
                                                              "transparent",
                                                      }
                                                    : null
                                            }
                                        >
                                            <div
                                                className={`card-header assess_trans ${
                                                    assessmentLabel ===
                                                    `assess${i}`
                                                        ? `assess__selected`
                                                        : ""
                                                }`}
                                                id={`headingAsses${i}`}
                                                data-toggle="collapse"
                                                data-target={`#collapseAssess${i}`}
                                                aria-expanded="true"
                                                aria-controls={`collapseOneAssess${i}`}
                                            >
                                                <h2
                                                    className="mb-0 d-flex"
                                                    onClick={() =>
                                                        setAssessmentLabel(
                                                            assessmentLabel ===
                                                                `assess${i}`
                                                                ? ""
                                                                : `assess${i}`
                                                        )
                                                    }
                                                >
                                                    <button
                                                        className="btn btn-link btn-block text-left"
                                                        type="button"
                                                    >
                                                        {item.syllabus.title}
                                                    </button>
                                                    <i class="fas fa-angle-down"></i>
                                                </h2>
                                                {/* {assessmentLabel ===
                                                    `assess${i}` && (
                                                    <i class="fas fa-angle-down"></i>
                                                )}
                                                {assessmentLabel === `` && (
                                                    <i class="fas fa-angle-right"></i>
                                                )} */}
                                            </div>
                                            <div
                                                id={`collapseAssess${i}`}
                                                className="collapse show"
                                                aria-labelledby={`headingAsses${i}`}
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    <div className="main_blog_post_content">
                                                        <div
                                                            className="row event_lists"
                                                            style={
                                                                darkMode
                                                                    ? {
                                                                          background:
                                                                              "#1d1d1d",
                                                                      }
                                                                    : {
                                                                          boxShadow:
                                                                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                                                      }
                                                            }
                                                        >
                                                            <div className="col-xl-5 pr15-xl pr0">
                                                                <div
                                                                    className="blog_grid_post event_lists"
                                                                    style={
                                                                        darkMode
                                                                            ? {
                                                                                  background:
                                                                                      "#1d1d1d",
                                                                                  paddingBottom:
                                                                                      "0px",
                                                                                  marginBottom:
                                                                                      "0px",
                                                                              }
                                                                            : {
                                                                                  boxShadow:
                                                                                      "none",
                                                                                  paddingBottom:
                                                                                      "0px",
                                                                                  marginBottom:
                                                                                      "0px",
                                                                              }
                                                                    }
                                                                >
                                                                    <div className="">
                                                                        <Card
                                                                            // key={index}
                                                                            className={`col-sm-12 col-lg-12 m-2 p-0 syllabus ${
                                                                                darkMode
                                                                                    ? "shadow2"
                                                                                    : "shadow1"
                                                                            }`}
                                                                            // onClick={() => redirect(data.lessons[0].id)}
                                                                            // style={index % 1 === 0 ? shadow1 : shadow2}
                                                                            style={
                                                                                darkMode
                                                                                    ? {
                                                                                          background:
                                                                                              "#1d1d1d",
                                                                                          cursor: "pointer",
                                                                                          border: "none",
                                                                                          borderRight:
                                                                                              "2px solid",
                                                                                      }
                                                                                    : {
                                                                                          cursor: "pointer",
                                                                                          border: "none",
                                                                                          borderRight:
                                                                                              "2px solid",
                                                                                      }
                                                                            }
                                                                        >
                                                                            <Card.Body className="">
                                                                                <h3 className="text-center ">
                                                                                    {
                                                                                        item
                                                                                            .syllabus
                                                                                            .title
                                                                                    }
                                                                                </h3>
                                                                                <Card.Text className="text-center">
                                                                                    <>
                                                                                        {
                                                                                            item
                                                                                                .syllabus
                                                                                                .description
                                                                                        }
                                                                                    </>
                                                                                </Card.Text>
                                                                            </Card.Body>
                                                                            <ul className="mb0 p-3">
                                                                                <li>
                                                                                    <span className="flaticon-appointment mr-3"></span>{" "}
                                                                                    {
                                                                                        item
                                                                                            .syllabus
                                                                                            .duration
                                                                                    }
                                                                                </li>
                                                                                <br />
                                                                                <li>
                                                                                    <span className="flaticon-clock mr-3"></span>
                                                                                    {data.modules
                                                                                        ? data.modules
                                                                                        : "Not assigned"}
                                                                                </li>
                                                                                <br />
                                                                                <li>
                                                                                    <span className="fas fa-pen mr-3"></span>
                                                                                    {data.project
                                                                                        ? data.project
                                                                                        : "Not assigned"}
                                                                                </li>
                                                                            </ul>
                                                                            {/* </div> */}
                                                                        </Card>
                                                                        {/* <div className="post_date">
                                                                            <h2>
                                                                                28
                                                                            </h2>{" "}
                                                                            <span>
                                                                                DECEMBER
                                                                            </span>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 pl15-xl pl0">
                                                                <div
                                                                    className="blog_grid_post style2 event_lists h-100"
                                                                    style={
                                                                        darkMode
                                                                            ? {
                                                                                  background:
                                                                                      "#1d1d1d",
                                                                                  paddingBottom:
                                                                                      "0px",
                                                                                  marginBottom:
                                                                                      "0px",
                                                                              }
                                                                            : {
                                                                                  boxShadow:
                                                                                      "none",
                                                                                  paddingBottom:
                                                                                      "0px",
                                                                                  marginBottom:
                                                                                      "0px",
                                                                              }
                                                                    }
                                                                >
                                                                    <div className="details h-100 p-3">
                                                                        <h3
                                                                            style={
                                                                                darkMode
                                                                                    ? {
                                                                                          color: "white",
                                                                                          padding:
                                                                                              "20px 0px",
                                                                                      }
                                                                                    : {
                                                                                          padding:
                                                                                              "20px 0px",
                                                                                      }
                                                                            }
                                                                        >
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </h3>
                                                                        <ul className="mb0">
                                                                            <li>
                                                                                {/* <a href="#"> */}
                                                                                <span className="flaticon-clock"></span>
                                                                                No
                                                                                of
                                                                                Questions
                                                                                :{" "}
                                                                                {
                                                                                    item.questions
                                                                                }
                                                                                {/* </a> */}
                                                                            </li>
                                                                            <li>
                                                                                {/* <a href="#"> */}
                                                                                <span className="flaticon-placeholder"></span>
                                                                                Total
                                                                                points
                                                                                :{" "}
                                                                                {
                                                                                    item.id
                                                                                }
                                                                                {/* </a> */}
                                                                            </li>
                                                                            <li>
                                                                                {/* <a href="#"> */}
                                                                                <span className="flaticon-placeholder"></span>
                                                                                No
                                                                                of
                                                                                Attempts
                                                                                :{" "}
                                                                                {console.log(
                                                                                    results
                                                                                )}
                                                                                {!results
                                                                                    ? 0
                                                                                    : results?.attempts}
                                                                                {/* </a> */}
                                                                            </li>
                                                                        </ul>
                                                                        <br />
                                                                        <br />
                                                                        <div className="d-flex  justify-content-end">
                                                                            {/* <button className="btn btn-secondary">
                                                                                Re-Take
                                                                            </button> */}
                                                                            {/* {results &&
                                                                            results?.attempts <=
                                                                                3 ? ( */}
                                                                            {!results ||
                                                                            results?.attempts <=
                                                                                1 ? (
                                                                                <Link
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        !item ||
                                                                                        !item.id
                                                                                            ? e.preventDefault()
                                                                                            : ""
                                                                                    }
                                                                                    to={`/learn/${course_id}/assessment/${item.id}`}
                                                                                >
                                                                                    <button className="btn btn-primary">
                                                                                        Take
                                                                                        up
                                                                                    </button>
                                                                                </Link>
                                                                            ) : (
                                                                                <Link
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        !item ||
                                                                                        !item.id
                                                                                            ? e.preventDefault()
                                                                                            : ""
                                                                                    }
                                                                                    to={`/learn/${course_id}/assessment/${item.id}`}
                                                                                >
                                                                                    <button className="btn btn-primary">
                                                                                        Retake
                                                                                    </button>
                                                                                </Link>
                                                                            )}
                                                                            {/* ) : (
                                                                                <span>
                                                                                    Max
                                                                                    attempts
                                                                                    reached!
                                                                                </span>
                                                                            )} */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div
                                        className="card"
                                        style={
                                            darkMode
                                                ? {
                                                      background: "#151515",
                                                  }
                                                : null
                                        }
                                    > */}
                                    {/* <div
                                            className="card-header"
                                            id="headingTwo"
                                        >
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    MileStone 1
                                                </button>
                                            </h2>
                                        </div> */}
                                    {/* <div
                                            id="collapseTwo"
                                            className="collapse"
                                            aria-labelledby="headingTwo"
                                            data-parent="#accordionExample"
                                            onClick={() =>
                                                setHeight(
                                                    !height ? true : false
                                                )
                                            }
                                        >
                                            <div className="card-body">
                                                Anim pariatur cliche
                                                reprehenderit, enim eiusmod high
                                                life accusamus terry richardson
                                                ad squid. 3 wolf moon officia
                                                aute, non cupidatat skateboard
                                                dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch
                                                3 wolf moon tempor, sunt aliqua
                                                put a bird on it squid
                                                single-origin coffee nulla
                                                assumenda shoreditch et. Nihil
                                                anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred
                                                nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice
                                                lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim
                                                aesthetic synth nesciunt you
                                                probably haven't heard of them
                                                accusamus labore sustainable
                                                VHS.
                                            </div>
                                        </div> */}
                                    {/* </div> */}
                                    {/* <div
                                        className="card"
                                        style={
                                            darkMode
                                                ? {
                                                      background: "#151515",
                                                  }
                                                : null
                                        }
                                    >
                                        <div
                                            className="card-header"
                                            id="headingThree"
                                        >
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseThree"
                                                >
                                                    MileStone 1
                                                </button>
                                            </h2>
                                        </div>
                                        <div
                                            id="collapseThree"
                                            className="collapse"
                                            aria-labelledby="headingThree"
                                            data-parent="#accordionExample"
                                            onClick={() =>
                                                setHeight(
                                                    !height ? true : false
                                                )
                                            }
                                        >
                                            <div
                                                className="card-body"
                                                style={
                                                    darkMode
                                                        ? {
                                                              background:
                                                                  "#151515",
                                                          }
                                                        : null
                                                }
                                            >
                                                Anim pariatur cliche
                                                reprehenderit, enim eiusmod high
                                                life accusamus terry richardson
                                                ad squid. 3 wolf moon officia
                                                aute, non cupidatat skateboard
                                                dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch
                                                3 wolf moon tempor, sunt aliqua
                                                put a bird on it squid
                                                single-origin coffee nulla
                                                assumenda shoreditch et. Nihil
                                                anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred
                                                nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice
                                                lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim
                                                aesthetic synth nesciunt you
                                                probably haven't heard of them
                                                accusamus labore sustainable
                                                VHS.
                                            </div>
                                        </div>
                                    </div> */}
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

export default Asses;
