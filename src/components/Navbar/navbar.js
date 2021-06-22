import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import _ from "react-bootstrap";
import axios from "axios";
import "./navbar.css";
import { useStateValue } from "../../StateProvider";
import { url } from "../api";
import Axios from "axios";
import history from "../../history";

const Navbar = (props) => {
    const [{ cartLength }, dispatch] = useStateValue();
    const [allCourses, setAllCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [categories, setCateories] = useState([]);
    const [sidenav, setSideNav] = useState(false);
    const [active, setActive] = useState("");
    // const [cartLength, setCartLength] = useState(0);

    // var token;

    useEffect(() => {
        localStorage.getItem("Token") ? setLoggedIn(true) : setLoggedIn(false);
        console.log(props);
    }, []);

    // console.log(token);

    useEffect(() => {
        getCategory();
        // fetchCourses();
        fetchCart();
        // fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchCart();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartLength]);

    useEffect(() => {
        console.log(searchTerm, "searchterm");
        setCourses(
            allCourses.filter((course) => {
                return course.course_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const getCategory = async () => {
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/view-categories",
            headers: {
                Authorization: `Basic ${localStorage.getItem("Token")}`,
            },
        }).then((res) => {
            console.log(res.data.data, "category");
            setCateories(res.data.data);
        });
    };

    const fetchCart = async () => {
        try {
            const response = await Axios.get(url + "/cart", {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("Token")}`,
                },
            });
            console.log(response.data.data, "datas");
            dispatch({
                type: "SET_CART",
                cartLength: response.data.data.length,
            });
            // setCartLength(response.data.data.length);
        } catch (error) {
            console.log(error);
            // setCourses([]);
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
            dispatch({
                type: "SET_WISHLIST_ITEM",
                wishlistId: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // const dispatchCourses = () => {
    //     // SetKey(e.target.value);
    //     dispatch({
    //         type: "SET_SEARCH_TERM",
    //         courses: courses.filter((course) =>
    //             course.course_title.includes(searchTerm)
    //         ),
    //     });

    //     dispatch({
    //         type: "SET_ALL_COURSES",
    //         allCourses: allCourses,
    //     });
    // };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            history.push(`/courses/${searchTerm}`);
        }
    };

    const categoryFilter = (category_id) => {
        setActive("");
        history.push(`/courses/category/${category_id}`);
    };

    return (
        <div>
            <div className={"sideBar " + (sidenav ? "show" : "")}>
                <div className="bar">
                    <div className="text-center p-4">
                        <img
                            className="logo-img"
                            src="/images/New Logo.png"
                            alt="logo.png"
                        />
                    </div>
                    <ul className="d-flex flex-column justify-content-center">
                        <li className="side-links">
                            <Link to="/courses/free">Learn for free</Link>
                        </li>
                        <li className="side-links">
                            <Link to="/giveandtake">Give And Take</Link>
                        </li>
                        <li className="side-links">
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li className="side-links">
                            <Link to="">Reach Us</Link>
                        </li>
                        <li className="text-center side-links">
                            {loggedIn ? (
                                <Link to="/profile" className="nav-link">
                                    <i className="flaticon-user titles titles-1 mr-2"></i>
                                    <span className="titles-1">
                                        {localStorage.getItem("res_us")}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="btn dbxshad nav-link btn-thm circle"
                                    style={{
                                        background: "#00b0f0",
                                        border: "1px solid #00b0f0",
                                        padding: "0.5rem 0.7rem",
                                        fontSize: "18px",
                                    }}
                                >
                                    <span className="titles-1">
                                        Login / Register
                                    </span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
                <div
                    className="bar-overlay"
                    onClick={() => {
                        setSideNav(!sidenav);
                    }}
                ></div>
            </div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white">
                <div className="">
                    <button
                        className="navbar-toggler mr-2"
                        type="button"
                        onClick={() => {
                            setSideNav(!sidenav);
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">
                        <img
                            className="logo-img"
                            src="/images/New Logo.png"
                            alt="logo.png"
                        />
                    </Link>
                </div>
                <ul className="d-flex d-md-none m-0">
                    <li className="mr-3">
                        <Link className="" to="/">
                            <img
                                src="/images/Cart_blue.png"
                                alt="Cart"
                                width="35px"
                            />
                        </Link>
                    </li>
                    <li className="" onClick={() => setActive("")}>
                        <Link className="" to="/">
                            <img
                                src="/images/home_icon.png"
                                alt="Home"
                                width="35px"
                            />
                        </Link>
                    </li>
                </ul>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <div className="d-lg-flex align-items-center">
                        <div className="vertical-wrapper d-none d-lg-block mr-2">
                            <h3
                                className="title-vertical light-hov home3"
                                id="library"
                                style={{
                                    padding: "0.7rem 1rem",
                                    color: "white !important",
                                }}
                            >
                                <span
                                    className="text-title"
                                    style={{
                                        fontSize: "14px",
                                        color: "white !important",
                                    }}
                                >
                                    Explore
                                </span>
                                <i
                                    style={{ color: "white" }}
                                    className="fa fa-angle-down show-down"
                                    aria-hidden="true"
                                ></i>
                            </h3>

                            <div className="content-vertical">
                                <ul
                                    id="vertical-menu"
                                    className="mega-vertical-menu nav navbar-nav special-ul"
                                >
                                    {categories.map(
                                        ({ category, category_id }) => (
                                            // <Link
                                            //     to={}
                                            //     className="dropdown-toggle"
                                            //     data-hover="dropdown"
                                            //     data-toggle="dropdown"
                                            // >
                                            <li
                                                key={category_id}
                                                onClick={() =>
                                                    categoryFilter(category_id)
                                                }
                                            >
                                                {category}
                                                <b className="caret"></b>
                                            </li>
                                            // </Link>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="candidate_revew_search_box w-100 course fn-520">
                            <div className="form-inline">
                                <input
                                    className="form-control col-10 border_left_top border_left_bottom"
                                    style={{ height: "43px" }}
                                    type="search"
                                    placeholder="Search courses"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                />
                                <Link
                                    to={`/courses/${searchTerm}`}
                                    className="col-2 p-0"
                                >
                                    <button
                                        className="btn border_right_top border_right_bottom"
                                        type="button"
                                        style={{ height: "43px" }}
                                    >
                                        <span
                                            className="flaticon-magnifying-glass"
                                            // onClick={dispatchCourses}
                                        ></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li
                            className="nav-item nav-main"
                            onClick={() => setActive("learn")}
                        >
                            <Link
                                className={`nav-link nav-link-ltr ${
                                    active === "learn" ? `nav-active` : ``
                                }`}
                                to="/courses/free"
                                style={{ padding: "0px" }}
                            >
                                Learn For free
                            </Link>
                        </li>
                        <li
                            className="nav-item nav-main"
                            onClick={() => setActive("give")}
                        >
                            <Link
                                className={`nav-link nav-link-ltr ${
                                    active === "give" ? `nav-active` : ``
                                }`}
                                to="/giveandtake"
                            >
                                Give and Take
                            </Link>
                        </li>
                        <li
                            className="nav-item nav-main"
                            onClick={() => setActive("courses")}
                        >
                            <Link
                                className={`nav-link nav-link-ltr ${
                                    active === "courses" ? `nav-active` : ``
                                }`}
                                to="/courses"
                            >
                                All Courses
                            </Link>
                        </li>
                        <li
                            className="nav-item nav-main"
                            onClick={() => setActive("reach")}
                        >
                            <Link
                                className={`nav-link nav-link-ltr ${
                                    active === "reach" ? `nav-active` : ``
                                }`}
                                to="/feedback"
                            >
                                Reach Us
                            </Link>
                        </li>
                        <li className="nav-item log-reg">
                            {loggedIn ? (
                                <Link
                                    to="/profile"
                                    className={`nav-link nav-link-ltr ${
                                        active === "profile" ? `nav-active` : ``
                                    }`}
                                    onClick={() => setActive("profile")}
                                >
                                    {/* <span className="titles-1"> */}
                                    <i className="flaticon-user titles titles-1 mr-2"></i>
                                    {localStorage.getItem("res_us")}
                                    {/* </span> */}
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="light-hov btn dbxshad nav-link btn-thm circle login__reg__btn"
                                    style={{
                                        border: "1px solid #00b0f0",
                                        padding: "0.5rem 1.2rem",
                                        fontSize: "14px",
                                        borderRadius: "20px",
                                        color: "white",
                                    }}
                                    onClick={() => setActive("")}
                                >
                                    <span className="">Login / Register</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                    <ul className="d-none d-md-flex m-0">
                        <li
                            className="nav-item"
                            style={{ position: "relative" }}
                            onClick={() => setActive("")}
                        >
                            <Link
                                className="nav-link"
                                to="/wishlist"
                                style={{ padding: "0 10px", color: "#00b0f0" }}
                            >
                                <i
                                    className="fas fa-heart fa-lg"
                                    style={{ fontSize: "25px" }}
                                />
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            style={{ position: "relative" }}
                            onClick={() => setActive("")}
                        >
                            <Link
                                className="nav-link"
                                to="/cart"
                                style={{ padding: "0 10px" }}
                            >
                                <img
                                    src="/images/Cart_blue.png"
                                    alt="Cart"
                                    width="25px"
                                />
                                <div
                                    className="cart-content"
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        backgroundColor: "rgb(0, 176, 240)",
                                        height: "22px",
                                        width: "22px",
                                        color: "white",
                                        borderRadius: "50%",
                                        fontWeight: "600",
                                        padding: "0",
                                    }}
                                >
                                    {cartLength}
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item" onClick={() => setActive("")}>
                            <Link className="nav-link" to="/">
                                <img
                                    src="/images/home_icon.png"
                                    alt="Home"
                                    width="35px"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
