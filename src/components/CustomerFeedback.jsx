import React from "react";
import NavMain from "./Nav";
import Footer from "./Footer";
import "./feedback.css";
function CustomerFeedback() {
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                <section className="inner_page_breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 text-center">
                                <div className="breadcrumb_content">
                                    <h4 className="breadcrumb_title">
                                        Feedbacks
                                    </h4>
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
                </section>

                <section>
                    <div class="container-feedback m-auto">
                        <div class="quiz">
                            <div className="container">
                                <h1>Customer Feedback</h1>
                                <small className="muted">
                                    We value your Feedback!
                                </small>
                            </div>
                            <div className="container m-2">
                                <h3>
                                    How likely is it that you would recommend
                                    this Application / Course to a friend or
                                    colleague?
                                </h3>

                                <div className="grid-boxes d-flex align-items-center m-3">
                                    <div className="box color-1">1</div>
                                    <div className="box color-2">2</div>
                                    <div className="box color-3">3</div>
                                    <div className="box color-4">4</div>
                                    <div className="box color-5">5</div>
                                    <div className="box color-6">6</div>
                                    <div className="box color-7">7</div>
                                    <div className="box color-8">8</div>
                                    <div className="box color-9">9</div>
                                    <div className="box color-10">10</div>
                                </div>
                            </div>
                            <div className="container">
                                <h3>What did you find most valuable?</h3>
                                <p>
                                    Select any that apply. You’re allowed to
                                    select more than one.
                                </p>
                                <div
                                    class="blog_tag_widget"
                                    style={{ border: "none" }}
                                >
                                    <ul class="tag_list">
                                        <li class="list-inline-item">
                                            <a href="#">Course Content</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Curriculam</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Sharp script</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Bookmarks</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Notes</a>
                                        </li>
                                    </ul>
                                    <ul class="tag_list" style={{}}>
                                        <li class="list-inline-item">
                                            <a href="#">Assestment</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Chat Bot</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Glossary</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Real Time examples</a>
                                        </li>
                                    </ul>
                                    <ul class="tag_list" style={{}}>
                                        <li class="list-inline-item">
                                            <a href="#">Dashboard</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">Discussion Blogs</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#">
                                                Give and take options
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="container">
                                <h3>
                                    How would you rate your Satisfaction with
                                    this Course?
                                </h3>
                                <div class="ui_kit_checkbox">
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck1"
                                        >
                                            Very Satisified
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck2"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck2"
                                        >
                                            Satisified
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Neutral
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Dissatisified{" "}
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Very Dissatisfied
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <h3>
                                    How would you rate your Satisfaction with
                                    this Application?
                                </h3>
                                <div class="ui_kit_checkbox">
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck1"
                                        >
                                            Very Satisified
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck2"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck2"
                                        >
                                            Satisified
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Neutral
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Dissatisified{" "}
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck3"
                                        >
                                            Very Dissatisfied
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <h3>
                                    Do you have any additional comments or
                                    Feedback for us?
                                </h3>
                                <div class="form-group">
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="5"
                                    ></textarea>
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

export default CustomerFeedback;
