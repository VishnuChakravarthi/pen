import React, { useState, useEffect } from "react";
import NavMain from "../components/NavHeading";
import Footer from "../components/Footer";
import { url } from "../components/api";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MyVerticallyCenteredModal from "./shareModal";
import anime from "animejs";

function SingleCourse({ location }) {
    // const [modal, setModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [singleCourse, setData] = useState([]);
    const [features, setFeatures] = useState([]);
    const [recCourses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const mystyle = {
        cursor: "pointer",
    };

    // const toggle = () => setModal(!modal);

    // function togglefn(e) {
    //     setTitle(e);
    //     toggle();
    // }

    // function chunkArray(myArray) {
    //     var index = 0;
    //     var arrayLength = myArray.length;
    //     var tempArray = [];
    //     var chunk_size = myArray.length / 2;
    //     for (index = 0; index < arrayLength; index += chunk_size) {
    //         let myChunk = myArray.slice(index, index + chunk_size);

    //         tempArray.push(myChunk);
    //     }

    //     return tempArray;
    // }

    useEffect(() => {
        const { id } = queryString.parse(location.search);
        const fetchData = async () => {
            try {
                const response = await fetch(url + `/view-course/${id}`);
                const data = await response.json();
                console.log(data, "data from api");
                // //for features splitting
                // const splits = data.data.features.split(`"`);
                // const feat = splits.filter((item) => {
                //     return item != `,`;
                // });
                // data.data.features = feat;
                // console.log(data.features);

                // //for what we learn splitting
                // const learn = data.data.what_learn.split(`"`);
                // const learnSplit = learn.filter((item) => {
                //     return item != ",";
                // });
                // learnSplit.shift();
                // learnSplit.pop();
                // const two_array = chunkArray(learnSplit);
                // data.data.what_learn = two_array;
                // console.log(data.data.what_learn);

                // //for requirement splitting
                // const req = data.data.requirements.split(`"`);
                // const reqSplit = req.filter((item) => {
                //     return item != ",";
                // });
                // reqSplit.shift();
                // reqSplit.pop();
                // data.data.requirements = reqSplit;
                // console.log(data.data.requirements);

                //for changong skills developed into array
                const new_skills = data.data.skills_developed.split(",");
                data.data.skills_developed = new_skills;
                try {
                    const response2 = await fetch(
                        url + `/related-courses/${data.data.course_id};`
                    );
                    const data2 = await response2.json();
                    console.log(data2.data);
                    setCourses(data2.data);
                } catch (error) {}
                setData(data.data);
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    //course outcomes readmore fn
    const [card, setCard] = useState({
        display: false,
        title: "",
        content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos suscipit tempore tempora voluptate assumenda nisi odio est, consectetur ducimus inventore voluptatum exercitationem quae deserunt distinctio sequi quidem obcaecati eum nesciunt?",
    });

    const openCardfn = (name) => {
        (card.title == name)?setCard({
            ...card,
           display: !card.display,
            title: name,
        }):setCard({
            ...card,
           display: true,
            title: name,
        });
        anime({
            targets: ".animejs",
            translateX: ["-200%", "0%"], // from 100 to 250
            opacity: [0, 1],
            delay: 500,
        });
    };

    //Navbar buttons functions
    const sharefn = () => {
        setModalShow(true);
    };

    const startLearningFn = () => {
        window.location.href = `/buy?id=${singleCourse.course_id}`;
    };

    return (
        <React.Fragment>
            <NavMain
                title={
                    singleCourse.course_title
                        ? singleCourse.course_title.toUpperCase()
                        : ""
                }
                courseid={singleCourse.course_id}
                sharefn={sharefn}
                startLearningfn={startLearningFn}
            />
            <React.Fragment>
                <section class="our-team pb40 mt-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-lg-8 col-xl-9">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="courses_single_container">
                                            <div class="cs_row_one">
                                                <div class="cs_ins_container">
                                                    <MyVerticallyCenteredModal
                                                        show={modalShow}
                                                        onHide={() =>
                                                            setModalShow(false)
                                                        }
                                                    />

                                                    {/* <h3 class="cs_title">
                                                        {singleCourse.course_title
                                                            ? singleCourse.course_title.toUpperCase()
                                                            : ""}
                                                    </h3> */}
                                                    {/* <ul class="cs_review_seller">
                            <li class="list-inline-item">
                              <a href="#">
                                <span>Best Seller</span>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">
                                <i class="fa fa-star"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">
                                <i class="fa fa-star"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">
                                <i class="fa fa-star"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">
                                <i class="fa fa-star"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">
                                <i class="fa fa-star"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#">4.5 (11,382 Ratings)</a>
                            </li>
                          </ul>
                          <ul class="cs_review_enroll">
                            <li class="list-inline-item">
                              <a href="#">
                                <span class="flaticon-profile"></span> 57,869
                                students enrolled
                              </a>
                            </li>
                        
                          </ul> */}
                                                    <h3 class="cs_title">
                                                        Course Outcome
                                                    </h3>
                                                    <div class="row justify-content-center">
                                                        <div class="col-sm-6 col-lg-6 col-xl-4">
                                                            <div class="hvr_img_box_container">
                                                                <div class="hvr_img_box imgs"></div>
                                                                <div class="overlay">
                                                                    <div class="details">
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
                                                                        <a
                                                                            onClick={() =>
                                                                                openCardfn(
                                                                                    "Job and Freelancing"
                                                                                )
                                                                            }
                                                                        >
                                                                            Learn
                                                                            more{" "}
                                                                            <span class="span flaticon-right-arrow-1"></span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6 col-lg-6 col-xl-4">
                                                            <div class="hvr_img_box_container">
                                                                <div class="hvr_img_box imgs"></div>
                                                                <div class="overlay">
                                                                    <div class="details">
                                                                        <h5>
                                                                            Contribution
                                                                        </h5>
                                                                        <p>
                                                                            {
                                                                                singleCourse.course_outcome2
                                                                            }
                                                                        </p>
                                                                        <a
                                                                            onClick={() =>
                                                                                openCardfn(
                                                                                    "Contribution"
                                                                                )
                                                                            }
                                                                        >
                                                                            Learn
                                                                            more{" "}
                                                                            <span class="span flaticon-right-arrow-1"></span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6 col-lg-6 col-xl-4">
                                                            <div class="hvr_img_box_container">
                                                                <div class="hvr_img_box imgs"></div>
                                                                <div class="overlay">
                                                                    <div class="details">
                                                                        <h5>
                                                                            Entrepreneurship
                                                                        </h5>
                                                                        <p>
                                                                            {
                                                                                singleCourse.course_outcome3
                                                                            }
                                                                        </p>
                                                                        <a
                                                                            onClick={() =>
                                                                                openCardfn(
                                                                                    "Entrepreneurship"
                                                                                )
                                                                            }
                                                                        >
                                                                            Learn
                                                                            more{" "}
                                                                            <span class="span flaticon-right-arrow-1"></span>
                                                                        </a>
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

                                                    <div class="courses_big_thumb">
                                                        <div class="thumb">
                                                            <iframe
                                                                class="iframe_video"
                                                                src="//www.youtube.com/embed/57LQI8DKwec"
                                                                frameborder="0"
                                                                allowfullscreen
                                                            ></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cs_row_two">
                                                <div class="cs_overview">
                                                    <h4 class="title">
                                                        Overview
                                                    </h4>
                                                    <h4 class="subtitle">
                                                        Course Description
                                                    </h4>
                                                    <p class="mb30">
                                                        {
                                                            singleCourse.course_description
                                                        }
                                                    </p>
                                                    <p class="mb20">
                                                        {/* It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum. */}
                                                    </p>
                                                    <h4 class="subtitle">
                                                        What you'll learn
                                                    </h4>
                                                    <ul class="cs_course_syslebus">
                                                        {singleCourse.what_learns
                                                            ? singleCourse.what_learns.map(
                                                                  (
                                                                      item,
                                                                      index
                                                                  ) => (
                                                                      <li>
                                                                          <i class="fa fa-check"></i>
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
                                                    <ul class="cs_course_syslebus2">
                                                        {singleCourse.what_learn
                                                            ? singleCourse.what_learn[1].map(
                                                                  (
                                                                      item,
                                                                      index
                                                                  ) => (
                                                                      <li>
                                                                          <i class="fa fa-check"></i>
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
                                                    <h4 class="subtitle">
                                                        Requirements
                                                    </h4>
                                                    <ul class="list_requiremetn">
                                                        {singleCourse &&
                                                            singleCourse.requirements &&
                                                            singleCourse.requirements.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li>
                                                                        <i class="fa fa-circle"></i>
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

                                            {/* <div class="cs_row_five">
                                                <div class="student_feedback_container">
                                                    <h4 class="aii_title">
                                                        Student feedback
                                                    </h4>
                                                    <div class="s_feeback_content">
                                                        <ul class="skills">
                                                            <li class="list-inline-item">
                                                                Stars 5
                                                            </li>
                                                            <li
                                                                class="list-inline-item progressbar1"
                                                                data-width="84"
                                                                data-target="100"
                                                            >
                                                                %84
                                                            </li>
                                                        </ul>
                                                        <ul class="skills">
                                                            <li class="list-inline-item">
                                                                Stars 4
                                                            </li>
                                                            <li
                                                                class="list-inline-item progressbar2"
                                                                data-width="9"
                                                                data-target="100"
                                                            >
                                                                %9
                                                            </li>
                                                        </ul>
                                                        <ul class="skills">
                                                            <li class="list-inline-item">
                                                                Stars 3
                                                            </li>
                                                            <li
                                                                class="list-inline-item progressbar3"
                                                                data-width="3"
                                                                data-target="100"
                                                            >
                                                                %3
                                                            </li>
                                                        </ul>
                                                        <ul class="skills">
                                                            <li class="list-inline-item">
                                                                Stars 2
                                                            </li>
                                                            <li
                                                                class="list-inline-item progressbar4"
                                                                data-width="1"
                                                                data-target="100"
                                                            >
                                                                %1
                                                            </li>
                                                        </ul>
                                                        <ul class="skills">
                                                            <li class="list-inline-item">
                                                                Stars 1
                                                            </li>
                                                            <li
                                                                class="list-inline-item progressbar5"
                                                                data-width="2"
                                                                data-target="100"
                                                            >
                                                                %2
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="aii_average_review text-center">
                                                        <div class="av_content">
                                                            <h2>4.5</h2>
                                                            <ul class="aii_rive_list mb0">
                                                                <li class="list-inline-item">
                                                                    <i class="fa fa-star"></i>
                                                                </li>
                                                                <li class="list-inline-item">
                                                                    <i class="fa fa-star"></i>
                                                                </li>
                                                                <li class="list-inline-item">
                                                                    <i class="fa fa-star"></i>
                                                                </li>
                                                                <li class="list-inline-item">
                                                                    <i class="fa fa-star"></i>
                                                                </li>
                                                                <li class="list-inline-item">
                                                                    <i class="fa fa-star"></i>
                                                                </li>
                                                            </ul>
                                                            <p>Course Rating</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div class="cs_row_six">
                                                <div class="sfeedbacks">
                                                    <h4 class="aii_title">
                                                        Reviews
                                                    </h4>
                                                    <div class="mbp_pagination_comments">
                                                        <div class="mbp_first media csv1">
                                                            <img
                                                                src="images/resource/review1.png"
                                                                class="mr-3"
                                                                alt="review1.png"
                                                            />
                                                            <div class="media-body">
                                                                <h4 class="sub_title mt-0">
                                                                    Warren
                                                                    Bethell
                                                                    <span class="sspd_review float-right">
                                                                        <ul>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item"></li>
                                                                        </ul>
                                                                    </span>
                                                                </h4>
                                                                <a
                                                                    class="sspd_postdate fz14"
                                                                    href="#"
                                                                >
                                                                    6 months ago
                                                                </a>
                                                                <p class="fz15 mt20">
                                                                    This is the
                                                                    second
                                                                    Photoshop
                                                                    course I
                                                                    have
                                                                    completed
                                                                    with
                                                                    Cristian.
                                                                    Worth every
                                                                    penny and
                                                                    recommend it
                                                                    highly. To
                                                                    get the most
                                                                    out of this
                                                                    course, its
                                                                    best to to
                                                                    take the
                                                                    Beginner to
                                                                    Advanced
                                                                    course
                                                                    first.
                                                                </p>
                                                                <p class="fz15 mt25 mb25">
                                                                    The sound
                                                                    and video
                                                                    quality is
                                                                    of a good
                                                                    standard.
                                                                    Thank you
                                                                    Cristian.
                                                                </p>{" "}
                                                                <div class="ssp_reply float-right">
                                                                    <span class="flaticon-consulting-message"></span>
                                                                    <span class="pl10">
                                                                        Reply
                                                                    </span>
                                                                </div>
                                                                <div class="sspd_review_liked">
                                                                    <a href="#">
                                                                        <i class="flaticon-like-1"></i>{" "}
                                                                        <span
                                                                            class="text-thm6 pl5 pr5 fz15"
                                                                            style={{
                                                                                color:
                                                                                    "#323643",
                                                                            }}
                                                                        >
                                                                            15
                                                                        </span>{" "}
                                                                    </a>
                                                                </div>
                                                                <div class="custom_hr style2"></div>
                                                                <div class="mbp_sub media csv1">
                                                                    <a href="#">
                                                                        <img
                                                                            src="images/resource/review1.png"
                                                                            class="mr-3"
                                                                            alt="review1.png"
                                                                        />
                                                                    </a>
                                                                    <div class="media-body">
                                                                        <h4 class="sub_title mt-0">
                                                                            Anton
                                                                            Hilton
                                                                            <span class="sspd_review float-right">
                                                                                <ul>
                                                                                    <li class="list-inline-item">
                                                                                        <a href="#">
                                                                                            <i class="fa fa-star"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="list-inline-item">
                                                                                        <a href="#">
                                                                                            <i class="fa fa-star"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="list-inline-item">
                                                                                        <a href="#">
                                                                                            <i class="fa fa-star"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="list-inline-item">
                                                                                        <a href="#">
                                                                                            <i class="fa fa-star"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="list-inline-item">
                                                                                        <a href="#">
                                                                                            <i class="fa fa-star"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="list-inline-item"></li>
                                                                                </ul>
                                                                            </span>
                                                                        </h4>
                                                                        <a
                                                                            class="sspd_postdate fz14"
                                                                            href="#"
                                                                        >
                                                                            6
                                                                            months
                                                                            ago
                                                                        </a>
                                                                        <p class="fz15 mt20 mb50">
                                                                            This
                                                                            is
                                                                            the
                                                                            second
                                                                            Photoshop
                                                                            course
                                                                            I
                                                                            have
                                                                            completed
                                                                            with
                                                                            Cristian.
                                                                            Worth
                                                                            every
                                                                            penny
                                                                            and
                                                                            recommend
                                                                            it
                                                                            highly.
                                                                            To
                                                                            get
                                                                            the
                                                                            most
                                                                            out
                                                                            of
                                                                            this
                                                                            course,
                                                                            its
                                                                            best
                                                                            to
                                                                            to
                                                                            take
                                                                            the
                                                                        </p>
                                                                        <div class="ssp_reply float-right">
                                                                            <span class="flaticon-consulting-message"></span>
                                                                            <span class="pl10">
                                                                                Reply
                                                                            </span>
                                                                        </div>
                                                                        <div class="sspd_review_liked">
                                                                            <a href="#">
                                                                                <i class="flaticon-like-1"></i>
                                                                                <span
                                                                                    class="text-thm6 pl5 pr5 fz15"
                                                                                    style={{
                                                                                        color:
                                                                                            "#323643",
                                                                                    }}
                                                                                >
                                                                                    15
                                                                                </span>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="custom_hr"></div>
                                                        <div class="mbp_second media csv1">
                                                            <img
                                                                src="images/resource/review1.png"
                                                                class="align-self-start mr-3"
                                                                alt="review1.png"
                                                            />
                                                            <div class="media-body">
                                                                <h4 class="sub_title mt-0">
                                                                    Warren
                                                                    Bethell
                                                                    <span class="sspd_review float-right">
                                                                        <ul>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item">
                                                                                <a href="#">
                                                                                    <i class="fa fa-star"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li class="list-inline-item"></li>
                                                                        </ul>
                                                                    </span>
                                                                </h4>
                                                                <a
                                                                    class="sspd_postdate fz14"
                                                                    href="#"
                                                                >
                                                                    6 months ago
                                                                </a>
                                                                <p class="fz15 mt20">
                                                                    This is the
                                                                    second
                                                                    Photoshop
                                                                    course I
                                                                    have
                                                                    completed
                                                                    with
                                                                    Cristian.
                                                                    Worth every
                                                                    penny and
                                                                    recommend it
                                                                    highly. To
                                                                    get the most
                                                                    out of this
                                                                    course, its
                                                                    best to to
                                                                    take the
                                                                    Beginner to
                                                                    Advanced
                                                                    course
                                                                    first.
                                                                </p>
                                                                <p class="fz15 mt25 mb25">
                                                                    The sound
                                                                    and video
                                                                    quality is
                                                                    of a good
                                                                    standard.
                                                                    Thank you
                                                                    Cristian.
                                                                </p>{" "}
                                                                <div class="ssp_reply float-right">
                                                                    <span class="flaticon-consulting-message"></span>
                                                                    <span class="pl10">
                                                                        Reply
                                                                    </span>
                                                                </div>
                                                                <div class="sspd_review_liked">
                                                                    <a href="#">
                                                                        <i class="flaticon-like-1"></i>{" "}
                                                                        <span
                                                                            class="text-thm6 pl5 pr5 fz15"
                                                                            style={{
                                                                                color:
                                                                                    "#323643",
                                                                            }}
                                                                        >
                                                                            15
                                                                        </span>{" "}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="text-center mt50">
                                                            <div class="custom_hr"></div>
                                                            <button
                                                                type="button"
                                                                class="more-review-btn btn"
                                                            >
                                                                See more reviews
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        {/* <h3 class="r_course_title">
                                            Recommended Courses
                                        </h3> */}
                                    </div>
                                    {recCourses
                                        ? recCourses.map((item, index) => (
                                              <div class="col-lg-6 col-xl-4">
                                                  <div class="top_courses">
                                                      <div class="thumb">
                                                          <img
                                                              class="img-whp"
                                                              src={
                                                                  item.feature_image
                                                              }
                                                              alt="t1.jpg"
                                                          />
                                                          <div class="overlay">
                                                              <div class="tag">
                                                                  Best Seller
                                                              </div>
                                                              <div class="icon">
                                                                  <span class="flaticon-like"></span>
                                                              </div>
                                                              <a
                                                                  class="tc_preview_course"
                                                                  href="#"
                                                              >
                                                                  Preview Course
                                                              </a>
                                                          </div>
                                                      </div>
                                                      <div class="details">
                                                          <div class="tc_content">
                                                              {/* <p>Ali TUFAN</p> */}
                                                              <h5>
                                                                  {item.course_title ||
                                                                      "Intro to HTML"}
                                                              </h5>
                                                              <ul class="tc_review">
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="fa fa-star"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="fa fa-star"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="fa fa-star"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="fa fa-star"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="fa fa-star"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          (6)
                                                                      </a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                          <div class="tc_footer">
                                                              <ul class="tc_meta float-left">
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="flaticon-profile"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          {
                                                                              item.people_count
                                                                          }
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          <i class="flaticon-comment"></i>
                                                                      </a>
                                                                  </li>
                                                                  <li class="list-inline-item">
                                                                      <a href="#">
                                                                          {
                                                                              item.lesson_count
                                                                          }
                                                                      </a>
                                                                  </li>
                                                              </ul>
                                                              <div class="tc_price float-right">
                                                                  {item.price1
                                                                      ? item.price1
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
                            <div class="col-lg-4 col-xl-3 position-relative">
                                <div class="instructor_pricing_widget">
                                    <div className="container mb-3 pb-2">
                                        <h4 className="title">
                                            Skills Covered
                                        </h4>

                                        {singleCourse.skills_developed
                                            ? singleCourse.skills_developed.map(
                                                  (item, index) => {
                                                      return (
                                                          <span className="badge badge-custom-course  m-2">
                                                              {item}
                                                          </span>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>

                                    <div class="price">
                                        {singleCourse.price_type === "<span>Price</span>&nbsp;<i class='fas fa-rupee-sign'></i>paid"
                                            ? singleCourse.price1
                                            : "Free"}{" "}
                                        <small>
                                            {" "}
                                            
                                            {singleCourse.price_type === "<span>Price</span>&nbsp;<i class='fas fa-rupee-sign'></i>paid"
                                                ? singleCourse.price3
                                                : ""}{" "}
                                        </small>
                                    </div>
                                    <Link
                                        onClick={(e) =>
                                            !singleCourse
                                                ? e.preventDefault()
                                                : ""
                                        }
                                        to={`/course-schedule?id=${singleCourse.course_id}`}
                                        target="_blank"
                                        className="cart_btnss"
                                    >
                                        Syllabus
                                    </Link>
                                    <Link
                                        onClick={(e) =>
                                            !singleCourse
                                                ? e.preventDefault()
                                                : ""
                                        }
                                        to={`/buy?id=${singleCourse.course_id}`}
                                        className="cart_btnss_blue"
                                    >
                                        Start Learning
                                    </Link>

                                    <h5 class="subtitle text-left">Includes</h5>
                                    <ul class="price_quere_list text-left">
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-play-button-1"></span>{" "}
                                                11 hours on-demand video
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-download"></span>{" "}
                                                69 downloadable resources
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-key-1"></span>{" "}
                                                Full lifetime access
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-responsive"></span>{" "}
                                                Access on mobile and TV
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-flash"></span>{" "}
                                                Assignments
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="flaticon-award"></span>{" "}
                                                Certificate of Completion
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="feature_course_widget">
                                    <ul class="list-group">
                                        <h4 class="title">Course Features</h4>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Lectures{" "}
                                            <span class="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[1]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Quizzes{" "}
                                            <span class="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[2]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Duration{" "}
                                            <span class="float-right">
                                                {" "}
                                                {singleCourse.features
                                                    ? singleCourse.features[3]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Skill level{" "}
                                            <span class="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[4]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Language{" "}
                                            <span class="float-right">
                                                {singleCourse.features
                                                    ? singleCourse.features[5]
                                                    : ""}
                                            </span>
                                        </li>
                                        <li class="d-flex justify-content-between align-items-center">
                                            Assessments{" "}
                                            <span class="float-right">
                                                {features ? features[6] : ""}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
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
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default SingleCourse;
