import React, { useEffect, useState } from "react";
import SingleCourseHeader from "../Utils/SingleCourseHeader";
import Card from "react-bootstrap/Card";
import { url } from "../../api";
import CourseShareModal from "../Utils/CourseShareModal";
import "./courseSchedule.css";
import history from "../../../history";
import { Helmet } from "react-helmet";

function CourseSchedule({ match }) {
    const [modalShow, setModalShow] = useState(false);
    const [sylabus, setSylabus] = useState([]);

    const shadow1 = {
        boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    inset 0 0 20px rgba(255, 255, 255,0),
    7px 7px 15px rgba(55, 84, 170,.15),
    -7px -7px 20px rgba(255, 255, 255,1),
    inset 0px 0px 4px rgba(255, 255, 255,.2)`,
        marginRight: "1rem",
        paddingBottom: "1rem",
        borderRadius: "15px",
        border: "0.5px solid #93deff",
        // background: "#323643",
    };
    const shadow2 = {
        boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    inset 0 0 20px rgba(255, 255, 255,0),
    7px 7px 15px rgba(55, 84, 170,.15),
    -7px -7px 20px rgba(255, 255, 255,1),
    inset 0px 0px 4px rgba(255, 255, 255,.2)`,
        marginRight: "1rem",
        paddingBottom: "1rem",
        borderRadius: "15px",
        border: "0.5px solid #606470",
        // background: "#93deff",
    };
    const [course, setCourse] = useState([]);
    const course_id = match.params.course_id;

    useEffect(() => {
        CourseData();
        FetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const FetchData = async () => {
        try {
            const response = await fetch(url + `/syllabus/${course_id}`);
            const data = await response.json();
            if (data) {
                setSylabus(data.data);
                console.log(data.data);
            } else {
                setSylabus([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const CourseData = async () => {
        try {
            const response2 = await fetch(url + `/view-course/${course_id}`);
            const data2 = await response2.json();
            setCourse(data2.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(sylabus);

    const sharefn = () => {
        setModalShow(true);
    };

    const startLearningFn = () => {
        history.push(`/buy/${course_id}`);
    };

    console.log(sylabus);

    return (
        <React.Fragment>
            <Helmet>
                <title>Syllabus | The Pen App</title>
                <meta name="description" content="Syllabus page" />
            </Helmet>
            <React.Fragment>
                <CourseShareModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    course={course}
                />

                <section className="">
                    <SingleCourseHeader
                        title={course.course_title || ""}
                        sharefn={sharefn}
                        courseid={course_id}
                    />
                    <div
                        style={{
                            backgroundColor: "#f9f9f9",
                            paddingBottom: "3rem",
                        }}
                    >
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <div class="main-title text-center">
                                        <h1>Syllabus</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="row  justify-content-center">
                                    {sylabus ? (
                                        sylabus.map((item, index) => (
                                            <Card
                                                key={index}
                                                className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2 "
                                                style={shadow1}
                                            >
                                                <Card.Body
                                                    className={
                                                        index % 2 === 0
                                                            ? "sylabus-title"
                                                            : "sylabus-title-2"
                                                    }
                                                >
                                                    <h2 className="text-center ">
                                                        {item.title === "End"
                                                            ? "Destination"
                                                            : item.title}
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                {item.duration}
                                                            </li>
                                                            <li>
                                                                <span class="flaticon-clock mr-3"></span>
                                                                {
                                                                    item.lessons
                                                                        .length
                                                                }
                                                            </li>
                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                {`0/${
                                                                    Math.random().toFixed(
                                                                        1
                                                                    ) * 10
                                                                }`}
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : (
                                        <React.Fragment>
                                            <Card
                                                className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2"
                                                style={shadow2}
                                            >
                                                <Card.Body className="sylabus-title-2">
                                                    <h2 className="text-center ">
                                                        Milestone 1
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            Lorem gravida nibh
                                                            vel veliauctor
                                                            aliquenean
                                                            sollicitudin, lorem
                                                            quis bibendum auctor
                                                            nisi elit consequat
                                                            ipsutis sem nibh id
                                                            elit.
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                2nd week
                                                            </li>
                                                            <li>
                                                                <span class="flaticon-clock mr-3"></span>
                                                                7modules
                                                            </li>
                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                2 Projects
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card
                                                className="p-2  col-sm-6 col-lg-4 col-xl-3  m-2"
                                                style={shadow1}
                                            >
                                                <Card.Body className="sylabus-title">
                                                    <h2 className="text-center  ">
                                                        Milestone 2
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            Lorem gravida nibh
                                                            vel veliauctor
                                                            aliquenean
                                                            sollicitudin, lorem
                                                            quis bibendum auctor
                                                            nisi elit consequat
                                                            ipsutis sem nibh id
                                                            elit.
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                3rd Week
                                                            </li>
                                                            <li>
                                                                <span class="flaticon-clock mr-3"></span>
                                                                7 Modules
                                                            </li>
                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                3 Project
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>

                                            <Card
                                                className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2 "
                                                style={shadow2}
                                            >
                                                <Card.Body className="sylabus-title-2">
                                                    <h2 className="text-center ">
                                                        Milestone-3
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            Lorem gravida nibh
                                                            vel veliauctor
                                                            aliquenean
                                                            sollicitudin, lorem
                                                            quis bibendum auctor
                                                            nisi elit consequat
                                                            ipsutis sem nibh id
                                                            elit.
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                4th week
                                                            </li>
                                                            <li>
                                                                <span class="flaticon-clock mr-3"></span>
                                                                7 Modules
                                                            </li>
                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                1 Project
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card
                                                className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2"
                                                style={shadow1}
                                            >
                                                <Card.Body className="sylabus-title">
                                                    <h2 className="text-center ">
                                                        Milestone 4
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            Lorem gravida nibh
                                                            vel veliauctor
                                                            aliquenean
                                                            sollicitudin, lorem
                                                            quis bibendum auctor
                                                            nisi elit consequat
                                                            ipsutis sem nibh id
                                                            elit.
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                5th week
                                                            </li>
                                                            <li>
                                                                <span class="flaticon-clock mr-3"></span>
                                                                7modules
                                                            </li>
                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                2 Projects
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card
                                                className="p-2  col-sm-6 col-lg-4 col-xl-3  m-2"
                                                style={shadow2}
                                            >
                                                <Card.Body className="sylabus-title-2">
                                                    <h2 className="text-center  ">
                                                        Destination
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            Lorem gravida nibh
                                                            vel veliauctor
                                                            aliquenean
                                                            sollicitudin, lorem
                                                            quis bibendum auctor
                                                            nisi elit consequat
                                                            ipsutis sem nibh id
                                                            elit.
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <span class="flaticon-appointment mr-3"></span>{" "}
                                                                6th Week
                                                            </li>

                                                            <li>
                                                                <span class="fas fa-pen mr-3"></span>
                                                                Professional
                                                                Project
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default CourseSchedule;
