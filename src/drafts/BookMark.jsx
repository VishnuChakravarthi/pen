import React from "react";
import NavMain from "../components/Nav";
import Footer from "../components/Footer";
import "./bookmark.css";

function BookMark() {
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 text-center">
                                <div className="breadcrumb_content">
                                    <h4 className="breadcrumb_title">
                                        Bookmarks
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="blog_post_container">
                    <h1 className="text-center pt-4 pb-4">Bookmarks</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="main_blog_post_content">
                                    <div className="row event_lists p0">
                                        <div className="col-xl-5 pr15-xl pr0">
                                            <div className="blog_grid_post event_lists mb35">
                                                <div className="thumb">
                                                    <img
                                                        className="img-fluid w100"
                                                        src="images/blog/el1.jpg"
                                                        alt="el1.jpg"
                                                    />
                                                    <div className="post_date">
                                                        <h2>2</h2>{" "}
                                                        <span>DECEMBER</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7 pl15-xl pl0">
                                            <div className="blog_grid_post style2 event_lists mb35">
                                                <div className="details customPadding">
                                                    <h3></h3>

                                                    <ul className="mb0 d-flex justify-content-lg-around">
                                                        <li>
                                                            <a href="#">
                                                                <h4>Video</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5.00
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        two -{" "}
                                                                        <a>
                                                                            25.00
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        twenty -{" "}
                                                                        <a>
                                                                            50.00
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        four -{" "}
                                                                        <a>
                                                                            20.00
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h4>Text</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            Page
                                                                            24
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="#">
                                                                <h4>PPT</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        two -{" "}
                                                                        <a>
                                                                            1
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        twenty -{" "}
                                                                        <a>
                                                                            3
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row event_lists p0">
                                        <div className="col-xl-5 pr15-xl pr0">
                                            <div className="blog_grid_post event_lists mb35">
                                                <div className="thumb">
                                                    <img
                                                        className="img-fluid w100"
                                                        src="images/blog/el2.jpg"
                                                        alt="el2.jpg"
                                                    />
                                                    <div className="post_date">
                                                        <h2>28</h2>{" "}
                                                        <span>DECEMBER</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7 pl15-xl pl0">
                                            <div className="blog_grid_post style2 event_lists mb35">
                                                <div className="details customPadding">
                                                    <h3></h3>

                                                    <ul className="mb0 d-flex justify-content-lg-around">
                                                        <li>
                                                            <a href="#">
                                                                <h4>Video</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5.00
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        two -{" "}
                                                                        <a>
                                                                            25.00
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h4>Text</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            Page
                                                                            24
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="#">
                                                                <h4>PPT</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        two -{" "}
                                                                        <a>
                                                                            1
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        twenty -{" "}
                                                                        <a>
                                                                            3
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row event_lists p0">
                                        <div className="col-xl-5 pr15-xl pr0">
                                            <div className="blog_grid_post event_lists mb35">
                                                <div className="thumb">
                                                    <img
                                                        className="img-fluid w100"
                                                        src="images/blog/el3.jpg"
                                                        alt="el3.jpg"
                                                    />
                                                    <div className="post_date">
                                                        <h2>01</h2>{" "}
                                                        <span>MARCH</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7 pl15-xl pl0">
                                            <div className="blog_grid_post style2 event_lists mb35">
                                                <div className="details customPadding">
                                                    <h3></h3>

                                                    <ul className="mb0 d-flex justify-content-lg-around">
                                                        <li>
                                                            <a href="#">
                                                                <h4>Video</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5.00
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h4>Text</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            Page
                                                                            24
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        section
                                                                        three -{" "}
                                                                        <a>
                                                                            Page
                                                                            44
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="#">
                                                                <h4>PPT</h4>
                                                                <ul>
                                                                    <li>
                                                                        section
                                                                        one -{" "}
                                                                        <a>
                                                                            5
                                                                            slide
                                                                        </a>
                                                                    </li>

                                                                    <li>
                                                                        section
                                                                        twenty -{" "}
                                                                        <a>
                                                                            3
                                                                            slide
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default BookMark;
