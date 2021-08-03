import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
// import { login, signin_google } from "../store/actions/apiactions";

const GoogleAuth = ({ login, signin_google }) => {
    const history = useHistory();

    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: "",
                    scope: "email",
                })
                .then(() => {
                    const auth = window.gapi.auth2.getAuthInstance();
                    onAuthChange(auth.isSignedIn.get());
                    auth.isSignedIn.listen(onAuthChange);
                });
        });
    });

    const onAuthChange = (isSignedIn) => {
        console.log(
            window.gapi.auth2.getAuthInstance().currentUser.get().getId()
        );
        // if (isSignedIn) {
        //   signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
        // } else {
        //   signOut();
        // }
    };

    const onSignInClick = () => {
        window.gapi.auth2
            .getAuthInstance()
            .signIn()
            .then((authRes) => {
                console.log(authRes.getAuthResponse().id_token);
                console.log(authRes.getAuthResponse());
                signin_google(authRes.getAuthResponse().id_token).then((_) => {
                    history.push("/");
                });
            });
    };

    // const onSignOutClick = () => {
    //   window.gapi.auth2.getAuthInstance().signOut();
    // };

    const renderedUser = () => {
        // console.log(signedIn);
        // if (signedIn === null) {
        //   return null;
        // } else if (signedIn) {
        //   return (
        //     <button className="ui red google button">
        //       <i className="google icon"></i>
        //       Sign Out
        //     </button>
        //   );
        // } else {
        return (
            // <button className="ui red google button" >
            //   <i className="google icon"></i>
            //   Sign In
            // </button>
            <button
                class="btn btn-dark btn-outline-hover-dark"
                onClick={onSignInClick}
                style={{
                    borderRadius: "5px",
                    border: "1px solid",
                    background: "transparent",
                    color: "#404040",
                    padding: "5px 20px",
                    textTransform: "none",
                }}
            >
                Sign in with{" "}
                <img
                    class="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
            </button>
        );
        // }
    };

    return <div>{renderedUser()}</div>;
};

const mapStateToProps = (state) => {
    // console.log(state);
    // signedIn: state.googleauth.isSignedIn,
    return {
        client: state.apiReducer.client,
    };
};

export default connect(mapStateToProps, {})(GoogleAuth);
