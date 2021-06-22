import React, { useState, useEffect } from "react";
import SingleCourseHeader from "../Utils/SingleCourseHeader";
// import Footer from "./Footer";
import { url } from "../../api";
import { Link } from "react-router-dom";
// import CourseShareModal from "../Utils/CourseShareModal";
import anime from "animejs";
import CourseShareModal from "../Utils/CourseShareModal";
import Spinner from "../../utils/Spinner";
import history from "../../../history";
import Axios from "axios";
import { Helmet } from "react-helmet";
import swal from "sweetalert";

function SingleCourse({ match }) {
    // const [modal, setModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [singleCourse, setSingleCourse] = useState([]);
    const [features, setFeatures] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [recCourses, setCourses] = useState([]);
    const [skillsDeveloped, setSkillsDeveloped] = useState([]);
    const [selected, setSelected] = useState("");
    const [userCourses, setUserCourses] = useState([]);

    const userId = localStorage.getItem("resusid");
    const token = localStorage.getItem("Token");

    const courseid = match.params.id;

    useEffect(() => {
        fetchData();
        fetchUserCourses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/view-course/${courseid}`);
            const data = await response.json();
            console.log(data, "data from api");
            setSingleCourse(data.data);

            setSkillsDeveloped(data.data.skills_developed.split(","));
            // data.data.skills_developed = new_skills;
            try {
                const response2 = await fetch(
                    url + `/related-courses/${data.data.course_id};`
                );
                const data2 = await response2.json();
                console.log(data2.data);
                setCourses(data2.data);
            } catch (error) {}
        } catch (error) {
            console.log(error);
            // setData([]);
        }
    };
    console.log(singleCourse, "singleCourse");
    //course outcomes readmore fn
    const [card, setCard] = useState({
        display: false,
        title: "",
        content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos suscipit tempore tempora voluptate assumenda nisi odio est, consectetur ducimus inventore voluptatum exercitationem quae deserunt distinctio sequi quidem obcaecati eum nesciunt?",
    });

    const fetchUserCourses = async () => {
        try {
            const response = await Axios.get(`${url}/my-profile`, {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("Token")}`,
                },
            });
            console.log(response.data.data.courses);
            response.data.data.courses.map((courses) => {
                return setUserCourses((userCourses) => [
                    ...userCourses,
                    courses.course_id,
                ]);
            });
            // console.log(userCourse);
            // setUserCourses(userCourse);
        } catch (e) {}
        setSpinner(false);
    };

    console.log(userCourses, "------------------------------");

    const openCardfn = (name) => {
        // const jobcard = document.getElementById("job");
        // const contributecard = document.getElementById("contribute");
        // const enterprecard = document.getElementById("enterpreneur");

        // if(name === )
        setSelected(selected === name ? "" : name);
        console.log(name);
        card.title === name
            ? setCard({
                  ...card,
                  display: !card.display,
                  title: name,
              })
            : setCard({
                  ...card,
                  display: true,
                  title: name,
              });
        anime({
            targets: ".animejs",
            translateX: ["-100%", "0%"], // from 100 to 250
            opacity: 1,
            // delay: 500,
            easing: "easeInOutQuad",
        });
        console.log(card);
    };

    //Navbar buttons functions
    const sharefn = () => {
        setModalShow(true);
    };

    const onCoursePageRedirect = (id) => {
        redirect(id);
    };

    const fetchTrackProgress = async (course_id) => {
        try {
            const response = await Axios.get(
                `${url}/track/course/${course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "asdasdasdasdsadasdsds");
            return response.data.data[0];
        } catch (e) {}
    };

    const fetchSyllabus = async (course_id) => {
        try {
            const response = await Axios.get(`${url}/syllabus/${course_id}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            return response.data.data[0];
        } catch (e) {}
    };

    const redirect = async (id) => {
        setSpinner(true);
        if (userCourses.includes(id)) {
            const pro = await fetchTrackProgress(id);
            console.log(pro);
            if (pro) {
                if (pro.lesson_id) {
                    return history.push(`/learn/${id}/lesson/${pro.lesson_id}`);
                }
            }
            const newCourse = await fetchSyllabus(id);
            if (newCourse) {
                return history.push(
                    `/learn/${id}/lesson/${newCourse.lessons[0].id}`
                );
            }
        } else {
            return history.push(`/buy/${id}`);
        }
        setSpinner(false);
        swal("Sorry", "No lessons to learn", "error");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    {singleCourse.course_title
                        ? singleCourse.course_title
                        : "Course"}{" "}
                    | The Pen App
                </title>
                <meta name="description" content="Home page" />
            </Helmet>
            <React.Fragment>
                <section className="our-team ">
                    <SingleCourseHeader
                        title={
                            singleCourse.course_title
                                ? singleCourse.course_title
                                : ""
                        }
                        courseid={courseid}
                        sharefn={sharefn}
                    />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-12 col-lg-8 col-xl-9">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="courses_single_container">
                                            <div className="cs_row_one">
                                                <div className="cs_ins_container">
                                                    <CourseShareModal
                                                        show={modalShow}
                                                        onHide={() =>
                                                            setModalShow(false)
                                                        }
                                                        course={singleCourse}
                                                    />
                                                    <h3 className="cs_title">
                                                        Course Outcome
                                                    </h3>
                                                    <div className="row justify-content-center">
                                                        <div className="col-sm-6 col-lg-6 col-xl-4">
                                                            <div
                                                                className={`hvr_img_box_container ${
                                                                    selected ===
                                                                    "Job and Freelancing"
                                                                        ? `hvr_img_box_container_stay`
                                                                        : null
                                                                }`}
                                                            >
                                                                <div className="hvr_img_box imgs"></div>
                                                                <div className="overlay">
                                                                    <div
                                                                        className="details"
                                                                        id="job"
                                                                        onClick={() =>
                                                                            openCardfn(
                                                                                "Job and Freelancing"
                                                                            )
                                                                        }
                                                                    >
                                                                        <h5>
                                                                            Job
                                                                            &
                                                                            Freelancing
                                                                        </h5>
                                                                        <p>
                                                                            {
                                                                                singleCourse.course_outcome1
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Learn
                                                                            more{" "}
                                                                            <span className="span flaticon-right-arrow-1"></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-lg-6 col-xl-4">
                                                            <div
                                                                className={`hvr_img_box_container ${
                                                                    selected ===
                                                                    "Contribution"
                                                                        ? `hvr_img_box_container_stay`
                                                                        : null
                                                                }`}
                                                            >
                                                                <div className="hvr_img_box imgs"></div>
                                                                <div className="overlay">
                                                                    <div
                                                                        className="details"
                                                                        id="contribute"
                                                                        onClick={() =>
                                                                            openCardfn(
                                                                                "Contribution"
                                                                            )
                                                                        }
                                                                    >
                                                                        <h5>
                                                                            Contribution
                                                                        </h5>
                                                                        <p>
                                                                            {
                                                                                singleCourse.course_outcome2
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Learn
                                                                            more{" "}
                                                                            <span className="span flaticon-right-arrow-1"></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-lg-6 col-xl-4">
                                                            <div
                                                                className={`hvr_img_box_container ${
                                                                    selected ===
                                                                    "Entrepreneurship"
                                                                        ? `hvr_img_box_container_stay`
                                                                        : null
                                                                }`}
                                                            >
                                                                <div className="hvr_img_box imgs"></div>
                                                                <div className="overlay">
                                                                    <div
                                                                        className="details"
                                                                        id="enterpreneur"
                                                                        onClick={() =>
                                                                            openCardfn(
                                                                                "Entrepreneurship"
                                                                            )
                                                                        }
                                                                    >
                                                                        <h5>
                                                                            Entrepreneurship
                                                                        </h5>
                                                                        <p>
                                                                            {
                                                                                singleCourse.course_outcome3
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Learn
                                                                            more{" "}
                                                                            <span className="span flaticon-right-arrow-1"></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            card.display
                                                                ? "container-fluid  animejs mb-5"
                                                                : "container-fluid animejs d-none"
                                                        }
                                                    >
                                                        <div
                                                            className="card p-3 mb-3"
                                                            style={{
                                                                boxShadow:
                                                                    "1px 1px 5px 2px rgba(0, 0, 0, 0.09)",
                                                            }}
                                                        >
                                                            <div className="pl-3 card-title">
                                                                <h3>
                                                                    {card.title}
                                                                </h3>
                                                            </div>
                                                            <div className="p-3 pt-0">
                                                                <p>
                                                                    Lorem ipsum
                                                                    dolor sit
                                                                    amet
                                                                    consectetur,
                                                                    adipisicing
                                                                    elit. Iusto
                                                                    atque ut
                                                                    debitis
                                                                    aspernatur,
                                                                    optio animi
                                                                    dicta.
                                                                    Voluptatibus
                                                                    quas quod
                                                                    natus?
                                                                    Labore dolor
                                                                    quas,
                                                                    quibusdam
                                                                    aut eos
                                                                    animi quo?
                                                                    Eaque,
                                                                    necessitatibus!
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="courses_big_thumb">
                                                        <div className="thumb">
                                                            <iframe
                                                                title="iframevid"
                                                                className="iframe_video"
                                                                src={
                                                                    singleCourse.intro_file
                                                                }
                                                                frameBorder="0"
                                                                allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cs_row_two">
                                                <div className="cs_overview">
                                                    <h4 className="title">
                                                        Overview
                                                    </h4>
                                                    <h4 className="subtitle">
                                                        Course Description
                                                    </h4>
                                                    <p className="mb30">
                                                        {
                                                            singleCourse.course_description
                                                        }
                                                    </p>
                                                    <p className="mb20">
                                                        {/* It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum. */}
                                                    </p>
                                                    <h4 className="subtitle">
                                                        What you'll learn
                                                    </h4>
                                                    <ul className="cs_course_syslebus">
                                                        {singleCourse.what_learns
                                                            ? singleCourse.what_learns.map(
                                                                  (item, i) => (
                                                                      <li
                                                                          key={
                                                                              i
                                                                          }
                                                                      >
                                                                          <i className="fa fa-check"></i>
                                                                          <p>
                                                                              {
                                                                                  item
                                                                              }
                                                                          </p>
                                                                      </li>
                                                                  )
                                                              )
                                                            : ""}
                                                    </ul>
                                                    <ul className="cs_course_syslebus2">
                                                        {singleCourse.what_learn
                                                            ? singleCourse.what_learn[1].map(
                                                                  (
                                                                      item,
                                                                      index
                                                                  ) => (
                                                                      <li>
                                                                          <i className="fa fa-check"></i>
                                                                          <p>
                                                                              {
                                                                                  item
                                                                              }
                                                                          </p>
                                                                      </li>
                                                                  )
                                                              )
                                                            : ""}
                                                    </ul>
                                                    <h4 className="subtitle">
                                                        Requirements
                                                    </h4>
                                                    <ul className="list_requiremetn">
                                                        {singleCourse &&
                                                            singleCourse.requirements &&
                                                            singleCourse.requirements.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li>
                                                                        <i
                                                                            className="fa fa-circle"
                                                                            style={{
                                                                                fontSize:
                                                                                    "10px",
                                                                            }}
                                                                        ></i>
                                                                        <p>
                                                                            {
                                                                                item
                                                                            }
                                                                        </p>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        {/* <h3 className="r_course_title">
                                            Recommended Courses
                                        </h3> */}
                                    </div>
                                    {recCourses
                                        ? recCourses.map((item, i) => (
                                              <div
                                                  key={i}
                                                  className="col-lg-6 col-xl-4"
                                              >
                                                  <div className="top_courses">
                                                      <div className="thumb">
                                                          <img
                                                              className="img-whp"
                                                              src={
                                                                  item.feature_image
                                                              }
                                                              alt="t1.jpg"
                                                              height="200px"
                                                          />
                                                          <div
                                                              className="overlay"
                                                              style={{
                                                                  display:
                                                                      "none",
                                                              }}
                                                          >
                                                              <div className="tag">
                                                                  Best Seller
                                                              </div>
                                                              <div className="icon">
                                                                  <span className="flaticon-like"></span>
                                                              </div>
                                                              <p
                                                                  className="tc_preview_course"
                                                                  href="#"
                                                              >
                                                                  Preview Course
                                                              </p>
                                                          </div>
                                                      </div>
                                                      <div className="details">
                                                          <div className="tc_content">
                                                              {/* <p>Ali TUFAN</p> */}
                                                              <h5>
                                                                  {item.course_title ||
                                                                      "Intro to HTML"}
                                                              </h5>
                                                              <ul className="tc_review">
                                                                  <li className="list-inline-item">
                                                                      <i className="fa fa-star"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      <i className="fa fa-star"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      <i className="fa fa-star"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      <i className="fa fa-star"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      <i className="fa fa-star"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      (6)
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                          <div className="tc_footer">
                                                              <ul className="tc_meta float-left">
                                                                  <li className="list-inline-item">
                                                                      <i className="flaticon-profile"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      {
                                                                          item.people_count
                                                                      }
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      <i className="flaticon-comment"></i>
                                                                  </li>
                                                                  <li className="list-inline-item">
                                                                      {
                                                                          item.lesson_count
                                                                      }
                                                                  </li>
                                                              </ul>
                                                              <div className="tc_price float-right">
                                                                  {item.price1
                                                                      ? `₹ ${item.price1}`
                                                                      : "Free"}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                        : ""}
                                </div>
                            </div>
                            <div className="col-lg-4 col-xl-3 position-relative">
                                <div className="instructor_pricing_widget">
                                    <div className="container mb-3 pb-2">
                                        <h4 className="title">
                                            Skills Covered
                                        </h4>

                                        {skillsDeveloped?.map((item, index) => {
                                            return (
                                                <span className="badge badge-custom-course  m-2">
                                                    {item}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <div
                                        className="price"
                                        style={{ margin: "0px" }}
                                    >
                                        {singleCourse.price1
                                            ? `₹ ${singleCourse.price1}`
                                            : "Free"}
                                        <small>
                                            {" "}
                                            {singleCourse.price_type ===
                                            "<span>Price</span>&nbsp;<i className='fas fa-rupee-sign'></i>paid"
                                                ? singleCourse.price3
                                                : ""}{" "}
                                        </small>
                                    </div>
                                    <Link
                                        to={`/schedule/${singleCourse.course_id}`}
                                        className="cart_btnss"
                                        target="_blank"
                                    >
                                        Syllabus
                                    </Link>
                                    <div className="wrap">
                                        <button
                                            // onClick={(e) =>
                                            //     !singleCourse
                                            //         ? e.preventDefault()
                                            //         : ""
                                            // }
                                            // to={`/buy/${singleCourse.course_id}`}
                                            onClick={() =>
                                                onCoursePageRedirect(
                                                    singleCourse.course_id
                                                )
                                            }
                                            disabled={spinner}
                                            className="cart_btnss_blue start__learning startlearn__btn hover__border"
                                            // style={{
                                            //     width: "100%",
                                            //     cursor: "pointer",
                                            //     outline: none
                                            // }}
                                        >
                                            <span>Start Learning</span>
                                        </button>
                                    </div>
                                    {/* <h5 className="subtitle text-left">
                                        Includes
                                    </h5>
                                    <ul className="price_quere_list text-left">
                                        <li>
                                            <span className="flaticon-play-button-1"></span>{" "}
                                            11 hours on-demand video
                                        </li>
                                        <li>
                                            <span className="flaticon-download"></span>{" "}
                                            69 downloadable resources
                                        </li>
                                        <li>
                                            <span className="flaticon-key-1"></span>{" "}
                                            Full lifetime access
                                        </li>
                                        <li>
                                            <span className="flaticon-responsive"></span>{" "}
                                            Access on mobile and TV
                                        </li>
                                        <li>
                                            <span className="flaticon-flash"></span>{" "}
                                            Assignments
                                        </li>
                                        <li>
                                            <span className="flaticon-award"></span>{" "}
                                            Certificate of Completion
                                        </li>
                                    </ul> */}
                                </div>
                                {/* <div className="feature_course_widget">
                                    <ul className="list-group">
                                        <h4 className="title">
                                            Course Features
                                        </h4>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Lectures{" "}
                                            <span className="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[1]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Quizzes{" "}
                                            <span className="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[2]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Duration{" "}
                                            <span className="float-right">
                                                {" "}
                                                {singleCourse.features
                                                    ? singleCourse.features[3]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Skill level{" "}
                                            <span className="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[4]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Language{" "}
                                            <span className="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[5]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            Assessments{" "}
                                            <span className="float-right">
                                                {features ? features[6] : ""}
                                            </span>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div
                                    className="d-flex justify-content-center align-items-center position-sticky"
                                    style={{ top: "15%" }}
                                >
                                    <button className="btn btn-thm33 position-relative p-2">
                                        <svg className="svgs">
                                            <rect></rect>
                                        </svg>
                                        Start Learning
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* {spinner ? (
                    <div className="loader">
                        <Spinner />
                    </div>
                ) : null} */}
            </React.Fragment>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default SingleCourse;
