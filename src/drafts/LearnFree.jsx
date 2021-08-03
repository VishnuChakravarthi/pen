import React from "react";
import NavMain from "./Nav";
import Footer from "./Footer";

import "./learnfree.css";

function LearnFree() {
    function freefn() {
        window.location.href = "/courses?id=free";
    }

    function givefn() {
        window.location.href = "/giveandtake";
    }
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                {/* <section class="inner_page_breadcrumb">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 offset-xl-3 text-center">
                <div class="breadcrumb_content">
                  <h4 class="breadcrumb_title"></h4>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Learn Free
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}
                <section className="">
                    <div className="container">
                        <div class="row justify-content-center  mb-4">
                            <div class="col-sm-6 col-lg-6 col-xl-6">
                                <div class="becomea_instructor_home3 style1 card-bg">
                                    <div class="bi_grid">
                                        <h3>Learn Courses Free</h3>
                                        <p>
                                            Teach what you love. Dove Schooll
                                            gives you the tools to create an{" "}
                                            <br className="dn-lg" /> online
                                            course.
                                        </p>
                                        <a
                                            className="btn btn-white onhover_blue"
                                            onClick={freefn}
                                        >
                                            Start Learning{" "}
                                            <span class="flaticon-right-arrow-1"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-6 col-xl-6">
                                <div class="becomea_instructor_home3 style2 card-bg-2 ">
                                    <div class="bi_grid">
                                        <h3
                                        // style={{ color: "rgba(0,0,0,0.65)" }}
                                        >
                                            Give And Take Courses
                                        </h3>
                                        <p
                                        // style={{ color: "rgba(0,0,0,0.65)" }}
                                        >
                                            Get unlimited access to 2,500 of
                                            Udemy’s top courses for{" "}
                                            <br class="dn-lg" /> your team.
                                        </p>
                                        <a
                                            class="btn btn-white"
                                            onClick={givefn}
                                        >
                                            Start Learning{" "}
                                            <span class="flaticon-right-arrow-1"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img
                                src="./images/background/inner-pagebg.jpg"
                                alt=""
                                className="img"
                                width="100%"
                            />
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default LearnFree;
