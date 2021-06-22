import React, { useState, useEffect } from "react";
// import MyVerticallyCenteredModal from "../../drafts/shareModal";
import { url } from "../api";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseShareModal from "../Courses/Utils/CourseShareModal";
import Pagination from "../Courses/Utils/CoursePagination";
import history from "../../history";
import { Button } from "@material-ui/core";
import { Suspense } from "react";
import swal from "sweetalert";
import { useStateValue } from "../../StateProvider";
import Spinner from "../utils/Spinner";
import CourseSideBar from "../Courses/Utils/CourseSideBar";
import CourseCard from "../Courses/Utils/CourseCard";
import { Helmet } from "react-helmet";

function Wishlist({ fromProfile }) {
    // location = "/wishlist";
    // const { search } = queryString.parse(location.search);
    const [modalShow, setModalShow] = useState(false);
    const [courses, setCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [allCourses, setAllCourses] = useState([]);
    const [wishlistId, setWishlistId] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const coursesPerPage = 10;
    const [{}, dispatch] = useStateValue();

    const token = localStorage.getItem("Token");

    useEffect(() => {
        // fetchCategories();
        fetchUserCourses();
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(url + "/wishlist", {
                headers: { Authorization: `Basic ${token}` },
            });
            // const data = await response.json();
            console.log(response.data, "datas");
            setAllCourses(response.data.data.map((res) => res.course));
            setCourses(response.data.data.map((res) => res.course));
            // const data = response.data.data.map(
            //     (wishlist) => +wishlist.course_id
            // );
            setWishlistId(response.data.data.map((res) => +res.course_id));
        } catch (error) {
            console.log(error);
        }
    };

    // console.log()

    // const fetchTrackProgress = async (course_id) => {
    //     try {
    //         const response = await axios.get(
    //             `${url}/track/course/${course_id}`,
    //             {
    //                 headers: {
    //                     Authorization: `Basic ${token}`,
    //                 },
    //             }
    //         );
    //         console.log(response.data, "asdasdasdasdsadasdsds");
    //         return response.data.data[0];
    //     } catch (e) {}
    // };

    console.log(allCourses, "all");
    console.log(courses, "courses");
    // console.log(category, "category");

    const updateSearch = (searchval) => {
        // console.log(searchval);
        setSearchTerm(searchval);
    };

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
        } catch (e) {}
        setSpinner(false);
    };

    console.log(userCourses);

    // const fetchSyllabus = async (course_id) => {
    //     try {
    //         const response = await axios.get(`${url}/syllabus/${course_id}`, {
    //             headers: {
    //                 Authorization: `Basic ${token}`,
    //             },
    //         });
    //         return response.data.data[0];
    //     } catch (e) {}
    // };

    // const onCoursePageRedirect = (id) => {
    //     // fetchTrackProgress(id);
    //     redirect(id);
    //     console.log("clicked");
    //     //
    // };

    // const redirect = async (id) => {
    //     setSpinner(true);
    //     if (userCourses.includes(id)) {
    //         const pro = await fetchTrackProgress(id);
    //         console.log(pro);
    //         if (pro) {
    //             history.push(`/learn/${id}/lesson/${pro.lesson_id}`);
    //         } else {
    //             const newCourse = await fetchSyllabus(id);
    //             history.push(`/learn/${id}/lesson/${newCourse.lessons[0].id}`);
    //         }
    //     } else {
    //         history.push(`/buy/${id}`);
    //     }
    //     setSpinner(false);
    // };

    useEffect(() => {
        // console.log(searchTerm, "searchterm");
        setCourses(
            allCourses.filter((course) => {
                return course.course_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    // const addtocart = async (courseid) => {
    //     await axios({
    //         method: "post",
    //         url: `${url}/cart`,
    //         headers: { Authorization: `Basic ${token}` },
    //         data: {
    //             course_id: courseid,
    //         },
    //     })
    //         .then(function (res) {
    //             // console.log(res.data);
    //             dispatch({
    //                 type: "SET_CART",
    //                 cartLength: cartLength + 1,
    //             });
    //             swal("Added to cart", {
    //                 icon: "success",
    //             });
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //             swal("Not added to cart", {
    //                 icon: "warning",
    //             });
    //         });
    // };

    // const addtowishlist = async (courseid) => {
    //     // console.log("wishlist");
    //     await axios({
    //         method: "post",
    //         url: `${url}/wishlist`,
    //         headers: { Authorization: `Basic ${token}` },
    //         data: {
    //             course_id: courseid,
    //         },
    //     }).then(function (res) {
    //         console.log(res.data);
    //         if (res.data.success === "Added") {
    //             swal({
    //                 text: "Added to Wishlist ",
    //                 icon: "success",
    //             });
    //         } else {
    //             swal({
    //                 text: "Removed from Wishlist ",
    //                 icon: "error",
    //             });
    //         }
    //         //
    //     });
    //     fetchData();
    // };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses?.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    console.log(currentCourses, "currrrrrreeeeennnnnntttt");

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(courses?.length / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (number) => {
        setCurrentPage(number);
    };

    const dispatchCourses = () => {
        // SetKey(e.target.value);
        dispatch({
            type: "SET_SEARCH_TERM",
            courses: courses,
        });
    };

    return (
        <>
            <Helmet>
                <title>
                    {fromProfile
                        ? `Profile | The Pen App`
                        : `Wishlist | The Pen App`}{" "}
                </title>
                <meta name="description" content="Wishlist page" />
            </Helmet>
            {/*  */}
            <section
                className="courses-list2"
                style={
                    !fromProfile
                        ? { background: "whitesmoke", paddingTop: "90px" }
                        : { background: "transparent", paddingTop: "0px" }
                }
            >
                <div className="container course__container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                                    {currentCourses?.map((course, i) => (
                                        <CourseCard
                                            spinner={spinner}
                                            key={i}
                                            course={course}
                                            fetchWishList={fetchData}
                                            wishlistId={wishlistId}
                                            setSpinner={setSpinner}
                                            wishlist={true}
                                        />
                                    ))}
                                </Suspense>
                            </div>

                            {coursesPerPage > 10 && (
                                <div className="row">
                                    <Pagination
                                        pageNumbers={pageNumbers}
                                        currentPage={currentPage}
                                        changePage={changePage}
                                    />
                                </div>
                            )}
                        </div>
                        {/* <div className="col-lg-4 col-xl-3">
                            <CourseSideBar
                                allCourses={allCourses}
                                setCourses={setCourses}
                            />
                        </div> */}
                    </div>
                </div>
            </section>
            {/* {spinner ? (
                <div className="loader">
                    <Spinner />
                </div>
            ) : null} */}
        </>
    );
}

export default Wishlist;
