import React from "react";

function NavMain() {
    function redirectfn(e) {
        console.log(e.target);
        const value = e.target.dataset.redirect;
        console.log("value", value);
        window.location.href = `${value}`;
    }
    return (
        <React.Fragment>
            <header className="header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu">
                <div className="container-fluid">
                    <nav>
                        <div className="menu-toggle">
                            <img
                                className="nav_logo_img img-fluid"
                                src="images/header-logo.png"
                                alt="header-logo.png"
                            />
                            <button type="button" id="menu-btn">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <a
                            href="/"
                            className="navbar_brand float-left dn-smd mt-o"
                        >
                            <img
                                className="logo1 img-fluid"
                                src="images/New Logo.png"
                                width="125px"
                                alt="logo.png"
                            />
                            <img
                                className="logo2 img-fluid"
                                src="images/New Logo.png"
                                width="125px"
                                alt="blue.png"
                            />
                            <span></span>
                        </a>
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
                                                            fontSize: "1rem",
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
                                                                IT & Software
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
                                                                    width:
                                                                        "748px",
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
                                                                Education +
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
                        <ul
                            id="respMenu"
                            className="ace-responsive-menu"
                            data-menu-style="horizontal"
                        >
                            {/* <li className="list-inline-item list_s">
                                <div className="search_overlay">
                                    <a
                                        id="search-button-listener"
                                        className="mk-search-trigger mk-fullscreen-trigger"
                                        href="#"
                                    >
                                        <span id="search-button">
                                            <i className="flaticon-magnifying-glass"></i>
                                        </span>
                                    </a>
                                </div>
                            </li>*/}
                            <li>
                                <a onClick={redirectfn}>
                                    <span className="title" data-redirect="/">
                                        <i className="flaticon-magnifying-glass"></i>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a onClick={redirectfn}>
                                    <span
                                        className="title"
                                        data-redirect="/freecourse"
                                    >
                                        All Courses
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a onClick={redirectfn}>
                                    <span
                                        className="title"
                                        data-redirect="/learnfree"
                                    >
                                        Learn For Free
                                    </span>
                                </a>
                            </li>

                            <li className="last">
                                <a href="/giveandtake">
                                    <span
                                        className="title"
                                        data-redirect="/feedback"
                                    >
                                        Give And Take
                                    </span>
                                </a>
                            </li>

                            <li className="last">
                                <a href="/feedback">
                                    <span
                                        className="title"
                                        data-redirect="/feedback"
                                    >
                                        Reach Us
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <ul className="sign_up_btn pull-right dn-smd mt20">
                            <li className="list-inline-item list_s">
                                <a
                                    href="#"
                                    className="btn flaticon-user"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                >
                                    {" "}
                                    <span className="dn-lg">
                                        Login/Register
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item list_s">
                                <div className="cart_btn">
                                    <ul className="cart">
                                        <li>
                                            <a
                                                href="#"
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
                                                    <a
                                                        href="#"
                                                        className="btn btn-thm cart_btns"
                                                    >
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
                    </nav>
                </div>
            </header>
        </React.Fragment>
    );
}

export default NavMain;
