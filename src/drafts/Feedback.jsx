import React from "react";
import NavMain from "../components/Nav";
import Footer from "../components/Footer";
import "./feedback.css";

function Feedback() {
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 offset-xl-3 text-center">
                <div className="breadcrumb_content">
                  <h4 className="breadcrumb_title">Feedbacks</h4>
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

                <section className="mt-5">
                    <div class="container-feedback m-auto ">
                        <div class="quiz">
                            <div className="container">
                                <div class="shortcode_widget_tab">
                                    <h4>Feedback/Report</h4>
                                    <div class="ui_kit_tab mt30">
                                        <ul
                                            class="nav nav-tabs d-flex justify-content-center"
                                            id="myTab"
                                            role="tablist"
                                        >
                                            <li class="nav-item">
                                                <a
                                                    class="nav-link"
                                                    id="home-tab"
                                                    data-toggle="tab"
                                                    href="#home"
                                                    role="tab"
                                                    aria-controls="home"
                                                    aria-selected="true"
                                                    style={{ width: "inherit" }}
                                                >
                                                    Provide Feedback
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a
                                                    class="nav-link active"
                                                    id="profile-tab"
                                                    data-toggle="tab"
                                                    href="#profile"
                                                    role="tab"
                                                    aria-controls="profile"
                                                    aria-selected="false"
                                                    style={{ width: "inherit" }}
                                                >
                                                    Report Bug
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a
                                                    class="nav-link"
                                                    id="contact-tab"
                                                    data-toggle="tab"
                                                    href="#contact"
                                                    role="tab"
                                                    aria-controls="contact"
                                                    aria-selected="false"
                                                    style={{ width: "inherit" }}
                                                >
                                                    Ask Help
                                                </a>
                                            </li>
                                        </ul>
                                        <div
                                            class="tab-content"
                                            id="myTabContent"
                                        >
                                            <div
                                                class="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                                aria-labelledby="home-tab"
                                            >
                                                <form>
                                                    <div class="form-group">
                                                        <h5>
                                                            What is your
                                                            feedback about ?
                                                        </h5>
                                                        <input
                                                            type="text"
                                                            class="form-control h50"
                                                            id="exampleInputText"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <h5>
                                                            Tell us little more
                                                        </h5>
                                                        <textarea
                                                            class="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div
                                                class="tab-pane fade"
                                                id="profile"
                                                role="tabpanel"
                                                aria-labelledby="profile-tab"
                                            >
                                                <form>
                                                    <div class="form-group">
                                                        <h5>
                                                            What is the bug
                                                            faced?
                                                        </h5>
                                                        <input
                                                            type="text"
                                                            class="form-control h50"
                                                            id="exampleInputText"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <h5>
                                                            Breif us a little
                                                            more
                                                        </h5>
                                                        <textarea
                                                            class="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div
                                                class="tab-pane fade"
                                                id="contact"
                                                role="tabpanel"
                                                aria-labelledby="contact-tab"
                                            >
                                                <form>
                                                    <div class="form-group">
                                                        <h5>
                                                            Mention to subject
                                                            to discuss
                                                        </h5>
                                                        <input
                                                            type="text"
                                                            class="form-control h50"
                                                            id="exampleInputText"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <h5>
                                                            Breif us a little
                                                            more
                                                        </h5>
                                                        <textarea
                                                            class="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="choices">
                                <button class="true">Submit</button>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default Feedback;
