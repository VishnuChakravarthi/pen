import { useFormik } from "formik";
import React, { useState } from "react";
import { url } from "../../api";
import swal from "sweetalert";
import "./Register.css";

// import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import history from "../../../history";

function Register() {
    const [passValid, setPassValid] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);

    const handleSubmit = async (e, values, errors) => {
        e.preventDefault();
        console.log(values);
        // console.log(errors);

        if (Object.keys(errors).length !== 0 || !values.name) {
            swal({
                text: "Please fill all fields and then submit the form",
                icon: "Warning",
            });
            return;
        }

        console.log(errors);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        };
        try {
            const response = await fetch(url + "/register-user", options);
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
    };

    // console.log(passValid);
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length > 15) {
            errors.name = "Must be 15 characters or less";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        // if (!values.phone) {
        //     errors.phone = "Required";
        // } else if (!/^\d{10}$/.test(values.phone)) {
        //     errors.phone = "Invalid phone number";
        // }

        if (!values.password) {
            errors.password = "Required";
        }

        if (!values.confirmpass) {
            errors.confirmpass = "Required";
        } else if (values.confirmpass !== values.password) {
            errors.confirmpass =
                "Passwords does not match. Enter same value as password";
        }

        return errors;
    };
    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };

    const handleClickShowConfPassword = () => {
        setShowConfPass(!showConfPass);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const SignupForm = () => {
        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
            initialValues: {
                name: "",
                phoneno: "",
                email: "",
                password: "",
                confirmpass: "",
                dateofbirth: "",
                gender: "",
                state: "",
                country: "",
                street: "",
                pincode: "",
            },
            validate,
            onSubmit: (values) => {},
        });

        return (
            <React.Fragment>
                <form>
                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            label="Name"
                        />
                        {formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            label="Email"
                        />
                        {formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="phone"
                            name="phoneno"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.phoneno}
                            label="Phone"
                        />
                        {formik.errors.phone ? (
                            <div>{formik.errors.phone}</div>
                        ) : null}
                    </div>

                    <div className="form-login position-relative">
                        <FormControl className="register__formPassfield">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                onFocus={() => setPassValid(true)}
                                onBlur={() => setPassValid(false)}
                                id="password"
                                type="password"
                                // type={showPass ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                //     endAdornment={
                                //         <InputAdornment position="end">
                                //             <IconButton
                                //                 aria-label="toggle password visibility"
                                //                 onClick={handleClickShowPassword}
                                //                 onMouseDown={
                                //                     handleMouseDownPassword
                                //                 }
                                //             >
                                //                 {showPass ? (
                                //                     <Visibility />
                                //                 ) : (
                                //                     <VisibilityOff />
                                //                 )}
                                //             </IconButton>
                                //         </InputAdornment>
                                //     }
                            />
                        </FormControl>

                        {passValid ? (
                            <div className="register__form__passerr">
                                <h3>Password must contain</h3>
                                <div
                                    style={
                                        formik.values.password.length > 8
                                            ? { color: "green" }
                                            : { color: "red" }
                                    }
                                >
                                    atleast 8 characters
                                </div>
                                <div
                                    style={
                                        formik.values.password.match(/[a-z]/g)
                                            ? { color: "green" }
                                            : { color: "red" }
                                    }
                                >
                                    atleast one small letter
                                </div>
                                <div
                                    style={
                                        formik.values.password.match(/[A-Z]/g)
                                            ? { color: "green" }
                                            : { color: "red" }
                                    }
                                >
                                    atleast one capital letter
                                </div>
                                <div
                                    style={
                                        formik.values.password.match(/[0-9]/g)
                                            ? { color: "green" }
                                            : { color: "red" }
                                    }
                                >
                                    atleast one number
                                </div>
                            </div>
                        ) : null}
                        {/* {console.log(formik.values.password.match("/[a-z]/g"))} */}
                        {formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    {/* <div className="form-login position-relative">
                    <TextField
                        fullWidth
                        id="confirmpass"
                        name="confirmpass"
                        type="password"
                        className="Login-input"
                        onChange={formik.handleChange}
                        value={formik.values.confirmpass}
                        label="Confirm Password"
                        autoComplete
                    />
                    {formik.errors.confirmpass ? (
                        <div>{formik.errors.confirmpass}</div>
                    ) : null}
                </div> */}

                    <FormControl className="register__formPassfield">
                        <InputLabel htmlFor="confirmpass">
                            Confirm Password
                        </InputLabel>
                        <Input
                            id="confirmpass"
                            type={showConfPass ? "text" : "password"}
                            value={formik.values.confirmpass}
                            onChange={formik.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showConfPass ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {formik.errors.confirmpass ? (
                        <div>{formik.errors.confirmpass}</div>
                    ) : null}

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="dob"
                            name="dateofbirth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.dateofbirth}
                            label="Date of Birth"
                        />
                        {/* {formik.errors.dob ? <div>{formik.errors.dob}</div> : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="gender"
                            name="gender"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                            label="Gender"
                        />
                        {/* {formik.errors.gender ? (
                        <div>{formik.errors.gender}</div>
                    ) : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="state"
                            name="state"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            label="State"
                        />
                        {/* {formik.errors.state ? (
                        <div>{formik.errors.state}</div>
                    ) : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="country"
                            name="country"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            label="Country"
                        />
                        {/* {formik.errors.country ? (
                        <div>{formik.errors.country}</div>
                    ) : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            label="City"
                        />
                        {/* {formik.errors.city ? (
                        <div>{formik.errors.city}</div>
                    ) : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="street"
                            name="street"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.street}
                            label="Street"
                        />
                        {/* {formik.errors.street ? (
                        <div>{formik.errors.street}</div>
                    ) : null} */}
                    </div>

                    <div className="form-login position-relative">
                        <TextField
                            fullWidth
                            id="pincode"
                            name="pincode"
                            type="text"
                            className="Login-input"
                            onChange={formik.handleChange}
                            value={formik.values.pincode}
                            label="Pincode"
                        />
                        {/* {formik.errors.pincode ? (
                        <div>{formik.errors.pincode}</div>
                    ) : null} */}
                    </div>
                </form>
                <button
                    type="submit"
                    className="sign-up-btn register__btn"
                    // disabled={isSubmitting}
                    onClick={(e) =>
                        handleSubmit(e, formik.values, formik.errors)
                    }
                >
                    Register
                </button>
            </React.Fragment>
        );
    };

    return (
        <div className="register">
            <h2>New User Registration</h2>

            <div className="register__form">{SignupForm()}</div>
        </div>
    );
}

export default Register;
