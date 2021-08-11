import React, { useState, useEffect } from "react";
import NavMain from "./Nav";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./GiveAndTake.css";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import Tilt from "react-tilt";
import axios from "axios";
import { url } from "./api";

function GiveAndTakes() {
    const [table, setTable] = useState("");
    const [course, setCourse] = useState("");
    const [modal, setModal] = useState(false);
    const [giveCourseTitle, setGiveCourseTitle] = useState("none");
    const [giveCourseDescription, setGiveCourseDescription] = useState("");
    const toggle = () => setModal(!modal);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [fileimage, setFileimages] = useState([File]);

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        const startup = () => {
            return (
                <React.Fragment>
                    <div class="col-lg-12 p0">
                        <div class="courses_list_content">
                            <div class="top_courses list">
                                <div class="details">
                                    <div class="tc_content">
                                        <p></p>
                                        <a href="/freecourse" target="_blank">
                                            {" "}
                                            <h5>
                                                Introduction Web Design with
                                                HTML{" "}
                                                <span class="tag">
                                                    Best Seller
                                                </span>
                                            </h5>
                                        </a>
                                        <p>
                                            Learn how to build prototypes in
                                            Sketch. Find out how to prototype an
                                            image carousel for a website or
                                            mobile app, with these Sketch
                                            prototyping tips.
                                        </p>
                                    </div>
                                    <div class="tc_footer">
                                        <ul class="tc_meta float-left fn-414">
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-profile"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">1548</a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-comment"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">25</a>
                                            </li>
                                        </ul>
                                        <div class="tc_price float-right fn-414">
                                            100 points
                                        </div>
                                        <ul class="tc_review float-right fn-414">
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
                                                <a href="#">(5)</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={buySwal}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 p0">
                        <div class="courses_list_content">
                            <div class="top_courses list">
                                <div class="details">
                                    <div class="tc_content">
                                        <p></p>
                                        <a href="/freecourse" target="_blank">
                                            {" "}
                                            <h5>
                                                Introduction Web Design with
                                                HTML{" "}
                                                <span class="tag">
                                                    Best Seller
                                                </span>
                                            </h5>
                                        </a>
                                        <p>
                                            Learn how to build prototypes in
                                            Sketch. Find out how to prototype an
                                            image carousel for a website or
                                            mobile app, with these Sketch
                                            prototyping tips.
                                        </p>
                                    </div>
                                    <div class="tc_footer">
                                        <ul class="tc_meta float-left fn-414">
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-profile"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">1548</a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-comment"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">25</a>
                                            </li>
                                        </ul>
                                        <div class="tc_price float-right fn-414">
                                            100 points
                                        </div>
                                        <ul class="tc_review float-right fn-414">
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
                                                <a href="#">(5)</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={buySwal}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 p0">
                        <div class="courses_list_content">
                            <div class="top_courses list">
                                <div class="details">
                                    <div class="tc_content">
                                        <p></p>
                                        <a href="/freecourse" target="_blank">
                                            {" "}
                                            <h5>
                                                Introduction Web Design with
                                                HTML{" "}
                                                <span class="tag">
                                                    Best Seller
                                                </span>
                                            </h5>
                                        </a>
                                        <p>
                                            Learn how to build prototypes in
                                            Sketch. Find out how to prototype an
                                            image carousel for a website or
                                            mobile app, with these Sketch
                                            prototyping tips.
                                        </p>
                                    </div>
                                    <div class="tc_footer">
                                        <ul class="tc_meta float-left fn-414">
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-profile"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">1548</a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-comment"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">25</a>
                                            </li>
                                        </ul>
                                        <div class="tc_price float-right fn-414">
                                            200 points
                                        </div>
                                        <ul class="tc_review float-right fn-414">
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
                                                <a href="#">(5)</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={buySwal}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 p0">
                        <div class="courses_list_content">
                            <div class="top_courses list">
                                <div class="details">
                                    <div class="tc_content">
                                        <p></p>
                                        <h5>
                                            Introduction Web Design with HTML{" "}
                                            <span class="tag">Best Seller</span>
                                        </h5>
                                        <p>
                                            Learn how to build prototypes in
                                            Sketch. Find out how to prototype an
                                            image carousel for a website or
                                            mobile app, with these Sketch
                                            prototyping tips.
                                        </p>
                                    </div>
                                    <div class="tc_footer">
                                        <ul class="tc_meta float-left fn-414">
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-profile"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">1548</a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">
                                                    <i class="flaticon-comment"></i>
                                                </a>
                                                Swal{" "}
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">25</a>
                                            </li>
                                        </ul>
                                        <div class="tc_price float-right fn-414">
                                            150 points
                                        </div>
                                        <ul class="tc_review float-right fn-414">
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
                                                <a href="#">(5)</a>
                                            </li>
                                        </ul>
                                    </div>
                                    buySwal
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={buySwal}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        };
        setCourse(startup);
    }, []);
    function buySwal() {
        return swal({
            text: "Succesfully uploaded Course All the best",
            icon: "success",
        });
    }

    function populateCourse() {
        // const renderCourse = () => {
        //     return (
        //         <div class="col-lg-12 p0 m-3">
        //             <div class="courses_list_content">
        //                 <div class="top_courses list">
        //                     <div class="details">
        //                         <div class="tc_content">
        //                             <p></p>
        //                             <a href="/freecourse">
        //                                 <h5>
        //                                     Introduction Web Design with HTML{" "}
        //                                     <span class="tag">Best Seller</span>
        //                                 </h5>
        //                             </a>
        //                             <p>
        //                                 Learn how to build prototypes in Sketch.
        //                                 Find out how to prototype an image
        //                                 carousel for a website or mobile app,
        //                                 with these Sketch prototyping tips.
        //                             </p>
        //                         </div>
        //                         <div class="tc_footer">
        //                             <ul class="tc_meta float-left fn-414">
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="flaticon-profile"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">1548</a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="flaticon-comment"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">25</a>
        //                                 </li>
        //                             </ul>
        //                             <div class="tc_price float-right fn-414">
        //                                 100 points
        //                             </div>
        //                             <ul class="tc_review float-right fn-414">
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="fa fa-star"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="fa fa-star"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="fa fa-star"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="fa fa-star"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">
        //                                         <i class="fa fa-star"></i>
        //                                     </a>
        //                                 </li>
        //                                 <li class="list-inline-item">
        //                                     <a href="#">(5)</a>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                         <div className="d-flex justify-content-end">
        //                             <button
        //                                 className="btn btn-primary mt-3"
        //                                 onClick={buySwal}
        //                             >
        //                                 Buy
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // };

        // setCourse(renderCourse);

        const formdata = new FormData();
        formdata.append("title", giveCourseTitle);
        formdata.append("description", giveCourseDescription);
        formdata.append("file", acceptedFiles);

        axios.post(`${url}/give-course`, formdata, {
            headers: {
                //   "Content-Type": "application/json",
                Authorization: "Basic " + localStorage.getItem("pn_en"),
            },
        });

        toggle();
        return swal({
            text: "Thank you for submitting the content. We will get back to you within 2-3 business days",
            icon: "success",
        });
    }

    function giveCoursefn(e) {
        console.log(e.target.value);
        setGiveCourseTitle(e.target.value);
        if (e.target.value != "none") {
            if (e.target.value == "others") {
                const pointsTable = () => {
                    return (
                        <React.Fragment>
                            <div class="form-group">
                                <h5>Enter Course Name</h5>
                                <input
                                    type="text"
                                    class="form-control h50"
                                    id="exampleInputText"
                                    placeholder="Creative Layers"
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={toggle}
                            >
                                Start Giving to Unlock Courses
                            </button>
                        </React.Fragment>
                    );
                };

                setTable(pointsTable);
            } else {
                console.log("hello if 1");
                const pointsTable = () => {
                    return (
                        <React.Fragment>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th>Max-Points</th>
                                        <td>100 points</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                className="btn btn-primary"
                                onClick={toggle}
                            >
                                Start Giving to Unlock Courses
                            </button>
                        </React.Fragment>
                    );
                };
                setTable(pointsTable);
            }
        } else {
            console.log("hello if 2");
            setTable("");
        }
    }
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                <Modal isOpen={modal} toggle={toggle} centered={true}>
                    <ModalHeader toggle={toggle}>Start giving</ModalHeader>
                    <ModalBody>
                        <h4 class="mb20" for="desc">
                            Description
                        </h4>
                        <textarea
                            id="desc"
                            type="text"
                            value={giveCourseDescription}
                            style={{ width: "100%" }}
                            onChange={(e) => {
                                setGiveCourseDescription(e.target.value);
                            }}
                        ></textarea>
                        <h4 class="mb20" for="desc">
                            Attachment
                        </h4>
                        <div class="col-lg-4">
                            <div class="shortcode_widget_checkbox">
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
                                            Text
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
                                            Video
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
                                            PPT/PPTX
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container border-custom">
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                </p>
                            </div>
                            <aside>
                                <h4></h4>
                                <ul>{files}</ul>
                            </aside>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={populateCourse}>
                            Upload
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <div className="mb-3" style={{ marginTop: "100px" }}>
                    <div className="container-fluid">
                        {/* <Tilt
              className="Tilt"
              options={{ max: 25, perspective: 1000 }}
              style={{ height: "inherit", width: "inherit" }}
            > */}
                        {/* <div className="d-flex justify-content-end">
                            <div class="player-stats m-3 ">
                                <dt class="player-stat">
                                    Available <br />
                                    Points
                                </dt>
                                <dd class="player-stat-number">46</dd>
                            </div>
                        </div> */}
                        {/* </Tilt> */}

                        <div className="row m-auto col-10">
                            <div className="col-lg-2 m-auto">
                                <div className="d-flex justify-content-end">
                                    <div class="player-stats m-3 ">
                                        <div class="player-stat d-flex align-items-center">
                                            Available <br />
                                            Points
                                        </div>
                                        <dd class="player-stat-number">46</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row m-auto col-12">
                            <div className="col-lg-6 ml-auto mr-auto col-sm-12">
                                <Card className="p-3 box-shadow-custom mb-sm-3">
                                    <div className="">
                                        <h2 className="text-center">
                                            Give Courses
                                        </h2>
                                    </div>
                                    <Card.Body>
                                        <Card.Text>
                                            <div class="ui_kit_select_box">
                                                {/* <h4>Select Course</h4> */}
                                                <select
                                                    class="selectpicker custom-select-lg mb-3"
                                                    onChange={giveCoursefn}
                                                >
                                                    <option value="0">
                                                        Select Course
                                                    </option>
                                                    <option value="Business Writing">
                                                        Business Writing
                                                    </option>
                                                    <option value="Best Practices in Project Management">
                                                        Best Practices in
                                                        Project Management
                                                    </option>
                                                    <option value="Python Development">
                                                        Python Development
                                                    </option>
                                                    <option value="Big Data">
                                                        Big Data
                                                    </option>
                                                    <option value="Data Science">
                                                        Data Science
                                                    </option>
                                                    <option value="IOT">
                                                        IOT
                                                    </option>
                                                    <option value="5G">
                                                        5G
                                                    </option>
                                                    <option value="Basics of Music">
                                                        Basics of Music
                                                    </option>
                                                    <option value="Block Chain Technology">
                                                        Block Chain Technology
                                                    </option>
                                                    <option value="Tableau">
                                                        Tableau
                                                    </option>
                                                    <option value="Branding">
                                                        Branding
                                                    </option>
                                                    <option value="Basics of programming">
                                                        Basics of programming
                                                    </option>
                                                    <option value="Film Making">
                                                        Film Making
                                                    </option>
                                                    <option value="Other">
                                                        Other
                                                    </option>
                                                </select>
                                            </div>
                                            {table}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-lg-6 ml-auto mr-auto col-sm-12 ">
                                <Card className="p-3 box-shadow-custom d-flex-fixed">
                                    <div className="">
                                        <h2 className="text-center">
                                            Take Courses
                                        </h2>
                                    </div>
                                    <Card.Body className="card-header-custom pt-1">
                                        <div className=""></div>

                                        <Card.Text className="">
                                            <div className="scrollable-div ">
                                                {course}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row  align-items-center">
                        <div className="col-sm-6" style={{ zIndex: "-1" }}>
                            <img
                                src="./images/2085674.png"
                                alt=""
                                className="img img-fluid"
                            />
                        </div>
                        <div className="col-sm-6">
                            <div class="about_thumb_home3 text-right">
                                <div class="text-center iframe-container">
                                    <iframe
                                        src="https://www.youtube.com/embed/Maz7qkLzwYw"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
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

export default GiveAndTakes;
