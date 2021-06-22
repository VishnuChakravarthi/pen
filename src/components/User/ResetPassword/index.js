import { TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import history from "../../../history";
import { url } from "../../api";
import { Helmet } from "react-helmet";

function ResetPassword({ match, location }) {
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [passError, setPassError] = useState(false);

    console.log(location.search.slice(location.search.indexOf("=") + 1));
    const email = location.search.slice(location.search.indexOf("=") + 1);
    const resetPassword = async () => {
        if (confPassword !== password) {
            return setPassError(true);
        }
        const data = {
            token: match.params.token,
            email,
            password,
        };
        try {
            const res = await Axios.post(`${url}/password/reset`, data);
            swal("success", "Password successfully reset", "success");
            history.push("/login");
        } catch (e) {
            swal("error", "Password not reset", "error");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Reset Password | The Pen App</title>
                <meta name="description" content="Reset password page" />
            </Helmet>
            <div className="resetpassword__form">
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Reset Password
                </div>
                <TextField
                    variant="outlined"
                    label="Email"
                    value={email}
                    aria-readonly
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                />
                {passError && (
                    <div style={{ color: "red" }}>Passwords doesn't match</div>
                )}
                <button
                    onClick={() => resetPassword()}
                    className="sign-up-btn"
                    style={{
                        color: "white",
                        fontSize: "1.15rem",
                        cursor: "pointer",
                        outline: "none",
                    }}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
