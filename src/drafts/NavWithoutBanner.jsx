import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavWIthoutBanner() {
    function redirect(e) {
        console.log(e.target);
        const value = e.target.dataset.redirect;
        console.log("value", value);
        window.location.href = `${value}`;
    }

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.getItem("pn_en") ? setLoggedIn(true) : setLoggedIn(false);
    }, []);
    return (
        <React.Fragment>
            <div className="wrapper">
                <div className="preloader"></div>
                {/* <div className="header_top home3"> */}
                {/*    <div className="container-fluid">
            <div className="row">
              {/* <div className="col-lg-5 col-xl-5">
                <ul className="home3_header_top_contact pull-left">
                  <li className="list-inline-item">
                    <a href="">(56) 123 456 789</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">hello@Pen.com</a>
                  </li>
                </ul>
              </div> */}
                {/* <div className="col-lg-7 col-xl-7">
                <ul className="sign_up_btn pull-right dn-smd mt15 home3">
                  <li className="list-inline-item">
                    <a href="" className="btn btn-md">
                      <i className="flaticon-megaphone"></i>
                      <span className="dn-md">Become an Instructor</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href=""
                      className="btn btn-md"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <i className="flaticon-user"></i>{" "}
                      <span className="dn-md">Login/Register</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <div className="cart_btn">
                      <ul className="cart">
                        <li>
                          <a
                            href=""
                            className="btn cart_btn flaticon-shopping-bag"
                          >
                            <span>5</span>
                          </a>
                          <ul className="dropdown_content">
                            <li className="list_content">
                              <a href="#">
                                <img
                                  className="float-left"
                                  src="http://via.placeholder.com/50x50"
                                  alt="50x50"
                                />
                                <p>Dolar Sit Amet</p>
                                <small>1 × $7.90</small>
                                <span className="close_icon float-right">
                                  <i className="fa fa-plus"></i>
                                </span>
                              </a>
                            </li>
                            <li className="list_content">
                              <a href="#">
                                <img
                                  className="float-left"
                                  src="http://via.placeholder.com/50x50"
                                  alt="50x50"
                                />
                                <p>Lorem Ipsum</p>
                                <small>1 × $7.90</small>
                                <span className="close_icon float-right">
                                  <i className="fa fa-plus"></i>
                                </span>
                              </a>
                            </li>
                            <li className="list_content">
                              <a href="#">
                                <img
                                  className="float-left"
                                  src="http://via.placeholder.com/50x50"
                                  alt="50x50"
                                />
                                <p>Is simply</p>
                                <small>1 × $7.90</small>
                                <span className="close_icon float-right">
                                  <i className="fa fa-plus"></i>
                                </span>
                              </a>
                            </li>
                            <li className="list_content">
                              <h5>Subtotal: $57.70</h5>
                              <a href="#" className="btn btn-thm cart_btns">
                                View cart
                              </a>
                              <a
                                href="#"
                                className="btn btn-thm3 checkout_btns"
                              >
                                Checkout
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div> */}
                {/* </div>
          </div>*/}
                {/* </div> */}
                <header
                    className="header-nav menu_style_home_three pt-1  stricky main-menu"
                    id="navigation2"
                    style={{
                        background: "white",
                        borderBottom: "0.3px solid rgba(0,0,0,0.5)",
                        boxShadow: "0 0 6.1px 0.9px rgba(0,0,0,.3)",
                    }}
                >
                    <div className="container-fluid">
                        <nav className="d-flex align-items-baseline justify-content-between">
                            <div className="menu-toggle">
                                <img
                                    className="nav_logo_img img-fluid"
                                    src="images/white.png"
                                    width="60px"
                                    alt="logo.png"
                                />
                                <button type="button" id="menu-btn">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>

                            <div
                                className="container-1 d-flex align-items-baseline justify-content-around"
                                style={{ flexBasis: "45%" }}
                            >
                                <div className="ht_left_widget home3 float-left mt-3">
                                    <ul>
                                        <li className="list-inline-item">
                                            <div className="header_top_lang_widget">
                                                <div className="ht-widget-container">
                                                    <div className="vertical-wrapper">
                                                        <h2
                                                            className="title-vertical home3"
                                                            id="library"
                                                        >
                                                            <span
                                                                className="text-title"
                                                                style={{
                                                                    fontSize:
                                                                        "1.25rem",
                                                                }}
                                                            >
                                                                Explore
                                                            </span>{" "}
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
                                                                    <a href="#">
                                                                        Development
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Business
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        IT &
                                                                        Software
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        className="dropdown-toggle"
                                                                        data-hover="dropdown"
                                                                        data-toggle="dropdown"
                                                                    >
                                                                        Design{" "}
                                                                        <b className="caret"></b>
                                                                    </a>
                                                                    <div
                                                                        className="dropdown-menu vertical-megamenu"
                                                                        style={{
                                                                            width: "748px",
                                                                        }}
                                                                    >
                                                                        <div className="dropdown-menu-inner">
                                                                            <div className="element-inner">
                                                                                <div className="element-section-wrap">
                                                                                    <div className="element-container">
                                                                                        <div className="element-row">
                                                                                            <div className="col-lg-7">
                                                                                                <div className="row">
                                                                                                    <div className="col-lg-6">
                                                                                                        <div className="element-wrapper">
                                                                                                            <div className="title-wrapper">
                                                                                                                <div className="element-wrapper-title">
                                                                                                                    Topics
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="widget-nav-menu">
                                                                                                                <div className="element-list-wrapper wn-menu">
                                                                                                                    <ul className="element-menu-list">
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Color
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Digital
                                                                                                                                Painting
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Drawing
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Illustration
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Logo
                                                                                                                                Design
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                User
                                                                                                                                Experience
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Web
                                                                                                                                Design
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="element-warapper-btn">
                                                                                                                <a href="#">
                                                                                                                    <div className="element-wrapper-sub-title">
                                                                                                                        See
                                                                                                                        All{" "}
                                                                                                                        <i className="flaticon-right-arrow-1"></i>
                                                                                                                    </div>
                                                                                                                </a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-6">
                                                                                                        <div className="element-wrapper">
                                                                                                            <div className="title-wrapper">
                                                                                                                <div className="element-wrapper-title">
                                                                                                                    Popular
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="widget-nav-menu">
                                                                                                                <div className="element-list-wrapper wn-menu">
                                                                                                                    <ul className="element-menu-list">
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Color
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Digital
                                                                                                                                Painting
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Drawing
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Illustration
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Logo
                                                                                                                                Design
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                User
                                                                                                                                Experience
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                        <li>
                                                                                                                            <a href="#">
                                                                                                                                Web
                                                                                                                                Design
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="element-warapper-btn">
                                                                                                                <a href="#">
                                                                                                                    <div className="element-wrapper-sub-title">
                                                                                                                        See
                                                                                                                        All{" "}
                                                                                                                        <i className="flaticon-right-arrow-1"></i>
                                                                                                                    </div>
                                                                                                                </a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-lg-5 p0">
                                                                                                <div className="element-img-widget-wrapper">
                                                                                                    <div className="element-widget-thumb">
                                                                                                        <a href="#">
                                                                                                            <img
                                                                                                                className="img-fluid"
                                                                                                                src="images/resource/1.png"
                                                                                                                alt="1.png"
                                                                                                            />
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Marketing
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Lifestyle
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Photography
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Education
                                                                        +
                                                                        Elearning
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        Music
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

                                <li className="list_three list-style-none">
                                    <a href="/learnfree">
                                        <span
                                            className="titles titles-1"
                                            data-redirect="/learnfree"
                                        >
                                            Learn For Free
                                        </span>
                                    </a>
                                </li>

                                <li className="list-_five list-style-none">
                                    <a href="/giveandtake">
                                        <span className="titles titles-1">
                                            Give And Take
                                        </span>
                                    </a>
                                </li>

                                <li className="list_two list-style-none">
                                    <a href="/courses">
                                        <span
                                            className="titles titles-1"
                                            data-redirect="/freecourse"
                                        >
                                            {" "}
                                            All Courses
                                        </span>
                                    </a>
                                </li>
                            </div>

                            <a
                                href="/"
                                className="navbar_brand mt-0 dn-smd align-self-center mr-0"
                                style={{}}
                            >
                                <img
                                    className="logo1 img-fluid"
                                    src="images/blue.png"
                                    width="95px"
                                    height="96px"
                                    alt="logo.png"
                                    id="Logo3"
                                />
                                <img
                                    className="logo2 img-fluid"
                                    src="images/blue.png"
                                    width="95px"
                                    height="96px"
                                    alt="logo.png"
                                    id="Logo4"
                                />
                            </a>

                            <div
                                className="d-flex justify-content-around align-items-baseline"
                                style={{ flexBasis: "45%" }}
                            >
                                <li className="list-_five list-style-none">
                                    <a href="/feedback">
                                        <span className="titles titles-1">
                                            Reach Us
                                        </span>
                                    </a>
                                </li>
                                <li
                                    className="list_four "
                                    style={{ listStyle: "none" }}
                                >
                                    {loggedIn ? (
                                        <a
                                            href="/profile"
                                            className="list-style-none"
                                        >
                                            <i className="flaticon-user titles titles-1 mr-2"></i>
                                            <span className="dn-md titles  titles-1">
                                                Profile
                                            </span>
                                        </a>
                                    ) : (
                                        <a
                                            href="/login"
                                            className="btn dbxshad btn-lg btn-thm circle"
                                            // data-toggle="modal"
                                            // data-target="#exampleModalCenter"
                                            style={{
                                                background: "#00b0f0",
                                                border: "1px solid #00b0f0",
                                            }}
                                        >
                                            {/* <i className="flaticon-user titles titles-1"></i>{" "} */}
                                            <span className="dn-md titles  titles-1">
                                                Sign up
                                            </span>
                                        </a>
                                    )}
                                </li>
                                <li className="last list-style-none">
                                    <a
                                        href=""
                                        className="btn p-0 cart_btn flaticon-magnifying-glass titles titles-1"
                                        style={{ fontSize: "20px" }}
                                    ></a>
                                </li>

                                <li className="last list-style-none">
                                    <a
                                        href=""
                                        className="btn p-0 cart_btn  titles titles-1"
                                        style={{ fontSize: "20px" }}
                                    >
                                        <img
                                            src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png"
                                            width="45%"
                                        />{" "}
                                        <span style={{ color: "white" }}>
                                            5
                                        </span>
                                    </a>
                                </li>

                                <li className="list_one list-style-none align-self-end">
                                    <a href="/">
                                        <span className="titles titles-1">
                                            <i class="fas fa-home fa-2x"></i>
                                        </span>
                                    </a>
                                </li>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>

            <div
                className="sign_up_modal modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ul
                            className="sign_up_tab nav nav-tabs"
                            id="myTab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    id="home-tab"
                                    data-toggle="tab"
                                    href="#home"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                >
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="profile-tab"
                                    data-toggle="tab"
                                    href="#profile"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Register
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="login_form">
                                    <form action="#">
                                        <div className="heading">
                                            <h3 className="text-center">
                                                Login to your account
                                            </h3>
                                            <p className="text-center">
                                                Don't have an account?{" "}
                                                <a
                                                    className="text-thm"
                                                    href="#"
                                                >
                                                    Sign Up!
                                                </a>
                                            </p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                            />
                                            <label
                                                className="form-check-label"
                                                HtmlFor="exampleCheck1"
                                            >
                                                Remember me
                                            </label>
                                            <a
                                                className="tdu text-thm float-right"
                                                href="#"
                                            >
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-log btn-block btn-thm2"
                                        >
                                            Login
                                        </button>
                                        <hr />
                                        <div className="row mt40">
                                            <div className="col-lg">
                                                <button
                                                    type="submit"
                                                    className="btn btn-block color-white bgc-fb"
                                                >
                                                    <i className="fa fa-facebook float-left mt5"></i>
                                                    Facebook
                                                </button>
                                            </div>
                                            <div className="col-lg">
                                                <button
                                                    type="submit"
                                                    className="btn btn-block color-white bgc-gogle"
                                                >
                                                    <i className="fa fa-google float-left mt5"></i>{" "}
                                                    Google
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="profile"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                            >
                                <div className="sign_up_form">
                                    <div className="heading">
                                        <h3 className="text-center">
                                            Create New Account
                                        </h3>
                                        <p className="text-center">
                                            Have an account?{" "}
                                            <a className="text-thm" href="#">
                                                Login
                                            </a>
                                        </p>
                                    </div>
                                    <form action="#">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail2"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword2"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword3"
                                                placeholder="Confirm Password"
                                            />
                                        </div>
                                        {/* <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2"
                      />
                      <label
                        className="form-check-label"
                        HtmlFor="exampleCheck2"
                      >
                        Want to become an instructor?
                      </label>
                    </div> */}
                                        <button
                                            type="submit"
                                            className="btn btn-log btn-block btn-thm2"
                                        >
                                            Register
                                        </button>
                                        <hr />
                                        <div className="row mt40">
                                            <div className="col-lg">
                                                <button
                                                    type="submit"
                                                    className="btn btn-block color-white bgc-fb"
                                                >
                                                    <i className="fa fa-facebook float-left mt5"></i>{" "}
                                                    Facebook
                                                </button>
                                            </div>
                                            <div className="col-lg">
                                                <button
                                                    type="submit"
                                                    className="btn btn-block color-white bgc-gogle"
                                                >
                                                    <i className="fa fa-google float-left mt5"></i>{" "}
                                                    Google
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="search_overlay dn-992">
                <div
                    className="mk-fullscreen-search-overlay"
                    id="mk-search-overlay"
                >
                    <a
                        href="#"
                        className="mk-fullscreen-close"
                        id="mk-fullscreen-close-button"
                    >
                        <i className="fa fa-times"></i>
                    </a>
                    <div id="mk-fullscreen-search-wrapper">
                        <form method="get" id="mk-fullscreen-searchform">
                            <input
                                type="text"
                                value=""
                                placeholder="Search courses..."
                                id="mk-fullscreen-search-input"
                            />
                            <i className="flaticon-magnifying-glass fullscreen-search-icon">
                                <input value="" type="submit" />
                            </i>
                        </form>
                    </div>
                </div>
            </div>

            <div id="page" className="stylehome1 home3 h0">
                <div className="mobile-menu">
                    <div className="header stylehome1">
                        <div className="main_logo_home2">
                            <img
                                className="nav_logo_img img-fluid float-left mt20"
                                src="images/header-logo.png"
                                alt="header-logo.png"
                            />
                            <span>Pen</span>
                        </div>
                        <ul className="menu_bar_home2">
                            <li className="list-inline-item">
                                <div className="search_overlay">
                                    <a
                                        id="search-button-listener2"
                                        className="mk-search-trigger mk-fullscreen-trigger"
                                        href="#"
                                    >
                                        <div id="search-button2">
                                            <i className="flaticon-magnifying-glass"></i>
                                        </div>
                                    </a>
                                    <div
                                        className="mk-fullscreen-search-overlay"
                                        id="mk-search-overlay2"
                                    >
                                        <a
                                            href="#"
                                            className="mk-fullscreen-close"
                                            id="mk-fullscreen-close-button2"
                                        >
                                            <i className="fa fa-times"></i>
                                        </a>
                                        <div id="mk-fullscreen-search-wrapper2">
                                            <form
                                                method="get"
                                                id="mk-fullscreen-searchform2"
                                            >
                                                <input
                                                    type="text"
                                                    value=""
                                                    placeholder="Search courses..."
                                                    id="mk-fullscreen-search-input2"
                                                />
                                                <i className="flaticon-magnifying-glass fullscreen-search-icon">
                                                    <input
                                                        value=""
                                                        type="submit"
                                                    />
                                                </i>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-inline-item">
                                <a href="#menu">
                                    <span></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <nav id="menu" className="stylehome1">
                    <ul>
                        <li>
                            <span>Home</span>
                        </li>
                        <li>
                            <span>Courses</span>
                        </li>
                        <li>
                            <span>Events</span>
                            <ul>
                                <li>
                                    <a href="page-event.html">Event List</a>
                                </li>
                                <li>
                                    <a href="page-event-single.html">
                                        Event Single
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span>Pages</span>
                            <ul>
                                <li>
                                    <span>Shop Pages</span>
                                    <ul>
                                        <li>
                                            <a href="page-shop.html">Shop</a>
                                        </li>
                                        <li>
                                            <a href="page-shop-single.html">
                                                Shop Single
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-shop-cart.html">
                                                Cart
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-shop-checkout.html">
                                                Checkout
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-shop-order.html">
                                                Order
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span>User Admin</span>
                                    <ul>
                                        <li>
                                            <a href="page-dashboard.html">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-courses.html">
                                                My Courses
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-order.html">
                                                My Order
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-message.html">
                                                My Message
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-review.html">
                                                My Review
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-bookmarks.html">
                                                My Bookmarks
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-listing.html">
                                                My Listing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-my-setting.html">
                                                My Setting
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="page-about.html">About Us</a>
                                </li>
                                <li>
                                    <a href="page-gallery.html">Gallery</a>
                                </li>
                                <li>
                                    <a href="page-faq.html">Faq</a>
                                </li>
                                <li>
                                    <a href="page-login.html">LogIn</a>
                                </li>
                                <li>
                                    <a href="page-register.html">Register</a>
                                </li>
                                <li>
                                    <a href="page-pricing.html">Membership</a>
                                </li>
                                <li>
                                    <a href="page-error.html">404 Page</a>
                                </li>
                                <li>
                                    <a href="page-terms.html">
                                        Terms and Conditions
                                    </a>
                                </li>
                                <li>
                                    <a href="page-become-instructor.html">
                                        Become an Instructor
                                    </a>
                                </li>
                                <li>
                                    <a href="page-ui-element.html">
                                        UI Elements
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span>Blog</span>
                            <ul>
                                <li>
                                    <a href="page-blog-v1.html">Blog List 1</a>
                                </li>
                                <li>
                                    <a href="page-blog-grid.html">
                                        Blog List 2
                                    </a>
                                </li>
                                <li>
                                    <a href="page-blog-list.html">
                                        Blog List 3
                                    </a>
                                </li>
                                <li>
                                    <a href="page-blog-single.html">
                                        Single Post
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/feedback">Contact</a>
                        </li>
                        <li>
                            <a href="page-login.html">
                                <span className="flaticon-user"></span> Login
                            </a>
                        </li>
                        <li>
                            <a href="page-register.html">
                                <span className="flaticon-edit"></span> Register
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default NavWIthoutBanner;
