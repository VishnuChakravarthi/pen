import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseShareModal from "./CourseShareModal";
import "../Courses.css";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import history from "../../../history";
import { url } from "../../api";
import { useStateValue } from "../../../StateProvider";

function CourseCard({
    spinner,
    course,
    fetchWishList,
    wishlistId,
    setSpinner,
    wishlist,
}) {
    // console.log(wishlistId);

    // console.log(course);
    const [modalShow, setModalShow] = useState(false);
    const [userCourses, setUserCourses] = useState([]);

    const token = localStorage.getItem("pn_en");

    const [{ cartLength }, dispatch] = useStateValue();

    useEffect(() => {
        fetchUserCourses();
    }, []);

    const onCoursePageRedirect = (id) => {
        console.log("onCoursePageRedirect", id);
        // fetchTrackProgress(id);
        redirect(id);
        console.log("clicked");
        //
    };

    const redirect = async (id) => {
        console.log("Testing", id);
        setSpinner(true);
        console.log(userCourses);
        if (userCourses.includes(id)) {
            const pro = await fetchTrackProgress(id);
            console.log(pro);
            if (pro) {
                if (pro.lesson_id) {
                    setSpinner(false);

                    return history.push(`/learn/${id}/lesson/${pro.lesson_id}`);
                }
            } else {
                setSpinner(false);

                const newCourse = await fetchSyllabus(id);
                console.log("NewCourse", newCourse);
                if (newCourse) {
                    return history.push(
                        `/learn/${id}/lesson/${newCourse.lessons[0].id}`
                    );
                }
                return swal("No Lessons to learn", {
                    icon: "error",
                });
            }
        } else {
            setSpinner(false);

            return history.push(`/buy/${id}`);
        }
        swal("Sorry", "No lessons to learn", "error");
    };

    const addtocart = async (courseid) => {
        await axios({
            method: "post",
            url: `${url}/cart`,
            headers: { Authorization: `Basic ${token}` },
            data: {
                course_id: courseid,
            },
        })
            .then(function (res) {
                // console.log(res.data);
                dispatch({
                    type: "SET_CART",
                    cartLength: cartLength + 1,
                });
                swal("Added to cart", {
                    icon: "success",
                });
            })
            .catch((e) => {
                console.log(e);
                swal("Not added to cart", {
                    icon: "warning",
                });
            });
    };

    const addtowishlist = async (courseid) => {
        console.log("wishlist");
        await axios({
            method: "post",
            url: `${url}/wishlist`,
            headers: { Authorization: `Basic ${token}` },
            data: {
                course_id: courseid,
            },
        }).then(function (res) {
            console.log(res.data);
            if (res.data.success === "Added") {
                swal({
                    text: "Added to Wishlist ",
                    icon: "success",
                });
            } else {
                swal({
                    text: "Removed from Wishlist ",
                    icon: "error",
                });
            }
            //
        });
        fetchWishList();
    };

    const fetchUserCourses = async () => {
        try {
            const response = await axios.get(`${url}/my-profile`, {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("pn_en")}`,
                },
            });
            // console.log(response.data.data.courses);
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

    // console.log(userCourses);

    // userCourses.map((courses) => {

    // })
    // console.log(userCourses);

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

    const renderRating = (rating) => {
        let ratingArr = [];
        for (let i = 0; i < rating; i++) {
            ratingArr.push(<span style={{ color: "#00b0f0" }}>&#128970;</span>);
        }
        for (let i = 0; i < 5 - rating; i++) {
            ratingArr.push(<span>&#128970;</span>);
        }
        return ratingArr;
    };

    return (
        <div
            key={course.course_id}
            className="col-lg-12 p0  all-course-single"
            style={{ border: "0.5px solid rgb(96, 100, 112)" }}
        >
            <div className="courses_list_content">
                <div className="top_courses list">
                    <div className="thumb align-content-center ">
                        <img
                            className="img-whp"
                            src={course?.feature_image}
                            alt="t1.jpg"
                            width="140"
                            height="165"
                        />
                        <Link
                            to={`/course/${course.course_id}`}
                            target="_blank"
                        >
                            <div className="overlay">Preview Course</div>
                        </Link>
                        <div className="iconhrt">
                            {wishlistId?.includes(course.course_id)
                                ? (console.log("inside"),
                                  (
                                      <div
                                          className="heart is-active"
                                          onClick={() =>
                                              addtowishlist(course.course_id)
                                          }
                                      ></div>
                                  ))
                                : (console.log("inside orrrr"),
                                  (
                                      <div
                                          className="heart"
                                          onClick={() =>
                                              addtowishlist(course.course_id)
                                          }
                                      ></div>
                                  ))}
                        </div>
                    </div>

                    <div className="details col-xs-12 col-lg-9 p-0">
                        <div className="tc_content">
                            <Link
                                to={`/course/${course.course_id}`}
                                target="_blank"
                            >
                                <h5>{course.course_title}</h5>
                            </Link>
                            <p>{course.short_description}</p>
                        </div>
                        <div className="tc_footer">
                            <ul className="tc_meta float-left fn-414">
                                <li className="list-inline-item">
                                    <span>
                                        <i className="flaticon-profile"></i>
                                    </span>
                                </li>
                                <li className="list-inline-item">
                                    <span>{course.people_count}</span>
                                </li>
                                <li className="list-inline-item">
                                    <span>
                                        <i className="flaticon-comment"></i>
                                    </span>
                                </li>
                                <li className="list-inline-item">
                                    <span>{course.lesson_count}</span>
                                </li>
                            </ul>
                            <div className="tc_price float-right fn-414">
                                {course.price_type.toLowerCase() === "free"
                                    ? "Free"
                                    : `₹ ${course.price1}`}
                            </div>
                            <div className="tc_price float-right fn-414">
                                <span className="total__rating">
                                    ({course.rating_count})
                                </span>
                            </div>
                            <ul className="tc_review float-right fn-414 coursecard__rating">
                                {renderRating(course.rating)?.map(
                                    (rating, i) => (
                                        <li
                                            key={i}
                                            className="list-inline-item"
                                        >
                                            {rating}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <Link to={`/course/${course.course_id}`}>
                                {/* <Button
                                    variant="contained"
                                    className="btn btn-primary btn-learning-gray mr-2"
                                >
                                    View Details
                                </Button> */}
                                <div
                                    // variant="contained"
                                    className="course__card__btn2 learnfree__btn from-right  mr-2"
                                    disabled={spinner}
                                >
                                    <span>View Details</span>
                                </div>
                            </Link>
                            {/* <Link to={`/buy/${course.course_id}`}> */}
                            {/* <Link to={`/learn/${course.course_id}`}> */}
                            {/* <button
                                
                            >
                            </button> */}
                            {/* <Link to={`/learn/${course.course_id}`}> */}
                            <div
                                // variant="contained"
                                className="course__card__btn1 learnfree__btn from-right  mr-2"
                                onClick={() =>
                                    onCoursePageRedirect(course.course_id)
                                }
                                disabled={spinner}
                            >
                                <span>Start Learning</span>
                            </div>
                            {/* </Link> */}
                            {/* </Link> */}

                            <div
                                // variant="contained"
                                className="course__card__btn2 learnfree__btn from-right  mr-2"
                                onClick={() => setModalShow(true)}
                            >
                                <span className="flaticon-share"> Share</span>
                            </div>

                            {/* <Button
                                variant="contained"
                                className="btn btn-secondary btn-learning-gray"
                            >
                            </Button> */}
                            <div
                                // variant="contained"
                                className="course__card__btn1 learnfree__btn from-right  mr-2"
                                onClick={() => {
                                    addtocart(course.course_id);
                                }}
                            >
                                <span>Add to cart</span>
                            </div>
                            {/* <Button
                                variant="contained"
                                className="btn btn-learning btn-learning-blue ml-2"
                                onClick={() => {
                                    addtocart(course.course_id);
                                }}
                                disabled={spinner}
                            >
                                Add to cart
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}

            <CourseShareModal
                course={course}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            {/* Modal */}
        </div>
    );
}

export default CourseCard;
