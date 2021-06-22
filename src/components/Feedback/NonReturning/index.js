import React from "react";
// import NavMain from "./Nav";
// import Footer from "./Footer";
import "../feedback.css";

function NonReturning() {
    return (
        <React.Fragment>
            {/* <NavMain /> */}
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
                            <div className="container pt-3 pb-3">
                                <h3>
                                    Would you like to use the application, if
                                    you get a coupon?
                                </h3>
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
                                        Yes
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
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="container pt-3 pb-3">
                                <h3>The application is user friendly ?</h3>
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
                                        Yes
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
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="container pt-3 pb-3">
                                <h3>
                                    Please provide suggestions on how we can
                                    improve?
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
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default NonReturning;
