import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/navbar";
import axios from "axios";
import swal from "sweetalert";

function NavHeading(props) {
    const [heart, setHeart] = useState(false);
    const url = "http://epen.nyxwolves.tech/api/";

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.getItem("pn_en") ? setLoggedIn(true) : setLoggedIn(false);
    }, []);

    return (
        <React.Fragment>
            <div className="wrapper">
                {/* <div className="preloader"></div> */}
                <Navbar />
                <div
                    className="container-fluid"
                    style={{
                        border: "0.5px solid #e1e1e1",
                        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
                        background: "#00b0f0",
                        paddingTop: "81px",
                    }}
                >
                    <div className="row justify-content-around p-2">
                        <div className="col-md-4">
                            <h3
                                style={{
                                    color: props.dark === "true" && "white",
                                    textAlign: "left",
                                }}
                            >
                                Course Title: <span>{props.title}</span>
                            </h3>
                        </div>
                        {props.option !== "only-title" && (
                            <div className="col-md-4 offset-md-2">
                                {/* <button
                                    className="btn btn-el mr-3 header-button"
                                    onClick={props.sharefn}
                                >
                                    Share
                                </button> */}
                                <div
                                    className="row justify-content-center align-items-center"
                                    style={{ color: "white" }}
                                >
                                    <button
                                        type="submit"
                                        className="mr-4 btn btn-default"
                                        onClick={async () => {
                                            const token =
                                                localStorage.getItem("pn_en");
                                            await axios({
                                                method: "post",
                                                url: `wishlist`,
                                                baseURL: `${url}`,
                                                headers: {
                                                    Authorization: `Basic ${token}`,
                                                },
                                                data: {
                                                    course_id: `${props.courseid}`,
                                                },
                                            }).then((res) => {
                                                console.log(res.data.success);
                                                if (
                                                    res.data.success === "Added"
                                                ) {
                                                    setHeart(true);
                                                    swal({
                                                        text: "Added to Wishlist ",
                                                        icon: "success",
                                                    });
                                                } else {
                                                    setHeart(false);
                                                    swal({
                                                        text: "Removed from Wishlist ",
                                                        icon: "error",
                                                    });
                                                }
                                            });
                                        }}
                                    >
                                        <i
                                            class="fas fa-heart fa-2x"
                                            style={{ color: "white" }}
                                        ></i>
                                    </button>
                                    <p onClick={props.sharefn} className="mr-4">
                                        <i class="fas fa-share-alt fa-2x"></i>
                                    </p>
                                    <button
                                        className="btn btn-primary header-button d-inline-block"
                                        onClick={props.startLearningfn}
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavHeading;
