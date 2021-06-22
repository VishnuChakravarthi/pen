import React, { useState, useEffect } from "react";
import NavMain from "./Nav";
import MyVerticallyCenteredModal from "./shareModal";
import Footer from "./Footer";
import { url } from "./api";

function FreeCourseListing() {
    const [modalShow, setModalShow] = useState(false);

    function coursefn() {
        // window.location.href = "/course-info";
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url + "/view-all-courses");
            const data = await response.json();
            console.log(data);
        };
        fetchData();
        return () => {};
    }, []);
    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 offset-xl-3 text-center">
                <div className="breadcrumb_content">
                  <h4 className="breadcrumb_title">Courses</h4>
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    ></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}

                <section
                    className="courses-list2 pb40"
                    style={{ background: "whitesmoke" }}
                >
                    <div className="container ">
                        <div className="row">
                            <div
                                className="col-md-12 col-lg-8 col-xl-9 all-course-box"
                                style={{
                                    borderRight: "0.3px solid rgba(0,0,0,0.5)",
                                    background: "white",
                                }}
                            >
                                <div className="row courses_list_heading style2">
                                    <div className="col-xl-4 p0">
                                        <div className="instructor_search_result style2">
                                            <p className="mt10 fz15">
                                                <span className="color-dark pr10">
                                                    85{" "}
                                                </span>{" "}
                                                results{" "}
                                                <span className="color-dark pr10">
                                                    100
                                                </span>{" "}
                                                Video Tutorials
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 p0">
                                        <div className="candidate_revew_select style2 text-right">
                                            <ul className="mb0">
                                                <li className="list-inline-item">
                                                    <select className="selectpicker show-tick">
                                                        <option>
                                                            Newly published
                                                        </option>
                                                        <option>Recent</option>
                                                        <option>
                                                            Old Review
                                                        </option>
                                                    </select>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="candidate_revew_search_box course fn-520">
                                                        <form className="form-inline my-2 my-lg-0">
                                                            <input
                                                                className="form-control mr-sm-2"
                                                                type="search"
                                                                placeholder="Search courses"
                                                                aria-label="Search"
                                                            />
                                                            <button
                                                                className="btn my-2 my-sm-0"
                                                                type="submit"
                                                            >
                                                                <span className="flaticon-magnifying-glass"></span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row courses_container style2">
                                    <p></p>
                                    <a href="/course-info" target="_blank">
                                        {" "}
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/1.jpg"
                                                            alt="t1.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <h5>
                                                                Introduction Web
                                                                Design with HTML{" "}
                                                                <span className="tag">
                                                                    Best Seller
                                                                </span>
                                                            </h5>

                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                <button className="btn btn-learning mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>

                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/2.jpg"
                                                            alt="t2.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                Designing a
                                                                Responsive
                                                                Mobile Website
                                                                with Muse
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/3.jpg"
                                                            alt="t3.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                Sketch: Creating
                                                                Responsive SVG
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                {" "}
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/4.jpg"
                                                            alt="t4.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                Design
                                                                Instruments for
                                                                Communication
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                <span className="original_price">
                                                                    $99.95
                                                                </span>{" "}
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                {" "}
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/5.jpg"
                                                            alt="5.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                How to be a DJ?
                                                                Make Electronic
                                                                Music
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                <span className="original_price">
                                                                    $99.95
                                                                </span>{" "}
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/6.jpg"
                                                            alt="t6.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                How to Make
                                                                Beautiful
                                                                Landscape
                                                                Photos?
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                <span className="original_price">
                                                                    $99.95
                                                                </span>{" "}
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="/course-info" target="_blank">
                                        <div className="col-lg-12 p0">
                                            <div className="courses_list_content">
                                                <div className="top_courses list">
                                                    <div className="thumb">
                                                        <img
                                                            className="img-whp"
                                                            src="images/courses/7.jpg"
                                                            alt="t7.jpg"
                                                        />
                                                        <div className="overlay">
                                                            <div className="icon">
                                                                <span className="flaticon-like"></span>
                                                            </div>
                                                            <a
                                                                className="tc_preview_course"
                                                                href="#"
                                                            >
                                                                Preview Course
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="details">
                                                        <div className="tc_content">
                                                            <p></p>
                                                            <h5>
                                                                How to Make
                                                                Beautiful
                                                                Landscape
                                                                Photos?
                                                            </h5>
                                                            <p>
                                                                Learn how to
                                                                build prototypes
                                                                in Sketch. Find
                                                                out how to
                                                                prototype an
                                                                image carousel
                                                                for a website or
                                                                mobile app, with
                                                                these Sketch
                                                                prototyping
                                                                tips.
                                                            </p>
                                                        </div>
                                                        <div className="tc_footer">
                                                            <ul className="tc_meta float-left fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="flaticon-profile"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        1548
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i class="fas fa-book-open"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        25
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tc_price float-right fn-414">
                                                                <span className="original_price">
                                                                    $99.95
                                                                </span>{" "}
                                                                $69.95
                                                            </div>
                                                            <ul className="tc_review float-right fn-414">
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        <i className="fa fa-star"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="#">
                                                                        (5)
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={
                                                                    coursefn
                                                                }
                                                            >
                                                                View Details
                                                            </button>
                                                            <a href="/buy">
                                                                <button className="btn btn-primary mr-2">
                                                                    Start
                                                                    Learning
                                                                </button>
                                                            </a>
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={() =>
                                                                    setModalShow(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span class="flaticon-share">
                                                                    {" "}
                                                                    Share
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt50">
                                        <div className="mbp_pagination">
                                            <ul className="page_navigation">
                                                <li className="page-item disabled">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                        tabindex="-1"
                                                        aria-disabled="true"
                                                    >
                                                        {" "}
                                                        <span className="flaticon-left-arrow"></span>{" "}
                                                        Prev
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        1
                                                    </a>
                                                </li>
                                                <li
                                                    className="page-item active"
                                                    aria-current="page"
                                                >
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        2{" "}
                                                        <span className="sr-only">
                                                            (current)
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        ...
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        14
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        Next{" "}
                                                        <span className="flaticon-right-arrow-1"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* modal */}

                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />

                            {/* sidebar */}

                            <div className="col-lg-4 col-xl-3">
                                <div className="container ">
                                    <div
                                        className="selected_filter_widget style3 mb30 pb-2 border-bottom all-course-box p-3"
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodyPrice"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Price
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodyPrice"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_whitchbox">
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customSwitch1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customSwitch1"
                                                                >
                                                                    Paid{" "}
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customSwitch2"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customSwitch2"
                                                                >
                                                                    Free
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="selected_filter_widget style3 mb30  pb-2 border-bottom all-course-box p-3"
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodySoftware"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Categories
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodySoftware"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_checkbox">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck14"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck14"
                                                                >
                                                                    Photoshop{" "}
                                                                    <span className="float-right">
                                                                        (03)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck15"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck15"
                                                                >
                                                                    Adobe
                                                                    Illustrator{" "}
                                                                    <span className="float-right">
                                                                        (15)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck16"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck16"
                                                                >
                                                                    Graphic
                                                                    Design{" "}
                                                                    <span className="float-right">
                                                                        (126)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck17"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck17"
                                                                >
                                                                    Sketch{" "}
                                                                    <span className="float-right">
                                                                        (1,584)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck18"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck18"
                                                                >
                                                                    InDesign{" "}
                                                                    <span className="float-right">
                                                                        (34)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck19"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck19"
                                                                >
                                                                    CorelDRAW{" "}
                                                                    <span className="float-right">
                                                                        (34)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck20"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck20"
                                                                >
                                                                    After
                                                                    Effects{" "}
                                                                    <span className="float-right">
                                                                        (06)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <a
                                                                className="color-orose"
                                                                href="#"
                                                            >
                                                                <span className="fa fa-plus pr10"></span>{" "}
                                                                See More
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="selected_filter_widget style3 mb30 all-course-box p-3 "
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodySkills"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Skill level
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodySkills"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_checkbox">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck14"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck14"
                                                                >
                                                                    Beginner{" "}
                                                                    <span className="float-right">
                                                                        (03)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck15"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck15"
                                                                >
                                                                    Intermediate{" "}
                                                                    <span className="float-right">
                                                                        (15)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck16"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck16"
                                                                >
                                                                    Advanced{" "}
                                                                    <span className="float-right">
                                                                        (126)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck17"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customCheck17"
                                                                >
                                                                    Appropriate
                                                                    for all{" "}
                                                                    <span className="float-right">
                                                                        (1,584)
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="selected_filter_widget style3">
                  <div id="accordion" className="panel-group">
                    <div className="panel">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a
                            href="#panelBodyRating"
                            className="accordion-toggle link fz20 mb15"
                            data-toggle="collapse"
                            data-parent="#accordion"
                          >
                            Rating
                          </a>
                        </h4>
                      </div>
                      <div
                        id="panelBodyRating"
                        className="panel-collapse collapse"
                      >
                        <div className="panel-body">
                          <div className="ui_kit_checkbox style2">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck80"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck80"
                              >
                                Show All{" "}
                                <span className="float-right">(03)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck82"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck82"
                              >
                                1 star and higher{" "}
                                <span className="float-right">(15)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck83"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck83"
                              >
                                2 star and higher{" "}
                                <span className="float-right">(126)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck84"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck84"
                              >
                                3 star and higher{" "}
                                <span className="float-right">(1,584)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck85"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck85"
                              >
                                4 star and higher{" "}
                                <span className="float-right">(34)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck86"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck86"
                              >
                                5 star and higher{" "}
                                <span className="float-right">(58)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default FreeCourseListing;
