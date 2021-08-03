import React from "react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import ProgressBar from "react-animated-progress-bar";
import Card from "react-bootstrap/Card";

function Profile() {
    return (
        <React.Fragment>
            <Navbar />
            <React.Fragment>
                <section class="inner_page_breadcrumb">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 offset-xl-3 text-center">
                                <div class="breadcrumb_content">
                                    <h4 class="breadcrumb_title">Profile</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="our-team">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="instructor_personal_infor">
                                    <div class="instructor_thumb text-center">
                                        <img
                                            class="img-fluid"
                                            src="images/team/3.png"
                                            alt="3.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-8 col-xl-9">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <section>
                                            <div className="container">
                                                <div className="row">
                                                    <div class="col-md-12 col-lg-12">
                                                        <div class="shortcode_widget_accprdons">
                                                            <h3 className="mb-5">
                                                                Enrolled Courses
                                                                and Performances
                                                            </h3>
                                                            <div class="faq_according">
                                                                <div
                                                                    class="accordion"
                                                                    id="accordionExample"
                                                                >
                                                                    <div class="card">
                                                                        <div
                                                                            class="card-header"
                                                                            id="headingOne"
                                                                        >
                                                                            <h2 class="mb-0">
                                                                                <button
                                                                                    class="btn btn-link"
                                                                                    type="button"
                                                                                    data-toggle="collapse"
                                                                                    data-target="#collapseOne"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapseOne"
                                                                                >
                                                                                    <h3>
                                                                                        React
                                                                                        js
                                                                                        by
                                                                                        Kema
                                                                                        paul
                                                                                    </h3>
                                                                                    <span class="flaticon-right-arrow float-right"></span>
                                                                                </button>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id="collapseOne"
                                                                            class="collapse"
                                                                            aria-labelledby="headingOne"
                                                                            data-parent="#accordionExample"
                                                                        >
                                                                            <div class="card-body">
                                                                                <h4>
                                                                                    Overall
                                                                                    percentage
                                                                                    completed
                                                                                </h4>
                                                                                <ProgressBar
                                                                                    width="400px"
                                                                                    height="10px"
                                                                                    rect
                                                                                    fontColor="gray"
                                                                                    percentage="70"
                                                                                    rectPadding="1px"
                                                                                    rectBorderRadius="20px"
                                                                                    trackPathColor="transparent"
                                                                                    bgColor="#333333"
                                                                                    trackBorderColor="grey"
                                                                                />

                                                                                <div class="event_counter_plugin_container">
                                                                                    <div class="event_counter_plugin_content">
                                                                                        <ul>
                                                                                            <li>
                                                                                                Days
                                                                                                Left
                                                                                                <span id="days">
                                                                                                    45
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Time
                                                                                                Spent
                                                                                                <span id="minutes">
                                                                                                    80
                                                                                                    mins
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Overall
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    45
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Assesment
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    20
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card">
                                                                        <div
                                                                            class="card-header active"
                                                                            id="headingTwo"
                                                                        >
                                                                            <h2 class="mb-0">
                                                                                <button
                                                                                    class="btn btn-link collapsed"
                                                                                    type="button"
                                                                                    data-toggle="collapse"
                                                                                    data-target="#collapseTwo"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapseTwo"
                                                                                >
                                                                                    <h3>
                                                                                        HTML
                                                                                        CSS3
                                                                                        SASS
                                                                                        by
                                                                                        Brad
                                                                                        Traversery
                                                                                    </h3>
                                                                                    <span class="flaticon-right-arrow float-right"></span>
                                                                                </button>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id="collapseTwo"
                                                                            class="collapse show"
                                                                            aria-labelledby="headingTwo"
                                                                            data-parent="#accordionExample"
                                                                        >
                                                                            <div class="card-body">
                                                                                <h4>
                                                                                    Overall
                                                                                    percentage
                                                                                    completed
                                                                                </h4>
                                                                                <ProgressBar
                                                                                    width="400px"
                                                                                    height="10px"
                                                                                    rect
                                                                                    fontColor="gray"
                                                                                    percentage="60"
                                                                                    rectPadding="1px"
                                                                                    rectBorderRadius="20px"
                                                                                    trackPathColor="transparent"
                                                                                    bgColor="#333333"
                                                                                    trackBorderColor="grey"
                                                                                />

                                                                                <div class="event_counter_plugin_container">
                                                                                    <div class="event_counter_plugin_content">
                                                                                        <ul>
                                                                                            <li>
                                                                                                Days
                                                                                                Left
                                                                                                <span id="days">
                                                                                                    45
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Time
                                                                                                Spent
                                                                                                <span id="minutes">
                                                                                                    80
                                                                                                    mins
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Overall
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    45
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Assesment
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    20
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card">
                                                                        <div
                                                                            class="card-header"
                                                                            id="headingThree"
                                                                        >
                                                                            <h2 class="mb-0">
                                                                                <button
                                                                                    class="btn btn-link collapsed"
                                                                                    type="button"
                                                                                    data-toggle="collapse"
                                                                                    data-target="#collapseThree"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapseThree"
                                                                                >
                                                                                    <h3>
                                                                                        {" "}
                                                                                        Next.js
                                                                                        by
                                                                                        Coding
                                                                                        Train
                                                                                    </h3>
                                                                                    <span class="flaticon-right-arrow float-right"></span>
                                                                                </button>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id="collapseThree"
                                                                            class="collapse"
                                                                            aria-labelledby="headingThree"
                                                                            data-parent="#accordionExample"
                                                                        >
                                                                            <div class="card-body">
                                                                                <h4>
                                                                                    Overall
                                                                                    percentage
                                                                                    completed
                                                                                </h4>
                                                                                <ProgressBar
                                                                                    width="400px"
                                                                                    height="10px"
                                                                                    rect
                                                                                    fontColor="gray"
                                                                                    percentage="80"
                                                                                    rectPadding="1px"
                                                                                    rectBorderRadius="20px"
                                                                                    trackPathColor="transparent"
                                                                                    bgColor="#333333"
                                                                                    trackBorderColor="grey"
                                                                                />

                                                                                <div class="event_counter_plugin_container">
                                                                                    <div class="event_counter_plugin_content">
                                                                                        <ul>
                                                                                            <li>
                                                                                                Days
                                                                                                Left
                                                                                                <span id="days">
                                                                                                    45
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Time
                                                                                                Spent
                                                                                                <span id="minutes">
                                                                                                    80
                                                                                                    mins
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Overall
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    45
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                            <li>
                                                                                                Assesment
                                                                                                Score
                                                                                                <span id="hours">
                                                                                                    20
                                                                                                    pts
                                                                                                </span>
                                                                                            </li>
                                                                                        </ul>
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
                                            </div>
                                        </section>
                                        <div className="container">
                                            <h3>Courses Uploaded</h3>
                                            <div class="ui_kit_table">
                                                <table class="table">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th scope="col">
                                                                Course Name
                                                            </th>
                                                            <th scope="col">
                                                                Uploaded Date
                                                            </th>
                                                            <th scope="col">
                                                                Status
                                                            </th>
                                                            <th scope="col">
                                                                Points
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Adobe Xd</td>
                                                            <td>21/05/2020</td>
                                                            <td>
                                                                <span className="badge badge-success">
                                                                    Accepted
                                                                </span>
                                                            </td>
                                                            <td>100Points</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Html and css
                                                            </td>
                                                            <td>2/06/2020</td>
                                                            <td>
                                                                <span className="badge badge-warning">
                                                                    Processing
                                                                </span>
                                                            </td>
                                                            <td>100Points</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-xl-3">
                                <div class="selected_filter_widget style2 mb30">
                                    <div class="siderbar_contact_widget">
                                        <h4>Contact</h4>
                                        <p>Phone Number</p>
                                        <i>+765895465877</i>
                                        <p>Email</p>
                                        <i>info@alitufan.com</i>
                                    </div>
                                </div>
                                <div class="selected_filter_widget style2">
                                    <div class="siderbar_contact_widget">
                                        <p>Total Courses</p>
                                        <i>3</i>
                                        <p>Total Points</p>
                                        <i>2200</i>
                                        <p>Ranking</p>
                                        <i>22</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default Profile;
