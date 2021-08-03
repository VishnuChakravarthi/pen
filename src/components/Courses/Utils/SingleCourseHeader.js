import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { url } from "../../api";
import history from "../../../history";
import Spinner from "../../utils/Spinner";

function SingleCourseHeader(props) {
    // console.log(props.match);
    const [heart, setHeart] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [userCourses, setUserCourses] = useState([]);

    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("resusid");

    useEffect(() => {
        fetchWishlist();
        fetchUserCourses();
    }, []);

    useEffect(() => {
        activateWishlist();
    }, [wishlist]);

    // useEffect(() => {}, [heart]);

    const fetchUserCourses = async () => {
        try {
            const response = await axios.get(`${url}/my-profile`, {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("Token")}`,
                },
            });
            console.log(response.data.data.courses);
            response.data.data.courses.map((courses) => {
                return setUserCourses((userCourses) => [
                    ...userCourses,
                    courses.course_id,
                ]);
            });
            // console.log(userCourse);
            // setUserCourses(userCourse);
        } catch (e) {}
        setSpinner(false);
    };

    const fetchWishlist = async () => {
        console.log("Fetch det");
        // let wishListArr = [];
        try {
            const response = await axios.get(`${url}/wishlist`, {
                headers: { Authorization: `Basic ${token}` },
            });
            response.data.data.map((wishlist) =>
                // wishListArr.push(wishlist.course_id)
                setWishlist((wishList) => [...wishList, wishlist.course_id])
            );
            // console.log(wishListArr);
        } catch (e) {}
    };

    console.log(userCourses, "userCourses");

    const activateWishlist = () => {
        console.log(props);
        setHeart(wishlist.includes(props.courseid));
    };

    const onCoursePageRedirect = (id) => {
        redirect(id);
    };

    const fetchTrackProgress = async (course_id) => {
        try {
            const response = await axios.get(
                `${url}/track/course/${course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "asdasdasdasdsadasdsds");
            return response.data.data[0];
        } catch (e) {}
    };

    const fetchSyllabus = async (course_id) => {
        try {
            const response = await axios.get(`${url}/syllabus/${course_id}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            return response.data.data[0];
        } catch (e) {}
    };

    const redirect = async (id) => {
        // console.log(id);
        setSpinner(true);
        if (userCourses.includes(+id)) {
            // console.log(id);
            const pro = await fetchTrackProgress(id);
            console.log(pro);
            if (pro) {
                history.push(`/learn/${id}/lesson/${pro.lesson_id}`);
            } else {
                const newCourse = await fetchSyllabus(id);
                history.push(`/learn/${id}/lesson/${newCourse.lessons[0].id}`);
            }
        } else {
            history.push(`/buy/${id}`);
            // console.log("in here");
        }
        setSpinner(false);
    };

    // console.log(heart, "sdasdasdasdas");

    return (
        <div>
            <div className="wrapper">
                {/* <div className="preloader"></div> */}
                {/* <Navbar /> */}
                <div
                    className="container-fluid"
                    style={{
                        border: "0.5px solid #e1e1e1",
                        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
                        background: "#00b0f0",
                        // paddingTop: "25px",
                    }}
                >
                    <div
                        className="row justify-content-around p-2"
                        style={{ alignItems: "flex-end" }}
                    >
                        <div className="col-md-6">
                            <h3
                                style={{
                                    color: "white",
                                    textAlign: "left",
                                }}
                            >
                                <span>{props.title}</span>
                            </h3>
                        </div>
                        {props.option !== "only-title" && (
                            <div className="col-md-4">
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
                                                localStorage.getItem("Token");
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
                                        {/* <span>{heart}</span> */}

                                        {heart ? (
                                            // <div>
                                            // <i
                                            //     className="fas fa-heart fa-2x"
                                            //     style={{
                                            //         color: "#606470",
                                            //     }}
                                            // ></i>
                                            <span
                                                // className="fas fa-heart fa-2x"
                                                style={{
                                                    color: "#606470",
                                                }}
                                            >
                                                <i
                                                    className="fas fa-heart fa-2x"
                                                    // style={{
                                                    //     color: "#606470",
                                                    // }}
                                                ></i>
                                            </span>
                                        ) : (
                                            // </div>
                                            // <i
                                            //     className="fas fa-heart fa-2x"
                                            //     style={{
                                            //         color: "white",
                                            //     }}
                                            // ></i>
                                            <span
                                                // className="fas fa-heart fa-2x"
                                                style={{
                                                    color: "white",
                                                }}
                                            >
                                                <i
                                                    className="fas fa-heart fa-2x"
                                                    // style={{
                                                    //     color: "white",
                                                    // }}
                                                ></i>
                                            </span>
                                        )}
                                    </button>
                                    <p
                                        onClick={props.sharefn}
                                        className="mr-4 mb-0 btn btn-default"
                                    >
                                        <i
                                            className="fas fa-share-alt fa-2x"
                                            style={{ color: "white" }}
                                        ></i>
                                    </p>
                                    {/* <Link
                                        // onClick={(e) =>
                                        //     !singleCourse
                                        //         ? e.preventDefault()
                                        //         : ""
                                        // }
                                        to={`/buy/${props.courseid}`}
                                        className=""
                                    > */}
                                    <button
                                        className="header__btn__startlearn header__btn__spcl hover__border__spcl"
                                        // onClick={props.startLearningfn}
                                        onClick={() =>
                                            onCoursePageRedirect(props.courseid)
                                        }
                                        diasabled={spinner}
                                    >
                                        <span>Start Learning</span>
                                    </button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* {spinner ? (
                <div className="loader">
                    <Spinner />
                </div>
            ) : null} */}
        </div>
    );
}

export default SingleCourseHeader;
