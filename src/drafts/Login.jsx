import React from "react";
import { Formik } from "formik";
import { url } from "./api";
import swal from "sweetalert";
import Navbar from "./Nav";

function Login() {
    
    return (
        <React.Fragment>
            <React.Fragment>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh", width: "100vw" }}
                >
                    <div className="container">
                        <div className="header-login text-center w-100">
                            <h1 className="LoginTitle">Log In</h1>
                            <h5 className="mb-4" style={{ fontSize: "20px" }}>
                                New To Pen?
                                <a
                                    href="/sign-up"
                                    style={{
                                        color: "#00b0F0",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    Sign Up
                                </a>
                            </h5>
                        </div>
                        <div className="login-container d-sm-flex justify-content-center">
                            <div className="left-section">
                                <Formik
                                    initialValues={{ email: "", password: "" }}
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

                                        return errors;
                                    }}
                                    onSubmit={async (values, { resetForm }) => {
                                        const token =
                                            values.email +
                                            ":" +
                                            values.password;
                                        const hash = btoa(token);

                                        const options = {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                Authorization: "Basic " + hash,
                                            },
                                            body: JSON.stringify(values),
                                        };
                                        try {
                                            const response = await fetch(
                                                url + "/login",
                                                options
                                            );
                                            const data = await response.json();
                                            console.log(data);
                                            localStorage.setItem("Token", hash);
                                            window.location.href = "/";
                                        } catch (error) {
                                            swal({
                                                text:
                                                    "Unauthorized email or password",
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
                                                width: "75%",
                                                marginLeft: "20%",
                                            }}
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="form-login position-relative">
                                                <input
                                                    type="email"
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
                                                {errors.email &&
                                                    touched.email &&
                                                    errors.email}
                                            </div>

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
                                                {errors.password &&
                                                    touched.password &&
                                                    errors.password}
                                            </div>

                                            <br />

                                            <a href="/profile">
                                                <button
                                                    type="submit"
                                                    className="sign-up-btn"
                                                    disabled={isSubmitting}
                                                    style={{
                                                        color: "white",
                                                        fontSize: "1.15rem",
                                                    }}
                                                >
                                                    Log in
                                                </button>
                                            </a>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            <div className="right-section">
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
                                            class="btn btn-block color-white bgc-fb  d-flex p-0 align-items-center"
                                            style={{ width: "50%" }}
                                        >
                                            <div className="button-icon">
                                                <img
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
                                            class="btn btn-block color-white  d-flex p-0 align-items-center"
                                            style={{
                                                background: "#4285f4",
                                                width: "50%",
                                            }}
                                        >
                                            <div className="button-icon">
                                                <img
                                                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                                                    width="50%"
                                                />
                                            </div>
                                            <span className="text-center w-100">
                                                Continue with Google
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Login;
