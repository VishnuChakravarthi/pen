import React, { useState, useEffect } from "react";
// import Navbar from "./Nav";
import Wishlist from "../../Wishlist";
import axios from "axios";
import swal from "sweetalert";
import ChangePassword from "./Utils/ChangePassword";
import { url } from "../../api";
import "./Profile.css";
import history from "../../../history";
import Spinner from "../../utils/Spinner";
import ProfileCourses from "./Utils/ProfileCourses";
import Dropzone from "react-dropzone";
import { DropzoneArea } from "material-ui-dropzone";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Helmet } from "react-helmet";

function Profile() {
    const [section, setSection] = useState("profile");
    const [isEdit, setEdit] = useState(false);
    const [file, setFile] = useState([]);
    const [profile, setProfile] = useState({});
    const [givenCourses, setGivenCourses] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [attribs, setAttribs] = useState([]);
    const [allPoints, setAllPoints] = useState([]);
    const [mainSpinner, setMainSpinner] = useState(false);

    const token = localStorage.getItem("Token");

    console.log("fileeeeeee", file);

    const sectionFn = (e, name) => {
        setSection(name);
        console.log(e);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const response = await axios.get(`${url}/export-points`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            const response2 = await axios.get(`${url}/attribs`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(response.data.data);
            setAllPoints(response.data.data);
            setAttribs(response2.data.data);
        })();
    }, []);

    console.log(attribs);

    const calculatePoints = () => {
        const sum = givenCourses.reduce((total, course) => {
            console.log(course);
            return (total +=
                course.points &&
                course.status !== "active" &&
                course.status !== "approved"
                    ? +course.points
                    : 0);
        }, 0);
        return sum;
    };

    console.log(calculatePoints());

    const logout = async () => {
        await axios({
            method: "post",
            url: "http://epen.nyxwolves.tech/api/logout",
            headers: { Authorization: `Basic ${token}` },
        }).then(function (res) {
            console.log(res.data);
            localStorage.removeItem("Token");
            localStorage.removeItem("resusid");
            localStorage.removeItem("res_us");
            window.location.href = "/";
        });
    };
    const getprofile = async () => {
        setMainSpinner(true);
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/my-profile",
            headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
            console.log(res.data.data, "profile");
            setProfile(res.data.data);
        });
    };

    console.log(profile);

    const editprofile = async () => {
        // console.log(profile);

        const data = new FormData();
        data.append("name", profile.name);
        data.append("city", profile.city);
        data.append("country", profile.country);
        data.append("created_at", profile.created_at);
        data.append("dateofbirth", profile.dateofbirth);
        data.append("email", profile.email);
        data.append("gender", profile.gender);
        data.append("id", profile.id);
        data.append("occupation_category", profile.occupation_category);
        data.append(
            "occupation_specification",
            profile.occupation_specification
        );
        data.append("organization_name", profile.organization_name);
        data.append("phoneno", profile.phoneno);
        data.append("pincode", profile.pincode);
        data.append("points", profile.points);
        data.append("referal_code", profile.referal_code);
        data.append("state", profile.state);
        data.append("street", profile.street);
        data.append("updated_at", profile.updated_at);
        profile.courses.forEach((course) => data.append("courses", course));
        data.append("profile_picture", file);

        console.log(data);
        await axios({
            method: "post",
            url: "http://epen.nyxwolves.tech/api/my-profile",
            headers: { Authorization: `Basic ${token}` },
            data,
        })
            .then((res) => {
                console.log(res);
                swal({
                    text: res.data.success,
                    icon: "success",
                });
                getprofile();
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

    const changePassword = async () => {
        const oldpassword = document.querySelector("#old_password").value;
        const password = document.querySelector("#password").value;
        const confirm_pass = document.querySelector("#password_again").value;

        const postData = {
            oldpassword,
            password,
        };
        // console.log(postData);

        if (password !== confirm_pass) {
            return swal({
                text: "Passwords do not match",
                icon: "warning",
            });
        }

        console.log(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
        );

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return swal({
                text: "Please enter a valid password",
                icon: "warning",
            });
        }

        if (oldpassword === "" || password === "" || confirm_pass === "") {
            return swal({
                text: "Please fill all fields",
                icon: "warning",
            });
        }

        try {
            const response = await axios.post(
                `${url}/change-password`,
                postData,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            // if(response.data)
            console.log(response.data);
            swal({
                text: "Password updated successfully",
                icon: "success",
            });
            localStorage.removeItem("Token");
            window.location.href("/login");
        } catch (e) {
            return swal({
                text: "Password not updated. Old passwords does not match",
                icon: "warning",
            });
        }
    };

    const getGivenCourses = async () => {
        try {
            const response = await axios.get(`${url}/view-all-given-courses`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(response.data.data);
            setGivenCourses(response.data.data);
        } catch (e) {}
        setMainSpinner(false);
    };

    console.log(profile.occupation_category);

    const occupation_category = [
        "",
        "School Student",
        "College Student",
        "Employed",
        "Unemployed",
        "Self-Employed",
        "Business Owner",
    ];

    useEffect(() => {
        getprofile();
        getGivenCourses();
    }, []);
    return (
        <>
            {/* <Helmet>
                <title>Profile | The Pen App</title>
                <meta name="description" content="Profile page" />
            </Helmet> */}
            <React.Fragment>
                <section className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="m-3 text-center">
                                <img
                                    src={
                                        profile.profile_picture
                                            ? profile.profile_picture
                                            : `https://via.placeholder.com/150`
                                    }
                                    className="rounded-circle"
                                    width="150px"
                                    height="150px"
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
                                        onClick={(e) =>
                                            sectionFn(e, "coursesUploaded")
                                        }
                                    >
                                        Given Courses
                                    </li>
                                    <li
                                        className="profile-side-content"
                                        onClick={(e) =>
                                            sectionFn(e, "wishlist")
                                        }
                                    >
                                        Wishlist
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
                            style={{ background: "#e1e1e1" }}
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
                                className=""
                                // 80%
                            >
                                <div
                                    className={
                                        section === "wishlist" ? "" : "d-none"
                                    }
                                    style={{ padding: "30px" }}
                                >
                                    <Wishlist fromProfile={true} />
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
                                                <i className="fas fa-lg fa-edit"></i>
                                                &nbsp;Edit
                                            </button>
                                        </h3>
                                        <form action="" method="POST">
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-2  col-form-label"
                                                    htmlFor="username"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
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
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
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
                                            {isEdit && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Profile Picture
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <DropzoneArea
                                                            onChange={(files) =>
                                                                setFile(
                                                                    files[0]
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-2  col-form-label"
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Phone
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        placeholder="Ex: 9999888877"
                                                        value={
                                                            profile.phoneno !==
                                                            "null"
                                                                ? profile.phoneno
                                                                : ""
                                                        }
                                                        onChange={(e) => {
                                                            setProfile({
                                                                ...profile,
                                                                phoneno:
                                                                    e.target
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
                                                    htmlFor="dob"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Date of Birth
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="dob"
                                                        placeholder="Ex: 29/3/2020"
                                                        value={
                                                            profile.dateofbirth
                                                        }
                                                        onChange={(e) => {
                                                            setProfile({
                                                                ...profile,
                                                                dateofbirth:
                                                                    e.target
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
                                                    placeholder="Ex: Male/Female"
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Gender
                                                </label>
                                                <div className="col-sm-10">
                                                    <select
                                                        value={profile.gender}
                                                        className="form-control"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onChange={(e) => {
                                                            setProfile({
                                                                ...profile,
                                                                gender: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                        disabled={!isEdit}
                                                    >
                                                        {/* <option
                                                        value="choose gender"
                                                        disabled
                                                    >
                                                        Choose Gender
                                                    </option> */}
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                        <option value="Others">
                                                            Others
                                                        </option>
                                                    </select>

                                                    {/* <input
                                                    type="text"
                                                    name="gender"
                                                    
                                                    }}
                                                /> */}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-2  col-form-label"
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    State
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="state"
                                                        placeholder="Ex: Tamilnadu"
                                                        value={
                                                            profile.state !==
                                                            "null"
                                                                ? profile.state
                                                                : ""
                                                        }
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
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    City
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="city"
                                                        value={
                                                            profile.city !==
                                                            "null"
                                                                ? profile.city
                                                                : ""
                                                        }
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
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Country
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="country"
                                                        value={
                                                            profile.country !==
                                                            "null"
                                                                ? profile.country
                                                                : ""
                                                        }
                                                        placeholder="Ex: India"
                                                        onChange={(e) => {
                                                            setProfile({
                                                                ...profile,
                                                                country:
                                                                    e.target
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
                                                    htmlFor="simpleinput"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Occupation Category
                                                </label>
                                                <div className="col-sm-10">
                                                    <select
                                                        className="form-control"
                                                        name="occupation_category"
                                                        value={
                                                            profile.occupation_category
                                                        }
                                                        placeholder="Ex: School Student"
                                                        onChange={(e) => {
                                                            setProfile({
                                                                ...profile,
                                                                occupation_category:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                        disabled={!isEdit}
                                                    >
                                                        {occupation_category.map(
                                                            (option, i) => (
                                                                <option
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {profile.occupation_category ===
                                                "School Student" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Board of Education
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {profile.occupation_category ===
                                                "College Student" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Department
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {profile.occupation_category ===
                                                "Employed" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Work Domain
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {profile.occupation_category ===
                                                "Unemployed" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Area of Interest
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {profile.occupation_category ===
                                                "Self-Employed" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Domain of Work
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {profile.occupation_category ===
                                                "Business Owner" && (
                                                <div className="form-group row">
                                                    <label
                                                        className="col-sm-2  col-form-label"
                                                        htmlFor="simpleinput"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Domain of Business
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="occupation_specification"
                                                            value={
                                                                profile.occupation_specification !==
                                                                "null"
                                                                    ? profile.occupation_specification
                                                                    : ""
                                                            }
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                setProfile({
                                                                    ...profile,
                                                                    occupation_specification:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            disabled={!isEdit}
                                                        />
                                                    </div>
                                                </div>
                                            )}
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
                                    <div className="mt-3 mb-2 text-center">
                                        <h3>Your Points</h3>
                                    </div>
                                    {allPoints.length !== 0 &&
                                        attribs.length !== 0 && (
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                S. No.
                                                            </TableCell>
                                                            <TableCell>
                                                                Point Name
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Points Gained
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Total Points
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                1
                                                            </TableCell>
                                                            <TableCell>
                                                                Referral
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    allPoints[0]
                                                                        .total_referral_points
                                                                }
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    attribs[0]
                                                                        .value
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                2
                                                            </TableCell>
                                                            <TableCell>
                                                                Profile
                                                                Completeness
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    allPoints[0]
                                                                        .profile_completed_points
                                                                }
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    attribs[2]
                                                                        .value
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                3
                                                            </TableCell>
                                                            <TableCell>
                                                                Points Earned
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    allPoints[0]
                                                                        .total_points_earned
                                                                }
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                0
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                4
                                                            </TableCell>
                                                            <TableCell>
                                                                Points Spent
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    allPoints[0]
                                                                        .total_points_spent
                                                                }
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                0
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                5
                                                            </TableCell>
                                                            <TableCell>
                                                                Total Price
                                                                Spent
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {
                                                                    allPoints[0]
                                                                        .total_cash_paid
                                                                }
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                -
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
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
                                        margin: "30px auto",
                                    }}
                                >
                                    <ProfileCourses
                                        spinner={spinner}
                                        setSpinner={setSpinner}
                                    />
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
                                        GIVEN COURSES{" "}
                                        <p
                                            style={{
                                                textAlign: "right",
                                                fontSize: "20px",
                                            }}
                                        >
                                            Total Available Points :{" "}
                                            <strong>{calculatePoints()}</strong>
                                        </p>
                                    </h3>
                                    <div className="ui_kit_table uploaded_course_table">
                                        <table className="table">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">
                                                        Course Name
                                                    </th>
                                                    <th scope="col">
                                                        Uploaded Date
                                                    </th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {givenCourses?.map((course) => (
                                                    <tr>
                                                        <td>{course.title}</td>
                                                        <td>
                                                            {/* {dateformat( */}
                                                            {course.created_at.slice(
                                                                0,
                                                                course.created_at.indexOf(
                                                                    " "
                                                                )
                                                            )}
                                                            {/* "dd/mm/yyyy"
                                                        )} */}
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={`badge ${
                                                                    course.status ===
                                                                        "active" ||
                                                                    course.status ===
                                                                        "approved"
                                                                        ? `badge-success`
                                                                        : course.status ===
                                                                          "under_review"
                                                                        ? `badge-info`
                                                                        : `badge-danger`
                                                                }`}
                                                            >
                                                                {(course.status ===
                                                                    "active" ||
                                                                    course.status ===
                                                                        "approved") &&
                                                                    "CREDITED"}
                                                                {course.status ===
                                                                    "under_review" &&
                                                                    "UNDER REVIEW"}
                                                                {course.status ===
                                                                    "pending" &&
                                                                    "PENDING"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {course.points &&
                                                            course.status !==
                                                                "active" &&
                                                            course.status !==
                                                                "approved"
                                                                ? course.points
                                                                : 0}{" "}
                                                            Points
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* <tr>
                                                // <td>Html and css</td>
                                                // <td>2/06/2020</td>
                                                //{" "}
                                                <td>
                                                    //{" "}
                                                    <span className="badge badge-warning">
                                                        // Processing //{" "}
                                                    </span>
                                                    //{" "}
                                                </td>
                                                // <td>100Points</td>
                                                //{" "} */}
                                                {/* </tr> */}
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
                                    <ChangePassword
                                        changePassword={changePassword}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* {mainSpinner ? (
                <div className="loader">
                    <Spinner />
                </div>
            ) : null} */}
            </React.Fragment>
        </>
    );
}

export default Profile;
