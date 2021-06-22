import React from "react";
import { Formik } from "formik";
import { url } from "../../api";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import history from "../../../history";
import { useStateValue } from "../../../StateProvider";
import "./Register.css";
import { Helmet } from "react-helmet";

function Register() {
    const [{}, dispatch] = useStateValue();

    //     const validateForm = (values) => {
    //         const errors = {};
    //         if (!values.email) {
    //             errors.email = "Required";
    //         } else if (
    //             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //         ) {
    //             errors.email = "Invalid email address";
    //         }

    //         return errors;
    //     };
    // }

    // const handleSubmit = async (e, values, errors) => {
    //     e.preventDefault();
    //     console.log(values);
    //     // console.log(errors);

    //     if (Object.keys(errors).length !== 0 || !values.name) {
    //         swal({
    //             text: "Please fill all fields and then submit the form",
    //             icon: "Warning",
    //         });
    //         return;
    //     }

    //     console.log(errors);

    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values),
    //     };
    //     try {
    //         const response = await fetch(url + "/register-user", options);
    //         const data = await response.json();
    //         // console.log(data);
    //         swal({
    //             text: "Successfully Registered",
    //             icon: "success",
    //         });
    //         history.push("/login");
    //     } catch (error) {
    //         swal({
    //             text: "Unauthorized email or password",
    //             icon: "warning",
    //         });
    //     }
    // };

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Register | The Pen App</title>
                    <meta name="description" content="Register page" />
                </Helmet>
                <section className="d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="header-login text-center w-100">
                            <h1 className="LoginTitle">Register</h1>
                            <h5 className="mb-4" style={{ fontSize: "20px" }}>
                                Already a user?
                                <Link
                                    to="/login"
                                    style={{
                                        color: "#00b0F0",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    Sign In
                                </Link>
                            </h5>
                        </div>
                        <div className="login-container d-sm-flex justify-content-center">
                            <div
                                className="left-section"
                                style={{ border: "none" }}
                            >
                                <Formik
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        phoneNo: "",
                                        password: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = "Required";
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                values.email
                                            )
                                        ) {
                                            errors.email =
                                                "Invalid email address";
                                        }

                                        if (!values.name) {
                                            errors.name = "Required";
                                        }

                                        if (!values.phoneNo) {
                                            errors.phoneNo = "Required";
                                        } else if (
                                            values.phoneNo.length !== 10
                                        ) {
                                            errors.phoneNo =
                                                "Invalid no. Please enter only the number without country code";
                                        }

                                        if (!values.password) {
                                            errors.password = "Required";
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (values) => {
                                        // e.preventDefault();
                                        console.log(values.name);

                                        const options = {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(values),
                                        };
                                        try {
                                            const response = await fetch(
                                                url + "/register-user",
                                                options
                                            );
                                            const data = await response.json();
                                            // console.log(data);
                                            swal({
                                                text: "Successfully Registered",
                                                icon: "success",
                                            });
                                            history.push("/login");
                                        } catch (error) {
                                            swal({
                                                text: "Unauthorized email or password",
                                                icon: "warning",
                                            });
                                        }
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <form
                                            style={{
                                                width: "50%",
                                                margin: "auto",
                                            }}
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="form-login position-relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="Login-input"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="label-name"
                                                >
                                                    <span className="content-name">
                                                        Name
                                                    </span>
                                                </label>
                                            </div>
                                            <p style={{ marginLeft: "25px" }}>
                                                {errors.name &&
                                                    touched.name &&
                                                    errors.name}
                                            </p>

                                            <br />

                                            <div className="form-login position-relative">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="Login-input"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="label-name"
                                                >
                                                    <span className="content-name">
                                                        Email
                                                    </span>
                                                </label>
                                            </div>
                                            <p style={{ marginLeft: "25px" }}>
                                                {errors.email &&
                                                    touched.email &&
                                                    errors.email}
                                            </p>
                                            <br />

                                            <div className="form-login position-relative">
                                                <input
                                                    type="text"
                                                    name="phoneNo"
                                                    className="Login-input"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="phoneNo"
                                                    className="label-name"
                                                >
                                                    <span className="content-name">
                                                        Phone
                                                    </span>
                                                </label>
                                            </div>
                                            <p style={{ marginLeft: "25px" }}>
                                                {errors.phoneNo &&
                                                    touched.phoneNo &&
                                                    errors.phoneNo}
                                            </p>
                                            <br />

                                            <div className="form-login position-relative">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="Login-input"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="password"
                                                    className="label-name"
                                                >
                                                    <span className="content-name">
                                                        Password
                                                    </span>
                                                </label>
                                            </div>
                                            <p style={{ marginLeft: "25px" }}>
                                                {errors.password &&
                                                    touched.password &&
                                                    errors.password}
                                            </p>
                                            <br />

                                            {/* <Link to="/profile"> */}
                                            <button
                                                type="submit"
                                                className="sign-up-btn"
                                                disabled={isSubmitting}
                                                style={{
                                                    color: "white",
                                                    fontSize: "1.15rem",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                }}
                                            >
                                                Register
                                            </button>
                                            {/* </Link> */}
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            {/* <div className="right-section">
                                <div
                                    className="d-flex justify-content-center  flex-column"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        paddingLeft: "3rem",
                                    }}
                                >
                                    <div
                                        className="btn-container"
                                        style={{ marginTop: "-15%" }}
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-block color-white bgc-fb  d-flex p-0 align-items-center"
                                            style={{ width: "50%" }}
                                        >
                                            <div className="button-icon">
                                                <img
                                                    alt=""
                                                    src="https://img.icons8.com/fluent/48/000000/facebook-new.png"
                                                    width="50%"
                                                />
                                            </div>
                                            <span className="text-center w-100">
                                                Continue with Facebook
                                            </span>
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-block color-white  d-flex p-0 align-items-center"
                                            style={{
                                                background: "#4285f4",
                                                width: "50%",
                                            }}
                                        >
                                            <div className="button-icon">
                                                <img
                                                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                                                    width="50%"
                                                    alt=""
                                                />
                                            </div>
                                            <span className="text-center w-100">
                                                Continue with Google
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Register;
