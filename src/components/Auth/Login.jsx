import React, { useEffect } from "react";
import { Formik } from "formik";
import { url } from "../api";
import swal from "sweetalert";

function Login() {
  useEffect(() => {
    localStorage.removeItem("Token");
  }, []);
  return (
    <React.Fragment>
      <div className="logo-box">
        <a href="/login" className="logo text-center">
          <span className="logo-lg">
            <img src="assets/images/logo.png" alt="" width="125px" />
            {/* <!-- <span className="logo-lg-text-light">Xeria</span> --> */}
          </span>
          <span className="logo-sm">
            {/* <!-- <span className="logo-sm-text-dark">X</span> --> */}
            <img src="assets/images/logo.png" alt="" width="125px" />
          </span>
        </a>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh", width: "100vw" }}
      >
        <div className="container col col-4">
          <div className="header-login text-center w-100">
            <h1 className="LoginTitle">Admin Log In</h1>
            <br></br>
          </div>
          <div className="login-container d-sm-flex justify-content-center">
            <div className="section">
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
                    errors.email = "Invalid email address";
                  }

                  return errors;
                }}
                onSubmit={async (values, { resetForm }) => {
                  const token = values.email + ":" + values.password;
                  const hash = btoa(token);

                  const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + hash,
                    },
                    body: JSON.stringify(values),
                  };
                  try {
                    const response = await fetch(url + "/login", options);
                    const data = await response.json();
                    console.log(data);
                    localStorage.setItem("Token", hash);
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-login position-relative">
                      <input
                        type="email"
                        name="email"
                        className="Login-input"
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email" className="label-name">
                        <span className="content-name">Email</span>
                      </label>
                      {errors.email && touched.email && errors.email}
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
                      <label htmlFor="password" className="label-name">
                        <span className="content-name">Password</span>
                      </label>
                      {errors.password && touched.password && errors.password}
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
