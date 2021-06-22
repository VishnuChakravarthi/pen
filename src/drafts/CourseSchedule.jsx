import React, { useEffect, useState } from "react";
import NavMain from "../components/NavHeading";
import Footer from "../components/Footer";
import Card from "react-bootstrap/Card";
import queryString from "query-string";
import { url } from "../components/api";
import MyVerticallyCenteredModal from "../components/shareModal";
import './courseSchedule.css';

function CourseSchedule({ location }) {
    const [modalShow, setModalShow] = useState(false);
    const [sylabus, setSylabus] = useState([]);

    function buyCoursefn() {
        window.location.href = "/buy";
    }

    //styles for box shadow
    const shadow = {
        boxShadow: "0px 1px 13px 1px rgba(0,0,0,0.03)",
    };
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
    useEffect(() => {
        const { id } = queryString.parse(location.search);

        const FetchData = async () => {
            try {
                const response = await fetch(url + `/syllabus/${id}`);
                const data = await response.json();
                if (data) {
                    setSylabus(data.data);
                    console.log(data.data)
                } else {
                    setSylabus([]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const CourseData = async () => {
            try {
                const response2 = await fetch(url + `/view-course/${id}`);
                const data2 = await response2.json();
                setCourse(data2.data);
            } catch (error) {
                console.log(error);
            }
        };
        CourseData();
        FetchData();
    }, []);

    console.log(sylabus);

    const sharefn = () => {
        setModalShow(true);
    };

    const startLearningFn = () => {
        window.location.href = `/buy?id=${course.course_id}`;
    };
    return (
        <React.Fragment>
            <NavMain
                title={course.course_title || ""}
                sharefn={sharefn}
                startLearningfn={startLearningFn}
            />
            <React.Fragment>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                {/* <section class="inner_page_breadcrumb">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 offset-xl-3 text-center">
                <div class="breadcrumb_content">
                  <h4 class="breadcrumb_title">Schedule</h4>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Course-1
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}

                <div className="container-fluid position-relative mt-3">
                    <div
                        style={{
                            backgroundColor: "#f9f9f9",
                            paddingBottom: "3rem",
                        }}
                    >
                        {/* <div
                            className="d-flex justify-content-end w-100 mb-3 position-sticky"
                            style={{ top: "15%" }}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={buyCoursefn}
                            >
                                Start Learning
                            </button>
                        </div> */}
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <div class="main-title text-center">
                                        <h1>Sylabus</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="row  justify-content-center">
                                    {sylabus ? (
                                        sylabus.map((item, index) => (
                                            <Card
                                                className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2 "
                                                style={shadow1}
                                            >
                                                <Card.Body
                                                    className={
                                                        index % 2 == 0
                                                            ? "sylabus-title"
                                                            : "sylabus-title-2"
                                                    }
                                                >
                                                    <h2 className="text-center ">
                                                        {item.title == "End"
                                                            ? "Destination"
                                                            : item.title}
                                                    </h2>

                                                    <Card.Text>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                        <ul class="mb0 p-3">
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    {
                                                                        item.duration
                                                                    }
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-clock mr-3"></span>
                                                                    {
                                                                        item.modules
                                                                    }
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    {
                                                                        item.project
                                                                    }
                                                                </a>
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
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    2nd week
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-clock mr-3"></span>
                                                                    7modules
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    2 Projects
                                                                </a>
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
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    3rd Week
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-clock mr-3"></span>
                                                                    7 Modules
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    3 Project
                                                                </a>
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
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    4th week
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-clock mr-3"></span>
                                                                    7 Modules
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    1 Project
                                                                </a>
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
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    5th week
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="flaticon-clock mr-3"></span>
                                                                    7modules
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    2 Projects
                                                                </a>
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
                                                                <a href="#">
                                                                    <span class="flaticon-appointment mr-3"></span>{" "}
                                                                    6th Week
                                                                </a>
                                                            </li>

                                                            <li>
                                                                <a href="#">
                                                                    <span class="fas fa-pen mr-3"></span>
                                                                    Professional
                                                                    Project
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </React.Fragment>
                                    )}

                                    {/* <Card
                    className="p-2 col-sm-6 col-lg-4 col-xl-3 m-2"
                    style={shadow2}
                  >
                    <Card.Body className="sylabus-title-2">
                      <h2 className="text-center ">Milestone 1</h2>

                      <Card.Text>
                        <p>
                          Lorem gravida nibh vel veliauctor aliquenean
                          sollicitudin, lorem quis bibendum auctor nisi elit
                          consequat ipsutis sem nibh id elit.
                        </p>
                        <ul class="mb0 p-3">
                          <li>
                            <a href="#">
                              <span class="flaticon-appointment mr-3"></span>{" "}
                              2nd week
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="flaticon-clock mr-3"></span>7modules
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="fas fa-pen mr-3"></span>2 Projects
                            </a>
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
                      <h2 className="text-center  ">Milestone 2</h2>

                      <Card.Text>
                        <p>
                          Lorem gravida nibh vel veliauctor aliquenean
                          sollicitudin, lorem quis bibendum auctor nisi elit
                          consequat ipsutis sem nibh id elit.
                        </p>
                        <ul class="mb0 p-3">
                          <li>
                            <a href="#">
                              <span class="flaticon-appointment mr-3"></span>{" "}
                              3rd Week
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="flaticon-clock mr-3"></span>7 Modules
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="fas fa-pen mr-3"></span>3 Project
                            </a>
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
                      <h2 className="text-center ">Milestone-3</h2>

                      <Card.Text>
                        <p>
                          Lorem gravida nibh vel veliauctor aliquenean
                          sollicitudin, lorem quis bibendum auctor nisi elit
                          consequat ipsutis sem nibh id elit.
                        </p>
                        <ul class="mb0 p-3">
                          <li>
                            <a href="#">
                              <span class="flaticon-appointment mr-3"></span>{" "}
                              4th week
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="flaticon-clock mr-3"></span>7 Modules
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="fas fa-pen mr-3"></span>1 Project
                            </a>
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
                      <h2 className="text-center ">Milestone 4</h2>

                      <Card.Text>
                        <p>
                          Lorem gravida nibh vel veliauctor aliquenean
                          sollicitudin, lorem quis bibendum auctor nisi elit
                          consequat ipsutis sem nibh id elit.
                        </p>
                        <ul class="mb0 p-3">
                          <li>
                            <a href="#">
                              <span class="flaticon-appointment mr-3"></span>{" "}
                              5th week
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="flaticon-clock mr-3"></span>7modules
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span class="fas fa-pen mr-3"></span>2 Projects
                            </a>
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
                      <h2 className="text-center  ">Destination</h2>

                      <Card.Text>
                        <p>
                          Lorem gravida nibh vel veliauctor aliquenean
                          sollicitudin, lorem quis bibendum auctor nisi elit
                          consequat ipsutis sem nibh id elit.
                        </p>
                        <ul class="mb0 p-3">
                          <li>
                            <a href="#">
                              <span class="flaticon-appointment mr-3"></span>{" "}
                              6th Week
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <span class="fas fa-pen mr-3"></span>
                              Professional Project
                            </a>
                          </li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card> */}
                                </div>
                                {/* <div className="d-flex justify-content-center w-100">
                  <button className="btn btn-primary" onClick={buyCoursefn}>
                    Start Learning
                  </button>
                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default CourseSchedule;
