import React, { useEffect, useState } from "react";
import _ from "react-bootstrap";
import "./Navbar/navbar.css";

const Navbar = () => {
    function redirectfn(e) {
        console.log(e.target);
        const value = e.target.dataset.redirect;
        console.log("value", value);
        window.location.href = `${value}`;
    }
    const [key, SetKey] = useState("");

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.getItem("pn_en") ? setLoggedIn(true) : setLoggedIn(false);
    }, []);

    let [sidenav, setSideNav] = useState(false);

    return (
        <div>
            <div className={"sideBar " + (sidenav ? "show" : "")}>
                <div className="bar">
                    <div className="text-center p-4">
                        <img
                            className="logo-img"
                            src="images/New Logo.png"
                            alt="logo.png"
                        />
                    </div>
                    <ul className="d-flex flex-column justify-content-center">
                        <li className="side-links">
                            <a href="/courses?id=free">Learn for free</a>
                        </li>
                        <li className="side-links">
                            <a href="/giveandtake">Give And Take</a>
                        </li>
                        <li className="side-links">
                            <a href="/courses">All Courses</a>
                        </li>
                        <li className="side-links">
                            <a href="#">Reach Us</a>
                        </li>
                        <li className="text-center side-links">
                            {loggedIn ? (
                                <a href="/profile" className="nav-link">
                                    <i className="flaticon-user titles titles-1 mr-2"></i>
                                    <span className="titles-1">Profile</span>
                                </a>
                            ) : (
                                <a
                                    href="/login"
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
                                </a>
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
                    <a className="navbar-brand" href="/">
                        <img
                            className="logo-img"
                            src="images/New Logo.png"
                            alt="logo.png"
                        />
                    </a>
                </div>
                <ul className="d-flex d-md-none m-0">
                    <li className="mr-3">
                        <a className="" href="#">
                            <img
                                src="./images/Cart_blue.png"
                                alt="Cart"
                                width="35px"
                            />
                        </a>
                    </li>
                    <li className="">
                        <a className="" href="/">
                            <img
                                src="./images/home_icon.png"
                                alt="Home"
                                width="35px"
                            />
                        </a>
                    </li>
                </ul>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <div className="d-lg-flex">
                        <div className="vertical-wrapper d-none d-lg-block mr-2">
                            <h2
                                className="title-vertical light-hov home3"
                                id="library"
                                style={{
                                    padding: "0.7rem 1rem",
                                    color: "rgb(0, 0, 0)",
                                }}
                            >
                                <span
                                    className="text-title"
                                    style={{ fontSize: "1rem" }}
                                >
                                    Explore
                                </span>
                                <i
                                    className="fa fa-angle-down show-down"
                                    aria-hidden="true"
                                ></i>
                            </h2>
                            <div className="content-vertical">
                                <ul
                                    id="vertical-menu"
                                    className="mega-vertical-menu nav navbar-nav"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Science and Engineering
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu ">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Psychology
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Climatology
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Science of Creativity
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Poetry
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Language
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Communicative
                                                                    English
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Software
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    MS-Excel
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    MS-Power
                                                                    Point
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Marketing
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Social Media
                                                                    Marketing
                                                                </a>
                                                            </li>
                                                            =
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Business
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Start-Up
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Programming Languages
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Basic of
                                                                    Python
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-hover="dropdown"
                                            data-toggle="dropdown"
                                        >
                                            Writing
                                            <b className="caret"></b>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="element-wrapper">
                                                <div
                                                    className="widget-nav-menu"
                                                    style={{
                                                        marginTop: "-30px",
                                                    }}
                                                >
                                                    <div className="element-list-wrapper wn-menu">
                                                        <ul className="element-menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Creative
                                                                    Writing
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Script
                                                                    Writing
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="candidate_revew_search_box w-100 course fn-520">
                            <div className="form-inline">
                                <input
                                    className="form-control col-10"
                                    type="search"
                                    placeholder="Search courses"
                                    aria-label="Search"
                                    value={key}
                                    onChange={(e) => SetKey(e.target.value)}
                                />
                                <a
                                    href={"courses?search=" + key}
                                    className="col-2 p-0"
                                >
                                    <button className="btn" type="button">
                                        <span className="flaticon-magnifying-glass"></span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/courses?id=free">
                                Learn For free
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/giveandtake">
                                Give and Take
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/courses">
                                All Courses
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/feedback">
                                Reach Us
                            </a>
                        </li>
                        <li className="nav-item log-reg">
                            {loggedIn ? (
                                <a href="/profile" className="nav-link">
                                    <i className="flaticon-user titles titles-1 mr-2"></i>
                                    <span className="titles-1">Profile</span>
                                </a>
                            ) : (
                                <a
                                    href="/login"
                                    className="light-hov btn dbxshad nav-link btn-thm circle"
                                    style={{
                                        border: "1px solid #00b0f0",
                                        padding: "0.5rem 1.2rem",
                                        fontSize: "18px",
                                    }}
                                >
                                    <span className="titles-1">
                                        Login / Register
                                    </span>
                                </a>
                            )}
                        </li>
                    </ul>
                    <ul className="d-none d-md-flex m-0">
                        <li
                            className="nav-item"
                            style={{ position: "relative" }}
                        >
                            <a
                                className="nav-link"
                                href="/wishlist"
                                style={{ padding: "0 10px" }}
                            >
                                <i class="fas fa-heart fa-2x" />.{" "}
                            </a>
                        </li>
                        <li
                            className="nav-item"
                            style={{ position: "relative" }}
                        >
                            <a
                                className="nav-link"
                                href="/cart"
                                style={{ padding: "0 10px" }}
                            >
                                <img
                                    src="./images/Cart_blue.png"
                                    alt="Cart"
                                    width="35px"
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
                                    0
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                <img
                                    src="./images/home_icon.png"
                                    alt="Home"
                                    width="35px"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
