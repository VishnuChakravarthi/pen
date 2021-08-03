import React, { useEffect, useState } from "react";

import { url } from "../../api";
import CourseSideBar from "../Utils/CourseSideBar";
import Pagination from "../Utils/CoursePagination";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
const CourseCard = React.lazy(() => import("../Utils/CourseCard"));

function AllCourses() {
    const [allCourses, setAllCourses] = useState();
    const [courses, setCourses] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [wishlistId, setWishlistId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notifyCourse, setNotifyCourse] = useState("");
    const coursesPerPage = 10;

    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        fetchData();
        fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const notifyUser = async () => {
        try {
            await axios
                .post(
                    url + "/no-course",
                    { keyword: notifyCourse },
                    {
                        headers: {
                            Authorization: `Basic ${localStorage.getItem(
                                "Token"
                            )}`,
                        },
                    }
                )
                .then((_) => {
                    swal(
                        "Success",
                        "We will notify you once the course is available",
                        "success"
                    );
                });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWishList = async () => {
        try {
            const response = await axios.get(url + "/wishlist", {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("Token")}`,
                },
            });

            const data = response.data.data.map(
                (wishlist) => +wishlist.course_id
            );
            setWishlistId(data);
        } catch (error) {
            console.log(error);
            setWishlistId([]);
        }
    };

    console.log(allCourses, "all");
    console.log(courses, "courses");

    const updateSearch = (searchval) => {
        // console.log(searchval);
        setSearchTerm(searchval);
    };

    useEffect(() => {
        setCourses(
            allCourses?.filter((course) => {
                return course.course_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const fetchData = async () => {
        setSpinner(true);
        try {
            const response = await fetch(`${url}/view-all-courses`);
            const data = await response.json();
            // console.log(data, "datas");
            setAllCourses(data.data);
            setCourses(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses?.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(courses?.length / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (number) => {
        setCurrentPage(number);
    };

    const dispatchCourses = () => {
        dispatch({
            type: "SET_SEARCH_TERM",
            courses: courses,
        });
    };

    return (
        <div>
            <Helmet>
                <title>Courses | The Pen App</title>
                <meta name="description" content="Courses page" />
            </Helmet>
            <section
                className="courses-list2"
                style={{ background: "whitesmoke", paddingTop: "90px" }}
            >
                <div className="container course__container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
                            <div
                                className="row courses_list_heading all-course-box"
                                style={{
                                    background: "white",
                                    // margin: "0rem 0.25rem",
                                }}
                            >
                                <div className="col-xl-4 p0">
                                    <div className="instructor_search_result style2">
                                        <p className="mt10 fz15">
                                            <span className="color-dark pr10">
                                                {courses?.length}
                                            </span>{" "}
                                            results{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-8 p0">
                                    <div className="candidate_revew_select style2 text-right">
                                        <ul className="mb0">
                                            <li className="list-inline-item">
                                                <div className="candidate_revew_search_box course fn-520">
                                                    <form className="form-inline my-2 my-lg-0">
                                                        <input
                                                            id="searchElement"
                                                            className="form-control mr-sm-2"
                                                            type="search"
                                                            placeholder="Search courses"
                                                            aria-label="Search"
                                                            onChange={(e) =>
                                                                updateSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={searchTerm}
                                                        />
                                                        {/* <button
                                                            className="btn my-2 my-sm-0"
                                                            type="submit"
                                                            
                                                        >
                                                            <span className="flaticon-magnifying-glass"></span>
                                                        </button> */}

                                                        <Link
                                                            to={`/courses/${searchTerm}`}
                                                            className="col-2 p-0"
                                                        >
                                                            <button
                                                                className="btn"
                                                                type="button"
                                                            >
                                                                <span
                                                                    className="flaticon-magnifying-glass"
                                                                    onClick={
                                                                        dispatchCourses
                                                                    }
                                                                ></span>
                                                            </button>
                                                        </Link>
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row courses_container style2">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {!allCourses && (
                                        <div className="loader__center">
                                            <div className="loader_allcourse"></div>
                                        </div>
                                    )}
                                    {allCourses &&
                                        currentCourses?.length === 0 && (
                                            <div className="col-md-12 notify__cont">
                                                <div className="notify__content">
                                                    <h2>
                                                        Notify me when the
                                                        course is available!
                                                    </h2>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "60%",
                                                            justifyContent:
                                                                "space-between",
                                                            padding: "0px 10px",
                                                        }}
                                                    >
                                                        <h3>Course : </h3>
                                                        <input
                                                            style={{
                                                                width: "80%",
                                                            }}
                                                            type="text"
                                                            value={notifyCourse}
                                                            onChange={(e) =>
                                                                setNotifyCourse(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <button
                                                        className="course__card__btn1 learnfree__btn mt-3"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        onClick={() =>
                                                            notifyUser()
                                                        }
                                                    >
                                                        Notify me
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    {currentCourses?.map((course, i) => (
                                        <CourseCard
                                            spinner={spinner}
                                            key={i}
                                            course={course}
                                            fetchWishList={fetchWishList}
                                            wishlistId={wishlistId}
                                            setSpinner={setSpinner}
                                        />
                                    ))}
                                </Suspense>
                            </div>

                            {pageNumbers.length > 1 ? (
                                <div className="row">
                                    <Pagination
                                        pageNumbers={pageNumbers}
                                        currentPage={currentPage}
                                        changePage={changePage}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <CourseSideBar
                                allCourses={allCourses}
                                setCourses={setCourses}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* {spinner ? (
                <div className="loader">
                    <Spinner />
                </div>
            ) : null} */}
        </div>
    );
}

export default AllCourses;
