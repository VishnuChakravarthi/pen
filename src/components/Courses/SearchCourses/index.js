import React, { useEffect, useState } from "react";
import { url } from "../../api";
import CourseCard from "../Utils/CourseCard";
import CourseSideBar from "../Utils/CourseSideBar";
import Pagination from "../Utils/CoursePagination";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function SearchCourses({ match }) {
    const [{ commonSearchCourses, allCoursesStore }, dispatch] =
        useStateValue();
    // const [allCourses, setAllCourses] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [searchCourses, setSearchCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [inSearchTerm, setInSearchTerm] = useState("");
    const [wishlistId, setWishlistId] = useState([]);
    const [notifyCourse, setNotifyCourse] = useState("");

    const coursesPerPage = 10;

    console.log(commonSearchCourses);
    console.log(allCoursesStore);

    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetchCourses();
        fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.search]);

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
        }
    };

    useEffect(() => {
        setCourses(
            searchCourses.filter((course) =>
                course.course_title
                    .toLowerCase()
                    .includes(inSearchTerm.toLowerCase())
            )
        );
    }, [inSearchTerm]);

    const fetchCourses = async () => {
        setSpinner(true);
        try {
            const response = await fetch(`${url}/view-all-courses`);
            const data = await response.json();
            console.log(data, "datas");

            // setAllCourses(data.data);
            setSearchCourses(
                data.data.filter((course) =>
                    course.course_title
                        .toLowerCase()
                        .includes(match.params.search.toLowerCase())
                )
            );
            setCourses(
                data.data.filter((course) =>
                    course.course_title
                        .toLowerCase()
                        .includes(match.params.search.toLowerCase())
                )
            );
        } catch (error) {
            console.log(error);
        }
        setSpinner(false);
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

    console.log(currentCourses, "currentCourses");
    console.log(currentPage, "currentPage");
    console.log(coursesPerPage, "coursesPerPage");
    console.log(indexOfFirstCourse, "indexOfFirstCourse");
    console.log(pageNumbers.length, "length");

    const changePage = (number) => {
        // console.log(e.target.id);
        setCurrentPage(number);
    };

    const dispatchCourses = () => {
        // SetKey(e.target.value);
        dispatch({
            type: "SET_SEARCH_TERM",
            courses: courses,
        });
    };

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

    return (
        <div>
            <section
                className="courses-list2"
                style={{ background: "whitesmoke", paddingTop: "90px" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <div
                                className="row courses_list_heading all-course-box"
                                style={{
                                    background: "white",
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
                                                            // id="searchElement"
                                                            className="form-control mr-sm-2"
                                                            type="search"
                                                            placeholder="Search courses"
                                                            aria-label="Search"
                                                            value={inSearchTerm}
                                                            onChange={(e) =>
                                                                setInSearchTerm(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <Link
                                                            to={`/courses/${inSearchTerm}`}
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
                                {currentCourses.length !== 0 &&
                                    currentCourses?.map((course, i) => (
                                        <CourseCard
                                            spinner={spinner}
                                            key={i}
                                            course={course}
                                            fetchWishList={fetchWishList}
                                            wishlistId={wishlistId}
                                            setSpinner={setSpinner}
                                        />
                                    ))}
                                {currentCourses.length === 0 && (
                                    <div className="col-md-12 notify__cont">
                                        <div className="notify__content">
                                            <h2>
                                                Notify me when the course is
                                                available!
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
                                                    style={{ width: "80%" }}
                                                    type="text"
                                                    value={notifyCourse}
                                                    onChange={(e) =>
                                                        setNotifyCourse(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <button
                                                className="course__card__btn1 learnfree__btn mt-3"
                                                style={{ border: "none" }}
                                                onClick={() => notifyUser()}
                                            >
                                                Notify me
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="row">
                                {coursesPerPage > 10 ? (
                                    <div className="row">
                                        <Pagination
                                            pageNumbers={pageNumbers}
                                            currentPage={currentPage}
                                            changePage={changePage}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <CourseSideBar
                                allCourses={searchCourses}
                                setCourses={setCourses}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SearchCourses;
