import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../feedback.css";
import { url } from "../../api";
import swal from "sweetalert";
import { Helmet } from "react-helmet";

function CustomerFeedback() {
    const token = localStorage.getItem("Token");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [postDataHelp, setPostDataHelp] = useState({
        type: "general_review",
        what_for: "Ask for Help ?",
        feedback_about: "",
        description: "",
    });

    // const [postDataFBack, setPostDataFBack] = useState({
    //     type:"general_review",
    //     what_for:"Ask for Help ?",
    //     feedback_about:"",
    //     description:""
    //     })

    // const [postDataBug, setPostDataBug] = useState({
    //     type:"general_review",
    //     what_for:"Ask for Help ?",
    //     feedback_about:"",
    //     description:""
    //     })

    const submitFBack = () => {};

    const submitBug = () => {};

    const submitHelp = async (e) => {
        e.preventDefault();
        console.log(postDataHelp);
        try {
            await Axios.post(`${url}/add-feedback`, postDataHelp, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            swal("Feedback sent successfully", {
                icon: "success",
            });
        } catch (e) {
            swal("Feedback not sent", {
                icon: "error",
            });
        }
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Reach Us | The Pen App</title>
                    <meta name="description" content="Reach us page" />
                </Helmet>
                <section className="">
                    <div class="container-feedback m-auto ">
                        <div class="feedback__main">
                            <div className="container">
                                <div class="shortcode_widget_tab mb0">
                                    <h4>Reach Us</h4>
                                    <div class="ui_kit_tab mt30">
                                        <ul
                                            class="nav nav-tabs d-flex justify-content-center"
                                            id="myTab"
                                            role="tablist"
                                        >
                                            <li class="nav-item feedback__nav">
                                                <a
                                                    class="nav-link"
                                                    id="home-tab"
                                                    data-toggle="tab"
                                                    href="#home"
                                                    role="tab"
                                                    aria-controls="home"
                                                    aria-selected="false"
                                                    style={{ width: "inherit" }}
                                                >
                                                    Provide Feedback
                                                </a>
                                            </li>
                                            <li class="nav-item feedback__nav">
                                                <a
                                                    class="nav-link active"
                                                    id="profile-tab"
                                                    data-toggle="tab"
                                                    href="#profile"
                                                    role="tab"
                                                    aria-controls="profile"
                                                    aria-selected="true"
                                                    style={{ width: "inherit" }}
                                                >
                                                    Report Bug
                                                </a>
                                            </li>
                                            <li class="nav-item feedback__nav">
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
                                                class="tab-pane fade "
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
                                                    <div class="feedback__subbtn__container">
                                                        <button
                                                            class="feedback__subbtn"
                                                            onClick={
                                                                submitFBack
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div
                                                class="tab-pane fade show active"
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
                                                            Brief us a little
                                                            more
                                                        </h5>
                                                        <textarea
                                                            class="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                    <div class="feedback__subbtn__container">
                                                        <button
                                                            class="feedback__subbtn"
                                                            onClick={submitBug}
                                                        >
                                                            Submit
                                                        </button>
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
                                                            Mention the subject
                                                            to discuss
                                                        </h5>
                                                        <input
                                                            type="text"
                                                            class="form-control h50"
                                                            id="exampleInputText"
                                                            placeholder=""
                                                            value={
                                                                postDataHelp.feedback_about
                                                            }
                                                            onChange={(e) =>
                                                                setPostDataHelp(
                                                                    {
                                                                        ...postDataHelp,
                                                                        feedback_about:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <h5>
                                                            Brief us a little
                                                            more
                                                        </h5>
                                                        <textarea
                                                            class="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            rows="5"
                                                            value={
                                                                postDataHelp.description
                                                            }
                                                            onChange={(e) =>
                                                                setPostDataHelp(
                                                                    {
                                                                        ...postDataHelp,
                                                                        description:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                        ></textarea>
                                                    </div>
                                                    <div class="feedback__subbtn__container">
                                                        <button
                                                            class="feedback__subbtn"
                                                            onClick={submitHelp}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default CustomerFeedback;
