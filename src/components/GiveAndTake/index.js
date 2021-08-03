import React, { useState, useEffect } from "react";
// import NavMain from "./Nav";
import Card from "react-bootstrap/Card";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./GiveAndTake.css";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import axios from "axios";
import { url } from "../api";
import Axios from "axios";
import { Helmet } from "react-helmet";

// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SettingsOutlined } from "@material-ui/icons";
// import NativeSelect from "@material-ui/core/NativeSelect";

function GiveAndTake() {
    const [table, setTable] = useState("");
    const [titleName, setTitleName] = useState();
    const [points, setPoints] = useState("");
    const [takeCourses, setTakeCourses] = useState([]);
    const [giveCourse, setGiveCourse] = useState("");
    const [modal, setModal] = useState(false);
    const [giveCourseTitle, setGiveCourseTitle] = useState("");
    const [giveCourseDescription, setGiveCourseDescription] = useState("");
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    // const [fileimage, setFileimages] = useState([File]);

    const token = localStorage.getItem("Token");

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    console.log(titleName);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tag = () => {
        console.log(titleName);
        console.log(giveCourseTitle);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    useEffect(() => {
        // setCourse(startup());
        // fetchGivenCourses();
        getprofile();
        fetchTakeCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const takeCourse = async (course_id, course_point) => {
        if (course_point < points) {
            const postData = {
                course_id: course_id,
                pack: 0,
                price: course_point,
                points: 0,
            };
            try {
                const response = await Axios.post(`${url}/purchase`, postData, {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                });

                console.log(response.data);
                return swal("Purchase Successfull", {
                    icon: "success",
                });
            } catch (e) {
                console.log(e);
                return swal({
                    text: "Purchase unsuccessful",
                    icon: "error",
                });
            }
        } else {
            return swal({
                text: "Not enough points to redeem course",
                icon: "warning",
            });
        }
    };

    const getprofile = async () => {
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/my-profile",
            headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
            // console.log(res.data.data, "profile");
            setPoints(res.data.data.points);
        });
    };

    const fetchTakeCourses = async () => {
        try {
            const response = await Axios.get(`${url}/view-pointed-courses`, {
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(response.data.data);
            setTakeCourses(response.data.data);
        } catch (e) {}
    };

    // console.log(givenCourses);

    const handleChange = (e) => {
        console.log(e.target + "handleeeeee change");
        setTitleName("");
        setGiveCourseDescription("");
        setGiveCourseTitle("");
        setGiveCourse(e.target.value);
        giveCoursefn(e);
    };

    const startup = () => {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Give and Take | The Pen App</title>
                    <meta name="description" content="Give and Take courses" />
                </Helmet>
                {takeCourses.map((course, i) => (
                    <div
                        key={i}
                        className="courses_list_content_main col-lg-12 p0"
                    >
                        <div className="courses_list_content">
                            <div className="top_courses list">
                                <div className="details">
                                    <div className="tc_content">
                                        <p></p>
                                        <a
                                            rel="noopener noreferrer"
                                            href="/freecourse"
                                            target="_blank"
                                        >
                                            {" "}
                                            <h5 className="d-flex justify-content-between">
                                                {course.course_title}
                                                <span className="tag">
                                                    Best Seller
                                                </span>
                                            </h5>
                                        </a>
                                        <p>{course.course_description}</p>
                                    </div>
                                    <div className="tc_footer">
                                        <div className="tc_price float-right fn-414">
                                            {course.price1} points
                                        </div>
                                        <span
                                            className="list-inline-item float-right"
                                            style={{
                                                color: "#606470",
                                                marginRight: "20px",
                                            }}
                                        >
                                            ({course.rating_count})
                                        </span>
                                        <ul
                                            className="tc_review float-right fn-414"
                                            style={{
                                                fontSize: "25px",
                                                margin: "0px",
                                            }}
                                        >
                                            {Array(course.rating)
                                                .fill()
                                                .map((_, i) => (
                                                    <span
                                                        key={(_, i)}
                                                        style={{
                                                            color: "#608a24",
                                                        }}
                                                    >
                                                        &#128970;
                                                    </span>
                                                ))}
                                            {Array(5 - course.rating)
                                                .fill()
                                                .map((_, i) => (
                                                    <span key={(_, i)}>
                                                        &#128970;
                                                    </span>
                                                ))}
                                            {/* <li className="list-inline-item">
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star"></i>
                                            </li> */}
                                        </ul>
                                    </div>
                                    <div className="tc_button d-flex justify-content-end">
                                        <button
                                            className="mt-3 buy__btn btn__buy hover__filled"
                                            onClick={() =>
                                                takeCourse(
                                                    course.course_id,
                                                    course.price1
                                                )
                                            }
                                        >
                                            <span style={{ padding: "10px" }}>
                                                Take Course
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    };

    function populateCourse() {
        const formdata = new FormData();
        formdata.append("title", giveCourseTitle);
        formdata.append("description", giveCourseDescription);
        formdata.append("file", acceptedFiles);
        console.log("giveCoursetitle outer", giveCourseTitle);
        console.log("giveCourseDescription outer", acceptedFiles.length);
        if (
            giveCourseTitle !== "" &&
            giveCourseDescription !== "" &&
            acceptedFiles.length
        ) {
            console.log("giveCoursetitle inner", giveCourseTitle);
            console.log("giveCourseDescription inner", giveCourseDescription);
            axios
                .post(`${url}/give-course`, formdata, {
                    headers: {
                        //   "Content-Type": "application/json",
                        Authorization: "Basic " + localStorage.getItem("Token"),
                    },
                })
                .then((_) => {
                    setTitleName("");
                    setGiveCourseDescription("");
                    setGiveCourseTitle("");
                    toggle();

                    return swal({
                        text: "Thank you for submitting the content. We will get back to you within 2-5 business days",
                        icon: "success",
                    });
                });
        } else {
            return swal({
                text: "Please fill all the required fields",
                icon: "error",
            });
        }
    }

    function giveCoursefn(e) {
        console.log(e.target.value);
        setGiveCourseTitle(e.target.value);
        if (e.target.value !== "none") {
            if (e.target.value === "others") {
                const pointsTable = () => {
                    return (
                        <React.Fragment>
                            <div className="form-group">
                                <h5>Enter Course Name</h5>
                                <input
                                    type="text"
                                    className="form-control h50"
                                    id="exampleInputText"
                                    placeholder="Creative Layers"
                                />
                            </div>

                            {/* <div className="tc_button d-flex justify-content-end"> */}
                            <button
                                className="mt-3 buy__btn btn__buy hover__filled"
                                onClick={toggle}
                            >
                                <span style={{ padding: "10px" }}>
                                    Start Giving to Unlock Courses
                                </span>
                            </button>
                            {/* </div> */}
                        </React.Fragment>
                    );
                };

                setTable(pointsTable);
            } else {
                console.log("hello if 1");
                const pointsTable = () => {
                    return (
                        <React.Fragment>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setModal(!modal);
                                }}
                            >
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Max-Points</th>
                                            <td>100 points</td>
                                        </tr>
                                        <tr>
                                            <th>Enter Title</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    required
                                                    onChange={(e) =>
                                                        setTitleName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <button
                                    className="mt-3 buy__btn btn__buy hover__filled"
                                    type="submit"
                                    style={{
                                        borderRadius: "50px",
                                        outline: "none",
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: "10px",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        Start Giving to Unlock Courses
                                    </span>
                                </button>
                            </form>
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
            {/* <NavMain /> */}
            <React.Fragment>
                <Modal isOpen={modal} toggle={toggle}>
                    <h2 toggle={toggle} style={{ textAlign: "center" }}>
                        Start giving
                    </h2>
                    <ModalBody>
                        <h4 className="mb20" for="desc">
                            Description
                        </h4>
                        <textarea
                            id="desc"
                            type="text"
                            value={giveCourseDescription}
                            style={{ width: "100%", marginBottom: "20px" }}
                            onChange={(e) => {
                                setGiveCourseDescription(e.target.value);
                            }}
                        ></textarea>
                        <h4 className="mb20" for="desc">
                            Attachment
                        </h4>
                        <div
                            className="col-lg-4"
                            style={{ marginBottom: "20px" }}
                        >
                            <div className="shortcode_widget_checkbox">
                                <div className="ui_kit_checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label
                                            className="custom-control-label"
                                            for="customCheck1"
                                        >
                                            Text
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck2"
                                        />
                                        <label
                                            className="custom-control-label"
                                            for="customCheck2"
                                        >
                                            Video
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck3"
                                        />
                                        <label
                                            className="custom-control-label"
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
                                {/* <h4></h4> */}
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
                <section>
                    <div className="">
                        <div className="container-fluid">
                            {/* <Tilt
              className="Tilt"
              options={{ max: 25, perspective: 1000 }}
              style={{ height: "inherit", width: "inherit" }}
            > */}
                            {/* <div className="d-flex justify-content-end">
                            <div className="player-stats m-3 ">
                                <dt className="player-stat">
                                    Available <br />
                                    Points
                                </dt>
                                <dd className="player-stat-number">46</dd>
                            </div>
                        </div> */}
                            {/* </Tilt> */}

                            <div className="row m-auto col-10">
                                <div className="col-lg-2 m-auto points__container">
                                    <div className="" width="190px">
                                        <div className="player-stats m-3 ">
                                            <div className="player-stat d-flex align-items-center">
                                                Available <br />
                                                Points
                                            </div>
                                            <dd className="player-stat-number">
                                                {!points ? 0 : points}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-auto col-12">
                                <div className="col-lg-6 ml-auto mr-auto col-sm-12">
                                    <Card
                                        className="p-3 box-shadow-custom mb-sm-3"
                                        style={{ height: "auto" }}
                                    >
                                        <div className="">
                                            <h2 className="text-center">
                                                Give Courses
                                            </h2>
                                        </div>
                                        <Card.Body>
                                            <div>
                                                <div className="ui_kit_select_box">
                                                    <FormControl
                                                        variant="outlined"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {/* <InputLabel id="select-course">
                                                        Select Course
                                                    </InputLabel> */}
                                                        <Select
                                                            native
                                                            // labelId="select-course"
                                                            id="demo-simple-select-outlined"
                                                            value={giveCourse}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            // label="Select course"
                                                        >
                                                            {/* <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem> */}
                                                            {/* <MenuItem value={10}>
                                                            Ten
                                                        </MenuItem>
                                                        <MenuItem value={20}>
                                                            Twenty
                                                        </MenuItem>
                                                        <MenuItem value={30}>
                                                            Thirty
                                                        </MenuItem> */}
                                                            {/* <MenuItem value="Business Writing">
                                                            Business Writing
                                                        </MenuItem>
                                                        <MenuItem value="Best Practices in Project Management">
                                                            Best Practices in
                                                            Project Management
                                                        </MenuItem>
                                                        <MenuItem value="Python Development">
                                                            Python Development
                                                        </MenuItem>
                                                        <MenuItem value="Big Data">
                                                            Big Data
                                                        </MenuItem>
                                                        <MenuItem value="Data Science">
                                                            Data Science
                                                        </MenuItem>
                                                        <MenuItem value="IOT">
                                                            IOT
                                                        </MenuItem>
                                                        <MenuItem value="5G">
                                                            5G
                                                        </MenuItem>
                                                        <MenuItem value="Basics of Music">
                                                            Basics of Music
                                                        </MenuItem>
                                                        <MenuItem value="Block Chain Technology">
                                                            Block Chain
                                                            Technology
                                                        </MenuItem>
                                                        <MenuItem value="Tableau">
                                                            Tableau
                                                        </MenuItem>
                                                        <MenuItem value="Branding">
                                                            Branding
                                                        </MenuItem>
                                                        <MenuItem value="Basics of programming">
                                                            Basics of
                                                            programming
                                                        </MenuItem>
                                                        <MenuItem value="Film Making">
                                                            Film Making
                                                        </MenuItem>
                                                        <MenuItem value="Other">
                                                            Other
                                                        </MenuItem> */}
                                                            <option value="0">
                                                                Select Course
                                                            </option>
                                                            <option value="Business Writing">
                                                                Business Writing
                                                            </option>
                                                            <option value="Best Practices in Project Management">
                                                                Best Practices
                                                                in Project
                                                                Management
                                                            </option>
                                                            <option value="Python Development">
                                                                Python
                                                                Development
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
                                                                Block Chain
                                                                Technology
                                                            </option>
                                                            <option value="Tableau">
                                                                Tableau
                                                            </option>
                                                            <option value="Branding">
                                                                Branding
                                                            </option>
                                                            <option value="Basics of programming">
                                                                Basics of
                                                                programming
                                                            </option>
                                                            <option value="Film Making">
                                                                Film Making
                                                            </option>
                                                            <option value="Other">
                                                                Other
                                                            </option>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                {table}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-lg-6 ml-auto mr-auto col-sm-12 ">
                                    <Card
                                        className="p-3 box-shadow-custom d-flex-fixed"
                                        style={{ height: "70vh" }}
                                    >
                                        <div className="">
                                            <h2 className="text-center">
                                                Take Courses
                                            </h2>
                                        </div>
                                        <Card.Body className="card-header-custom pt-1">
                                            <div className=""></div>

                                            <div className="">
                                                <div className="scrollable-div ">
                                                    {startup()}
                                                </div>
                                            </div>
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
                                <div className="about_thumb_home3 text-right">
                                    <div className="text-center iframe-container">
                                        <iframe
                                            title="iframe"
                                            src="https://www.youtube.com/embed/Maz7qkLzwYw"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
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

export default GiveAndTake;
