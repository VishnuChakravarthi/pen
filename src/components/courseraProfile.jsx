import React, { useState, useEffect } from "react";
// import Navbar from "./Nav";
import ProgressBar from "react-animated-progress-bar";
import Wishlist from "./Wishlist";
import axios from "axios";
import swal from "sweetalert";

function CourseraProfile() {
    const [section, setSection] = useState("profile");
    const [isEdit, setEdit] = useState(false);
    const [profile, setProfile] = useState({});
    const sectionFn = (e, name) => {
        setSection(name);
        console.log(e);
    };
    const logout = async () => {
        const token = localStorage.getItem("Token");
        await axios({
            method: "post",
            url: "http://epen.nyxwolves.tech/api/logout",
            headers: { Authorization: `Basic ${token}` },
        }).then(function (res) {
            console.log(res.data);
            localStorage.removeItem("Token");
            window.location.href = "/";
        });
    };
    const getprofile = async () => {
        const token = localStorage.getItem("Token");
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/my-profile",
            headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
            console.log(res.data.data, "profile");
            setProfile(res.data.data);
        });
    };
    const getCourses = async () => {
        const token = localStorage.getItem("Token");
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/mypurchase",
            headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
            console.log(res.data.data, "courses");
            setProfile(res.data.data);
        });
    };
    const editprofile = async () => {
        const token = localStorage.getItem("Token");
        await axios({
            method: "post",
            url: "http://epen.nyxwolves.tech/api/my-profile",
            headers: { Authorization: `Basic ${token}` },
            data: profile,
        })
            .then((res) => {
                console.log(res);
                swal({
                    text: res.data.success,
                    icon: "success",
                });
            })
            .catch((err) => {
                console.log(err);
                swal({
                    text: "Cannot connect to server",
                    icon: "error",
                });
            });
        setEdit(false);
    };
    useEffect(() => {
        getprofile();
        getCourses();
    }, []);
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            {/* sidebar */}
            <div className="container-fluid" style={{ paddingTop: "90px" }}>
                <div className="row">
                    <div className="col-sm-2">
                        <div className="m-3 text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                className="rounded-circle"
                            />

                            <h4
                                className="bold text-capitalize m-3"
                                style={{ fontWeight: "700" }}
                            >
                                {profile.name}
                            </h4>
                        </div>
                        <div className="sidebar-content">
                            <ul>
                                <li
                                    className="profile-side-content"
                                    onClick={(e) => sectionFn(e, "profile")}
                                >
                                    My Profile
                                </li>
                                <li
                                    className="profile-side-content"
                                    onClick={(e) => sectionFn(e, "courses")}
                                >
                                    My Courses
                                </li>
                                <li
                                    className="profile-side-content"
                                    onClick={(e) => sectionFn(e, "wishlist")}
                                >
                                    Wishlist
                                </li>
                                <li
                                    className="profile-side-content"
                                    onClick={(e) =>
                                        sectionFn(e, "coursesUploaded")
                                    }
                                >
                                    Courses Uploaded
                                </li>
                                <li
                                    className="profile-side-content"
                                    onClick={(e) =>
                                        sectionFn(e, "changepassword")
                                    }
                                >
                                    Change Password
                                </li>
                                <li
                                    className="profile-side-content"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="col-sm-10  p-0"
                        style={{ background: "#e1e1e1", height: "91.5vh" }}
                    >
                        <div className="container-fluid title-block p-3">
                            <div className="title text-center ">
                                <h3>PROFILE</h3>
                            </div>
                            <div className="sub-text text-center">
                                <h4>
                                    Information of yourself to show in your
                                    profile
                                </h4>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                height: section === "courses" ? "80%" : "",
                            }}
                        >
                            <div
                                className={
                                    section === "wishlist" ? "" : "d-none"
                                }
                            >
                                <Wishlist />
                            </div>
                            <div
                                className={
                                    section === "profile"
                                        ? "content-section-profile mt-3 mb-3 "
                                        : "d-none"
                                }
                                id="profile"
                                style={{
                                    width: "65%",
                                    margin: "auto",
                                }}
                            >
                                <div className="container">
                                    <h3
                                        className="text-center mb-3"
                                        style={{ position: "relative" }}
                                    >
                                        <span>INFO</span>
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            style={{
                                                position: "absolute",
                                                right: "0",
                                            }}
                                            onClick={() => {
                                                setEdit(true);
                                            }}
                                        >
                                            <i class="fas fa-lg fa-edit"></i>
                                            &nbsp;Edit
                                        </button>
                                    </h3>
                                    <form action="" method="POST">
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="username"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Username
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    value={profile.name}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            name: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Email
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            email: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Phone
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    value={profile.phoneno}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            phoneno:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="dob"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Date of Birth
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="dob"
                                                    placeholder="Ex: 29/3/2020"
                                                    value={profile.dateofbirth}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            dateofbirth:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                placeholder="Ex: Male/Female"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Gender
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="gender"
                                                    value={profile.gender}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            gender: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                State
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    placeholder="Ex: Tamilnadu"
                                                    value={profile.state}
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            state: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                City
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={profile.city}
                                                    placeholder="Ex: Chennai"
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            city: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2  col-form-label"
                                                for="simpleinput"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Country
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="country"
                                                    value={profile.country}
                                                    placeholder="Ex: India"
                                                    onChange={(e) => {
                                                        setProfile({
                                                            ...profile,
                                                            country:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    disabled={!isEdit}
                                                />
                                            </div>
                                        </div>
                                        {isEdit ? (
                                            <div className="text-right">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        editprofile();
                                                    }}
                                                >
                                                    Save
                                                </button>{" "}
                                                <button
                                                    className="btn btn-default"
                                                    onClick={() => {
                                                        setEdit(false);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </form>
                                </div>
                            </div>

                            <div
                                className={
                                    section === "courses"
                                        ? "content-section-courses"
                                        : "d-none"
                                }
                                id="courses"
                                style={{
                                    width: "80%",
                                    margin: "auto",
                                }}
                            >
                                <h3 className="text-center mb-3">COURSES</h3>
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
                                                            React js by Kema
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
                                                        Overall percentage
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
                                                                    Days Left
                                                                    <span id="days">
                                                                        45
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Time Spent
                                                                    <span id="minutes">
                                                                        80 mins
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Overall
                                                                    Score
                                                                    <span id="hours">
                                                                        45 pts
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Assesment
                                                                    Score
                                                                    <span id="hours">
                                                                        20 pts
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
                                                            HTML CSS3 SASS by
                                                            Brad Traversery
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
                                                        Overall percentage
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
                                                                    Days Left
                                                                    <span id="days">
                                                                        45
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Time Spent
                                                                    <span id="minutes">
                                                                        80 mins
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Overall
                                                                    Score
                                                                    <span id="hours">
                                                                        45 pts
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Assesment
                                                                    Score
                                                                    <span id="hours">
                                                                        20 pts
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
                                                            Next.js by Coding
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
                                                        Overall percentage
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
                                                                    Days Left
                                                                    <span id="days">
                                                                        45
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Time Spent
                                                                    <span id="minutes">
                                                                        80 mins
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Overall
                                                                    Score
                                                                    <span id="hours">
                                                                        45 pts
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    Assesment
                                                                    Score
                                                                    <span id="hours">
                                                                        20 pts
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
                            <div
                                className={
                                    section === "coursesUploaded"
                                        ? "content-section-coursesUploaded"
                                        : "d-none"
                                }
                                id="coursesUploaded"
                                style={{
                                    width: "80%",
                                    margin: "auto",
                                    marginTop: "20px",
                                }}
                            >
                                <h3 className="text-center mb-3">
                                    COURSES UPLOADED
                                </h3>
                                <div class="ui_kit_table">
                                    <table class="table">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Course Name</th>
                                                <th scope="col">
                                                    Uploaded Date
                                                </th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Points</th>
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
                                                <td>Html and css</td>
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
                            <div
                                className={
                                    section === "changepassword"
                                        ? "content-section-changepassword"
                                        : "d-none"
                                }
                                id="changepassword"
                                style={{
                                    width: "80%",
                                }}
                            >
                                <h3 className="text-center mb-3">
                                    CHANGE PASSWORD
                                </h3>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-2 col-form-label"
                                        for="simpleinput"
                                        style={{ fontWeight: "600" }}
                                    >
                                        Enter old Password
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="old_password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-2  col-form-label"
                                        for="simpleinput"
                                        style={{ fontWeight: "600" }}
                                    >
                                        Enter New Password
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-2  col-form-label"
                                        for="simpleinput"
                                        style={{ fontWeight: "600" }}
                                    >
                                        Re-enter Password
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password_again"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-end flex-column">
                                    <button className="btn btn-learning">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CourseraProfile;
