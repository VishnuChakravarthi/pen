import React, { useEffect, useState } from "react";
// import Navbar from "./Nav";
import Footer from "../components/Footer";
import "./course.css";
import { Link } from "react-router-dom";
function Course() {
    function redirectfn(e) {
        const url = e.target.dataset.redirect;
        window.location.href = `${url}`;
    }

    const headerBg = {
        background: "rgba(0,0,0,0.7)",
    };

    const [height, setHeight] = useState("50vh");
    

    useEffect(() => {
        const iframeHeight = document.querySelector("iframe").offsetHeight;
        
        setHeight(iframeHeight);
    });
    return (
        <React.Fragment>
            {/* <Navbar color="color"/> */}
            <React.Fragment>
                <section class="our-team pb40 mt-3">
                    <div class="container-fluid">
                        <div class="row flex-row-reverse">
                            <div class="col-md-12 col-lg-9 col-xl-10">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="courses_single_container">
                                            <div class="cs_row_one">
                                                <div class="cs_ins_container">
                                                    <div class="courses_big_thumb">
                                                        
                                                        <div class="thumb flex-column">
                                                            <iframe
                                                                class="iframe_video custom-iframe-width"
                                                                src="//www.youtube.com/embed/57LQI8DKwec"
                                                                frameborder="0"
                                                                allowfullscreen
                                                            ></iframe>
                                                            <div className="d-flex justify-content-lg-between mt-3">
                                                                <div className="d-flex justify-content-end flex-basis-50">
                                                                    <button className="btn custom-button-control">
                                                                        <i class="fas fa-caret-left fa-2x ml-1 mr-1"></i>
                                                                    </button>
                                                                    <button className="btn custom-button-control">
                                                                        <i class="fas fa-caret-right fa-2x ml-1 mr-1"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="d-flex justify-content-end align-self-center">
                                                                    {" "}
                                                                    <button className="btn btn-primary">
                                                                        Glossary{" "}
                                                                        <i class="fas fa-search ml-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-3 col-xl-2 d-flex justify-content-around  flex-column align-items-center"
                                style={{ height: height }}
                            >
                                {/* <div class="">
                  <div className=""> */}
                                <a
                                    href="/sylabus"
                                    target="_blank"
                                    className="btn-width"
                                >
                                    {" "}
                                    <button
                                        class="btn dbxshad btn-lg btn-thm circle btn-width course-hover"
                                        data-redirect="/sylabus"
                                    >
                                        Syllabus
                                    </button>
                                </a>
                                

                                <a
                                    href="/as"
                                    target="_blank"
                                    className="btn-width"
                                >
                                    <button
                                        class="btn dbxshad btn-lg btn-thm circle btn-width course-hover"
                                        data-redirect="/as"
                                    >
                                        Assessments
                                    </button>
                                </a>

                                <a
                                    href="/leaderboard"
                                    target="_blank"
                                    className="btn-width"
                                >
                                    <button
                                        class="btn dbxshad btn-lg btn-thm circle btn-width course-hover"
                                        data-redirect="/leaderboard"
                                    >
                                        Progress Bar
                                    </button>
                                </a>
                                <a
                                    href="/bookmark"
                                    target="_blank"
                                    className="btn-width"
                                >
                                    {" "}
                                    <button
                                        class="btn dbxshad btn-lg btn-thm circle btn-width course-hover"
                                        data-redirect="/bookmark"
                                    >
                                        Bookmark
                                    </button>
                                </a>
                                <a
                                    href="/discussion"
                                    target="_blank"
                                    className="btn-width"
                                >
                                    <button
                                        class="btn dbxshad btn-lg btn-thm circle btn-width  course-hover"
                                        data-redirect="/discussion"
                                    >
                                        Discussion
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* </div>
          </div> */}
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default Course;
