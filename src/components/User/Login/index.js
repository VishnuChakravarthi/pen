import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { url } from "../../api";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import history from "../../../history";
import { useStateValue } from "../../../StateProvider";
import { Modal, TextField } from "@material-ui/core";
import Axios from "axios";
import { Helmet } from "react-helmet";
// import LinkedinSignIn from "./LinkedinSignIn";

function Login() {
    const [{}, dispatch] = useStateValue();
    const [forgetPass, setForgetPass] = useState(false);
    const [forgetVal, setForgetVal] = useState(false);
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const forgetPassword = async () => {
        try {
            const res = await Axios.post(`${url}/password/email`, {
                email: forgetVal,
            });
            swal(
                "Success",
                "Password reset link is sent to your email",
                "success"
            );
        } catch (e) {
            swal(
                "Error",
                "No user found with this email. Please provide the email associated with this account",
                "error"
            );
        }
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Helmet>
                    <title>Login | The Pen App</title>
                    <meta name="description" content="Profile page" />
                </Helmet>
                <section className="d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="header-login text-center w-100">
                            <h1 className="LoginTitle">Log In</h1>
                            <h5 className="mb-4" style={{ fontSize: "20px" }}>
                                New To Pen?
                                <Link
                                    to="/register"
                                    style={{
                                        color: "#00b0F0",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    Sign Up
                                </Link>
                            </h5>
                        </div>
                        <div className="login-container d-sm-flex justify-content-center">
                            <div
                                className="left-section"
                                // style={{ border: "none" }}
                            >
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

                                        if (!values.password) {
                                            errors.password = "Required";
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (values, { resetForm }) => {
                                        const token =
                                            values.email +
                                            ":" +
                                            values.password;
                                        const hash = btoa(token);
                                        console.log(hash);
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
                                            localStorage.setItem(
                                                "resusid",
                                                data.data.id
                                            );
                                            if (data.data.name.includes(" ")) {
                                                localStorage.setItem(
                                                    "res_us",
                                                    data.data.name.slice(
                                                        0,
                                                        data.data.name.indexOf(
                                                            " "
                                                        )
                                                    )
                                                );
                                            } else {
                                                localStorage.setItem(
                                                    "res_us",
                                                    data.data.name.slice(0)
                                                );
                                            }

                                            window.location.href = "/";
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
                                                width: "70%",
                                                marginLeft: "auto",
                                            }}
                                            onSubmit={handleSubmit}
                                        >
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
                                                    type={
                                                        showPass
                                                            ? "text"
                                                            : "password"
                                                    }
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
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                        setShowPass(!showPass)
                                                    }
                                                />{" "}
                                                Show Password
                                            </div>
                                            <p style={{ marginLeft: "25px" }}>
                                                {errors.password &&
                                                    touched.password &&
                                                    errors.password}
                                            </p>

                                            <br />

                                            {/* <Link to="/profile"> */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
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
                                                    Log in
                                                </button>
                                                {/* </Link> */}

                                                <p
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Forget Password?{" "}
                                                    <a
                                                        rel="noreferer noopener"
                                                        onClick={() =>
                                                            setForgetPass(true)
                                                        }
                                                        style={{
                                                            color: "#00b0f0",
                                                        }}
                                                    >
                                                        Click here
                                                    </a>
                                                </p>
                                            </div>
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
                                        {/* <LinkedinSignIn> */}
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
                                                Continue with LinkedIn
                                            </span>
                                        </button>
                                        {/* </LinkedinSignIn> */}
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
                            </div>
                        </div>
                    </div>
                </section>
                <Modal open={forgetPass} onClose={() => setForgetPass(false)}>
                    <div className="forget__pass__modal">
                        <div
                            style={{
                                margin: "10px",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            Forget Password
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                            onClick={() => setForgetPass(false)}
                        >
                            x
                        </div>
                        <TextField
                            variant="outlined"
                            label="Please enter your email"
                            onChange={(e) => setForgetVal(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        <button
                            type="submit"
                            className="sign-up-btn"
                            onClick={() => forgetPassword()}
                            style={{
                                color: "white",
                                fontSize: "1.15rem",
                                cursor: "pointer",
                                outline: "none",
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </Modal>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Login;
