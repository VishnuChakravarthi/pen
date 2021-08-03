import React, { useState } from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";
function LinkedinSignIn({ children }) {
    const [linkState, setLinkState] = useState({ code: "", errorMessage: "" });

    const handleSuccess = (data) => {
        setLinkState({
            code: data.code,
            errorMessage: "",
        });
    };

    const handleFailure = (error) => {
        setLinkState({
            code: "",
            errorMessage: error.errorMessage,
        });
    };

    return (
        <div>
            <LinkedIn
                clientId="81lx5we2omq9xh"
                onFailure={handleFailure}
                onSuccess={handleSuccess}
                redirectUri="http://localhost:3000/linkedin"
            >
                {children}
            </LinkedIn>
            {!linkState.code && <div>No code</div>}
            {linkState.code && <div>Code: {linkState.code}</div>}
            {linkState.errorMessage && <div>{linkState.errorMessage}</div>}
        </div>
    );
}

export default LinkedinSignIn;
