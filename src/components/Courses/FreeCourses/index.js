import React, { useEffect, useState } from "react";
import { url } from "../../api";
import CourseCard from "../Utils/CourseCard";
import CourseSideBar from "../Utils/CourseSideBar";
import Pagination from "../Utils/CoursePagination";
import axios from "axios";
import { Helmet } from "react-helmet";

function FreeCourses() {
    const [allCourses, setAllCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [wishlistId, setWishlistId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;

    useEffect(() => {
        fetchData();
        fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setSpinner(true);
        try {
            const response = await axios.get(
                `${url}/view-all-courses/price/FREE`
            );
            // const data = await response.json();
            console.log(response, "freedatas");
            setAllCourses(response.data.data);
            setCourses(response.data.data);
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
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setCourses(
            allCourses.filter((course) => {
                return course.course_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

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
        setCurrentPage(number);
    };

    return (
        <div>
            <Helmet>
                <title>Free Courses | The Pen App</title>
                <meta name="description" content="Free courses page" />
            </Helmet>
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
                                                            className="form-control mr-sm-2"
                                                            type="search"
                                                            placeholder="Search courses"
                                                            aria-label="Search"
                                                            onChange={(e) =>
                                                                setSearchTerm(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={searchTerm}
                                                        />
                                                        <button
                                                            className="btn my-2 my-sm-0"
                                                            type="submit"
                                                        >
                                                            <span className="flaticon-magnifying-glass"></span>
                                                        </button>
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row courses_container style2">
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
                                free={true}
                                allCourses={allCourses}
                                setCourses={setCourses}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FreeCourses;
