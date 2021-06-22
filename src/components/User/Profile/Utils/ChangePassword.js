import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function ChangePassword({ changePassword }) {
    const [values, setValues] = useState({
        oldPassVal: "",
        confPassVal: "",
        showOldPass: false,
        showConfPass: false,
    });
    const [password, setPassword] = useState("");
    const [passValid, setPassValid] = useState(false);

    const handleClickShowPassword = (name) => {
        console.log(name);
        if (name === "confPass") {
            setValues({ ...values, showConfPass: !values.showConfPass });
        } else {
            setValues({ ...values, showOldPass: !values.showOldPass });
        }
    };

    const handleChange = (e, name) => {
        console.log(e.target.value);

        if (name === "confPass") {
            setValues({ ...values, confPassVal: e.target.value });
        } else {
            setValues({ ...values, oldPassVal: e.target.value });
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <h3 className="text-center mb-3">CHANGE PASSWORD</h3>
            <div className="form-group row">
                <label
                    className="col-sm-3 col-form-label"
                    htmlFor="simpleinput"
                    style={{ fontWeight: "600" }}
                >
                    Enter old Password
                </label>
                {/* <div className="col-sm-10">
                    <input
                        id="old_password"
                        type="password"
                        className="form-control"
                        name="old_password"
                    />
                </div> */}

                <FormControl className="col-sm-8" variant="outlined">
                    <OutlinedInput
                        id="old_password"
                        type={values.showOldPass ? "text" : "password"}
                        value={values.oldPassVal}
                        onChange={(e) => handleChange(e, "oldPass")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword("oldPass")
                                    }
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showOldPass ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        // labelWidth={70}
                    />
                </FormControl>
            </div>
            <div className="form-group row" style={{ position: "relative" }}>
                <label
                    className="col-sm-3  col-form-label"
                    htmlFor="simpleinput"
                    style={{ fontWeight: "600" }}
                >
                    Enter New Password
                </label>
                {/* <div className="col-sm-10">
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                    />
                </div> */}
                <TextField
                    onFocus={() => setPassValid(true)}
                    onBlur={() => setPassValid(false)}
                    type="password"
                    className="col-sm-8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    variant="outlined"
                />

                {passValid ? (
                    <div className="changepass__form__passerr">
                        <h3>Password must contain</h3>
                        <div
                            style={
                                password.length > 8
                                    ? { color: "green" }
                                    : { color: "red" }
                            }
                        >
                            atleast 8 characters
                        </div>
                        <div
                            style={
                                password.match(/[a-z]/g)
                                    ? { color: "green" }
                                    : { color: "red" }
                            }
                        >
                            atleast one small letter
                        </div>
                        <div
                            style={
                                password.match(/[A-Z]/g)
                                    ? { color: "green" }
                                    : { color: "red" }
                            }
                        >
                            atleast one capital letter
                        </div>
                        <div
                            style={
                                password.match(/[0-9]/g)
                                    ? { color: "green" }
                                    : { color: "red" }
                            }
                        >
                            atleast one number
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="form-group row">
                <label
                    className="col-sm-3  col-form-label"
                    htmlFor="simpleinput"
                    style={{ fontWeight: "600" }}
                >
                    Re-enter Password
                </label>
                {/* <div className="col-sm-10"> */}
                {/* <input
                        id="password_again"
                        type="password"
                        className="form-control"
                        name="password_again"
                    /> */}

                <FormControl className="col-sm-8" variant="outlined">
                    <OutlinedInput
                        id="password_again"
                        type={values.showConfPass ? "text" : "password"}
                        value={values.confPassVal}
                        onChange={(e) => handleChange(e, "confPass")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword("confPass")
                                    }
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showConfPass ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        // labelWidth={70}
                    />
                </FormControl>
                {/* </div> */}
            </div>
            <div className="d-flex align-items-end flex-column">
                <button className="btn btn-learning" onClick={changePassword}>
                    Submit
                </button>
            </div>
        </React.Fragment>
    );
}

export default ChangePassword;
