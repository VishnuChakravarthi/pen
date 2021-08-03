import React from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useStateValue } from "../../StateProvider";
import "./Footer.css";

function Footer() {
    // const [{}, dispatch] = useStateValue();

    // useEffect(() => {
    //     dispatch({
    //         type: "SET_FOOTER_SCROLLPOS",
    //         footerScroll: document
    //             .getElementById("footer")
    //             .getBoundingClientRect().top,
    //     });
    // }, [window.onscroll()]);

    return (
        <React.Fragment>
            <div
                id="footer"
                style={{ position: "absolute", width: "100%", bottom: "0" }}
            >
                <div className="footer_one">
                    <div className="container">
                        <div className="row" style={{ textAlign: "center" }}>
                            {/* <div className="col-sm-6 col-md-6 col-md-6 col-lg-6">
                                <div className="footer_contact_widget">
                                    
                                </div>
                            </div> */}
                            <div className="col-sm-6 col-md-4 col-md-6 col-lg-3">
                                <div className="footer_company_widget">
                                    {/* <div className="logo-widget home1"> */}
                                    <img
                                        className="img-fluid"
                                        src="/images/white.png"
                                        width="80%"
                                        alt="header-logo.png"
                                    />
                                    <span></span>
                                    <ul className="footer__social__icons">
                                        <li className="list-inline-item">
                                            <a
                                                href="https://www.facebook.com/thepen.application"
                                                target="_blank"
                                            >
                                                <i
                                                    className="fab fa-facebook"
                                                    style={{ fontSize: "20px" }}
                                                ></i>
                                            </a>
                                        </li>
                                        {/* <li className="list-inline-item">
                      <Link to="/">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li> */}
                                        <li className="list-inline-item">
                                            <a
                                                href="https://www.instagram.com/thepenapp"
                                                target="_blank"
                                            >
                                                <i
                                                    className="fab fa-instagram"
                                                    style={{ fontSize: "20px" }}
                                                ></i>
                                            </a>
                                        </li>
                                        {/* <li className="list-inline-item">
                      <Link to="/">
                      <i className="fvar Mailto = require('react-mailto');ab fa-pinterest" aria-hidden="true"></i>
                      </Link>
                    </li> */}
                                        {/* <li className="list-inline-item">
                      <Link to="/">
                        <i className="fab fa-dribbble"></i>
                      </Link>
                    </li> */}
                                        {/* <li className="list-inline-item">
                      <Link to="/">
                        <i className="fab fa-google"></i>
                      </Link>
                    </li> */}
                                        <li className="list-inline-item">
                                            <a
                                                href="https://www.linkedin.com/showcase/thepenapp/"
                                                target="_blank"
                                            >
                                                <i
                                                    className="fab fa-linkedin"
                                                    style={{ fontSize: "20px" }}
                                                ></i>
                                            </a>
                                        </li>

                                        <li className="list-inline-item">
                                            <a
                                                href="https://www.linkedin.com/showcase/thepenapp/"
                                                target="_blank"
                                            >
                                                <i
                                                    className="fab fa-twitter-square"
                                                    style={{ fontSize: "20px" }}
                                                ></i>
                                            </a>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-md-3 col-lg-3">
                                <div className="footer_program_widget">
                                    <h4>Quicklinks</h4>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/courses?id=free">
                                                Learn for free
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/giveandtake">
                                                Give and Take
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/courses">
                                                Course List
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/feedback">Reach Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-md-3 col-lg-3">
                                <div className="footer_support_widget">
                                    <h4>Legal</h4>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to="/">Privacy Policies</Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                Terms and conditions
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-md-3 col-lg-3">
                                <div className="footer_apps_widget">
                                    <h4>Contact</h4>
                                    <ul>
                                        <li>
                                            For Queries -{" "}
                                            <Link to={`mailto:info@thepen.app`}>
                                                info@thepen.app
                                            </Link>
                                        </li>
                                        <li>
                                            For Careers -{" "}
                                            <Link
                                                to={`mailto:betterpeople@thepen.app`}
                                            >
                                                betterpeople@thepen.app
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <section className="footer_middle_area p0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 pb15 pt15">
                                <div className="logo-widget home1">
                                    <img
                                        className="img-fluid"
                                        src="images/white.png"
                                        width="65px"
                                        alt="header-logo.png"
                                    />
                                    <span></span>
                                </div>
                            </div>
                            <div className="col-sm-8 col-md-5 col-lg-6 col-xl-6 pb25 pt25 brdr_left_right">
                                <div className="footer_menu_widget">
                                    <ul>
                                        <li className="list-inline-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="/courses?id=free">
                                                Learn for free
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="/giveandtake">
                                                Give and Take
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="/courses">
                                                Course List
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="/">
                                                Content and Assessment
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-4 pb15 pt15">
                                <div className="footer_social_widget mt15">
                                    <ul>
                                        <li className="list-inline-item">
                                            <Link to="https://www.facebook.com/thepen.application">
                                                <i className="fab fa-facebook"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="https://www.instagram.com/thepenapp">
                                                <i className="fab fa-instagram"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="https://www.linkedin.com/showcase/thepenapp/">
                                                <i className="fab fa-linkedin"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <div className="footer_bottom_area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="copyright-widget text-center">
                                    <p>
                                        Copyright Pen © 2021. All Rights
                                        Reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link className="scrollToHome home5" to="/">
                <i className="flaticon-up-arrow-1"></i>
            </Link>
        </React.Fragment>
    );
}

export default Footer;
