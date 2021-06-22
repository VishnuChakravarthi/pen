import React, { useState, useEffect } from "react";
import Navbar from "./Nav";
import { Formik, ErrorMessage } from "formik";
import { url } from "./api";
function Login() {
    const [error, setError] = useState('');
    console.log(error, "Error")
    return (
        <React.Fragment>
            <Navbar />
            <React.Fragment>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh", width: "100vw", paddingTop: "150px" }}
                >
                    <div className="container">
                        <div className="header-login text-center w-100">
                            <h1 className="LoginTitle">Sign Up</h1>
                            <h5 className="mb-4" style={{ fontSize: "20px" }}>
                                Already have an Pen account?
                                <a
                                    href="/login"
                                    style={{
                                        color: "#00b0F0",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    Log In
                                </a>
                            </h5>
                        </div>
                        <div className="login-container d-sm-flex justify-content-center">
                            <div className="left-section">
                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    validate={(values) => {

                                        console.log(values);
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

                                        if (
                                            values.password !==
                                            values.rePassword
                                        ) {
                                            errors.rePassword =
                                                "passwords doesn't match";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values) => {
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
                                            console.log(data);

                                            if (data.success) {
                                                const token =
                                                    values.email +
                                                    ":" +
                                                    values.password;
                                                const hash = btoa(token);

                                                localStorage.setItem(
                                                    "Token",
                                                    hash
                                                );
                                                window.location.href = "/";
                                            } else {
                                                setError(data.errors.email[0]);
                                                console.log(data);
                                            }
                                        } catch (error) {

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
                                        /* and other goodies */
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
                                                        type="text"
                                                        name="name"
                                                        className="Login-input"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="username" className="label-name">
                                                        <span className="content-name">User Name</span>
                                                    </label>
                                                </div>
                                                <br />
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

                                                {
                                                    error && <p className='text-danger' style={{ fontSize: '10px', marginLeft: "1rem" }}>{error}</p>
                                                }
                                                <br />

                                                <div className="form-login position-relative">
                                                    <input
                                                        type="text"
                                                        name="phoneno"
                                                        className="Login-input"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="phoneno"
                                                        className="label-name"
                                                    >
                                                        <span className="content-name">
                                                            Phone
                                                    </span>
                                                    </label>
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

                                                <div className="form-login position-relative">
                                                    <input
                                                        type="password"
                                                        name="rePassword"
                                                        className="Login-input"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="re-password"
                                                        className="label-name"
                                                    >
                                                        <span className="content-name">
                                                            Type your password again
                                                    </span>
                                                    </label>
                                                    {errors.rePassword &&
                                                        touched.rePassword &&
                                                        errors.rePassword}
                                                </div>

                                                <br />
                                                <button
                                                    type="submit"
                                                    className="sign-up-btn"
                                                    style={{
                                                        color: "white",
                                                        fontSize: "1.15rem",
                                                    }}
                                                >
                                                    Sign up
                                                </button>
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
