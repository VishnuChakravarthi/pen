import React, { useState, useEffect } from "react";
import MyVerticallyCenteredModal from "../shareModal";
import { url } from "../api";
import Axios from "axios";
import { Link } from "react-router-dom";
import CourseShareModal from "../Courses/Utils/CourseShareModal";

function Wishlist() {
    // location = "/wishlist";
    // const { search } = queryString.parse(location.search);
    const [modalShow, setModalShow] = useState(false);
    const [courses, setCourses] = useState([]);
    // const [cat, setCat] = useState([]);
    // const [skill, setSkill] = useState([]);
    // const [key,SetKey]=useState(search?search:"");

    // function coursefn(e) {
    //     window.location.href = `/course-info?id=${e}`;
    // }

    // async function pricefn(e) {
    //     console.log(e.target.checked, "checked");
    //     console.log(e.target.name, "name");
    //     console.log(paid, free, "options");

    //     if (e.target.checked && e.target.name === "free" && !paid) {
    //         try {
    //             const response = await fetch(
    //                 url + `/view-all-courses/price/FREE`
    //             );
    //             const data = await response.json();
    //             console.log(data.data);
    //             setCourses(data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else if (e.target.checked && e.target.name === "paid") {
    //         if (!free) {
    //             try {
    //                 const response = await fetch(
    //                     url + `/view-all-courses/price/PAID`
    //                 );
    //                 const data = await response.json();
    //                 console.log(data.data);
    //                 setCourses(data.data);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //     } else {

    const token = localStorage.getItem("pn_en");
    //     }
    // }

    // async function skillCheckFn(e) {
    //     if (e.target.checked === true) {
    //         const skill = e.target.id;

    //         try {
    //             const response = await fetch(
    //                 url + `/view-all-courses/skill/${skill}`
    //             );
    //             const data = await response.json();
    //             console.log(data, "datas");
    //             setCourses(data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    // async function fetchCatfn(e) {
    //     if (e.target.checked === true) {
    //         const cat = e.target.id;
    //         try {
    //             const response = await fetch(
    //                 url + `/view-all-courses/category/${cat}`
    //             );
    //             const data = await response.json();
    //             console.log(data, "datas");
    //             if (data.data) {
    //                 setCourses(data.data);
    //             } else {
    //                 setCourses([]);
    //             }
    //         } catch (error) {}
    //     }
    // }

    useEffect(() => {
        // const { id } = queryString.parse(location.search);

        fetchData();

        //     const fetchData = async () => {
        //         try {
        //             const response = await fetch(courses);
        //             const data = await response.json();
        //             console.log(data, "datas");
        //             setCourses(data.data);
        //         } catch (error) {
        //             console.log(error);
        //             // setCourses([]);
        //         }
        //     };
        //     const fetchData2 = async () => {
        //         try {
        //             const response = await fetch(url + "/view-categories");
        //             const data = await response.json();
        //             console.log(data, "datas");
        //             setCat(data.data);
        //         } catch (error) {
        //             console.log(error);
        //             // setCat([]);
        //         }
        //     };
        //     const fetchData3 = async () => {
        //         try {
        //             const response = await fetch(url + "/skill-level-count");
        //             const data = await response.json();
        //             console.log(data, "datas");
        //             setSkill(data);
        //         } catch (error) {
        //             console.log(error);
        //             // setSkill([]);
        //         }
        //     };
        //     fetchData()
        //     // .then(suc=>{
        //     //     console.log(search)
        //     //     if(search&&search!="")
        //     //     searchFilterfn(search)

        //     // });
        //     fetchData2();
        //     fetchData3();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Axios.get(url + "/wishlist", {
                headers: { Authorization: `Basic ${token}` },
            });
            // const data = await response.json();
            console.log(response.data, "datas");
            setCourses(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderRating = (rating) => {
        let ratingArr = [];
        for (let i = 0; i < rating; i++) {
            ratingArr.push("⭐");
        }
        for (let i = 0; i < 5 - rating; i++) {
            ratingArr.push("★");
        }
        return ratingArr;
    };

    const mappedData = courses?.map((item, index) => {
        item = item.course;
        return (
            <Link key={index} to={`/course/${item.course_id}`} target="_blank">
                <div
                    className="col-lg-12 all-course-single"
                    style={
                        index % 2 == 0
                            ? { border: "0.5px solid #606470" }
                            : { border: "0.5px solid #00b0f0" }
                    }
                >
                    <div className="courses_list_content">
                        <div className="top_courses list">
                            <div className="thumb col- align-content-center">
                                <img
                                    className="img-whp"
                                    src={item.feature_image}
                                    alt="t1.jpg"
                                    width="140px"
                                    height="165px"
                                />
                                <div className="overlay">
                                    <div className="icon">
                                        <span className="flaticon-like"></span>
                                    </div>
                                    Preview Course
                                </div>
                            </div>
                            <div className="details col-9 p-0">
                                <div className="tc_content">
                                    <h5> {item.course_title}</h5>

                                    <p>{item.short_description}</p>
                                </div>
                                <div className="tc_footer">
                                    <ul className="tc_meta float-left fn-414">
                                        <li className="list-inline-item">
                                            <i className="flaticon-profile"></i>
                                        </li>
                                        <li className="list-inline-item">
                                            {item.people_count}
                                        </li>
                                        <li className="list-inline-item">
                                            <i className="fas fa-book-open"></i>
                                        </li>
                                        <li className="list-inline-item">
                                            {item.lesson_count}
                                        </li>
                                    </ul>
                                    {/* {item.price1 ? ( */}
                                    <div className="tc_price float-right fn-414">
                                        {item.price1
                                            ? `₹ ${item.price1}`
                                            : "Free"}
                                    </div>
                                    {/* ) : (
                                              <div className="tc_price float-right fn-414">
                                                  Free
                                              </div>
                                          )} */}

                                    <ul className="tc_review float-right fn-414">
                                        {renderRating(item.rating)?.map(
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
                                    <Link to={`/course/${item.course_id}`}>
                                        <button className="btn btn-primary mr-2">
                                            View Details
                                        </button>
                                    </Link>
                                    <Link to={`/buy/${item.course_id}`}>
                                        <button className="btn  btn-learning mr-2">
                                            Start Learning
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setModalShow(true)}
                                    >
                                        <span className="flaticon-share">
                                            {" "}
                                            Share
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    });
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <React.Fragment>
                <section className="courses-list2">
                    <div className="container ">
                        <div className="row">
                            <div className="col-12 justify-content-center text-center">
                                <div
                                    className="row courses_list_heading  all-course-box"
                                    style={{
                                        background: "white",
                                        margin: "0rem 0.25rem",
                                    }}
                                >
                                    <div className="col-xl-4 p0">
                                        <div className="instructor_search_result style2">
                                            <p className="d-flex align-items-center m-0">
                                                <span
                                                    style={{
                                                        marginRight: "25px",
                                                        fontSize: "25px",
                                                        fontWeight: "800",
                                                        color: "#00b0ff",
                                                    }}
                                                >
                                                    Wishlist
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 p0"></div>
                                </div>
                                <div className="mt-2">
                                    {mappedData.length ? (
                                        mappedData
                                    ) : (
                                        <span className="mt-2">
                                            Nothing added to wishlist
                                        </span>
                                    )}
                                </div>
                                <div className="row">
                                    <Pagination
                                        pageNumbers={pageNumbers}
                                        currentPage={currentPage}
                                        changePage={changePage}
                                    />
                                </div>
                            </div>
                            {/* modal */}
                            <CourseShareModal
                                course={item}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default Wishlist;
