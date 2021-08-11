import React, { useState } from "react";
import Navbar from "./Nav";
import "./codepen.scss";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { url } from "./api";
import swal from "sweetalert";

function CodePen() {
    //form code
    const { register, handleSubmit, watch, reset, errors } = useForm();
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        reset: reset2,
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: register3,
        errors: errors3,
        handleSubmit: handleSubmit3,
        reset: reset3,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        console.log(data);
        data.type = "feedback";

        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + localStorage.getItem("pn_en"),
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url + "/add-feedback", option);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                swal({
                    text: "Feedback submitted ",
                    icon: "success",
                });
            }
        } catch (error) {
            swal({
                text: "Cannot connect to server",
                icon: "error",
            });
        }
        reset();
    };

    const onSubmit2 = async (data) => {
        console.log(data);
        data.type = "report";

        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + localStorage.getItem("pn_en"),
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url + "/add-feedback", option);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                swal({
                    text: "Report submitted ",
                    icon: "success",
                });
            }
        } catch (error) {
            swal({
                text: "Cannot connect to server",
                icon: "error",
            });
        }
        reset2();
    };

    const onSubmit3 = async (data) => {
        console.log(data);
        data.type = "help";

        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + localStorage.getItem("pn_en"),
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url + "/add-feedback", option);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                swal({
                    text: "Help request submitted ",
                    icon: "success",
                });
            }
        } catch (error) {
            swal({
                text: "Cannot connect to server",
                icon: "error",
            });
        }
        reset3();
    };

    //tab animations code
    const [tab, SetTab] = useState("London");

    function openTabs(e) {
        console.log(e, "target");
        SetTab(e.target.dataset.country);
    }
    function opentabs(e) {
        SetTab(e.target.dataset.title);
    }

    console.log(tab);

    return (
        <React.Fragment>
            <Navbar></Navbar>
            <React.Fragment>
                <div className="container" style={{ paddingTop: "81px" }}>
                    <div id="wrapper" className="p-5">
                        <div className="content">
                            <div className="tabs">
                                <button
                                    className={
                                        "tablinks " +
                                        (tab == "London" ? "active" : "")
                                    }
                                    data-country="London"
                                    onClick={(e) => {
                                        openTabs(e);
                                    }}
                                >
                                    <p
                                        // data-title="Feedback"
                                        data-country="London"
                                        onClick={(e) => {
                                            openTabs(e);
                                        }}
                                    >
                                        Feedback
                                    </p>
                                </button>
                                <button
                                    className={
                                        "tablinks " +
                                        (tab == "Paris" && "active")
                                    }
                                    data-country="Paris"
                                    onClick={(e) => {
                                        openTabs(e);
                                    }}
                                >
                                    <p
                                        // data-title="Report"
                                        data-country="Paris"
                                        onClick={(e) => {
                                            openTabs(e);
                                        }}
                                    >
                                        Report
                                    </p>
                                </button>
                                <button
                                    className={
                                        "tablinks " +
                                        (tab == "Barcelona" && "active")
                                    }
                                    data-country="Barcelona"
                                    onClick={(e) => {
                                        openTabs(e);
                                    }}
                                >
                                    <p
                                        // data-title="Help"
                                        data-country="Barcelona"
                                        onClick={(e) => {
                                            openTabs(e);
                                        }}
                                    >
                                        Help
                                    </p>
                                </button>
                            </div>

                            <div className="wrapper_tabcontent">
                                <div
                                    id="London"
                                    className={
                                        "tabcontent " +
                                        (tab == "London" && "active")
                                    }
                                >
                                    {/* <h3>Feedback</h3> */}

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <h5>
                                                What is your feedback about ?
                                            </h5>
                                            <input
                                                type="text"
                                                name="feedback"
                                                className="form-control h50"
                                                id="exampleInputText"
                                                ref={register}
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="form-group">
                                            <h5>Tell us little more</h5>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                id="exampleFormControlTextarea1"
                                                ref={register}
                                                rows="5"
                                            ></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn feed-submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div
                                    id="Paris"
                                    className={
                                        "tabcontent " +
                                        (tab == "Paris" && "active")
                                    }
                                >
                                    {/* <h3>Report</h3> */}
                                    <p>
                                        <form
                                            onSubmit={handleSubmit2(onSubmit2)}
                                        >
                                            <div className="form-group">
                                                <h5>What is the bug faced?</h5>
                                                <input
                                                    type="text"
                                                    name="feedback"
                                                    className="form-control h50"
                                                    id="exampleInputText"
                                                    placeholder=""
                                                    ref={register2}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h5>Breif us a little more</h5>
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="5"
                                                    name="description"
                                                    ref={register2}
                                                ></textarea>
                                            </div>
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn feed-submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </p>
                                </div>

                                <div
                                    id="Barcelona"
                                    className={
                                        "tabcontent " +
                                        (tab == "Barcelona" && "active")
                                    }
                                >
                                    {/* <h3>Help</h3> */}
                                    <p>
                                        <form
                                            onSubmit={handleSubmit3(onSubmit3)}
                                        >
                                            <div className="form-group">
                                                <h5>
                                                    Mention to subject to
                                                    discuss
                                                </h5>
                                                <input
                                                    type="text"
                                                    className="form-control h50"
                                                    id="exampleInputText"
                                                    placeholder=""
                                                    name="feedback"
                                                    ref={register3}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h5>Breif us a little more</h5>
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="5"
                                                    name="description"
                                                    ref={register3}
                                                ></textarea>
                                            </div>
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn feed-submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default CodePen;
