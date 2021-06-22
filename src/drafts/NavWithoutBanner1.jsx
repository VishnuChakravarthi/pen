import React from "react";

function NavWithoutBanner() {
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
            <a href="#" className="navbar_brand float-left dn-smd">
              <img
                className="logo1 img-fluid"
                src="images/blue.png"
                width="75px"
                alt="header-logo.png"
              />
              <img
                className="logo2 img-fluid"
                src="images/blue.png"
                width="75px"
                alt="header-logo2.png"
              />
              <span></span>
            </a>

            <ul
              id="respMenu"
              className="ace-responsive-menu"
              data-menu-style="horizontal"
            >
              <li>
                <a href="/">
                  <span
                    className="title"
                    style={{ color: "black" }}
                    data-redirect="/"
                  >
                    Home
                  </span>
                </a>
              </li>
              <li>
                <a href="/freecourse">
                  <span
                    className="title"
                    style={{ color: "black" }}
                    data-redirect="/freecourse"
                  >
                    All Courses
                  </span>
                </a>
              </li>
              <li>
                <a href="/learnfree">
                  <span
                    className="title"
                    style={{ color: "black" }}
                    data-redirect="/learnfree"
                  >
                    Learn For Free
                  </span>
                </a>
              </li>
              <li>
                <a href="/giveandtake">
                  <span
                    className="title"
                    style={{ color: "black" }}
                    data-redirect="/learnfree"
                  >
                    Give and Take
                  </span>
                </a>
              </li>

              <li className="last">
                <a href="/feedback">
                  <span className="title" style={{ color: "black" }}>
                    Reach us
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
                  style={{ color: "black" }}
                >
                  {" "}
                  <span className="dn-lg" style={{ color: "black" }}>
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
                        style={{ color: "black" }}
                      >
                        <span style={{ color: "white" }}>5</span>
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
                          <a href="#" className="btn btn-thm3 checkout_btns">
                            Checkout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-inline-item list_s">
                <div className="search_overlay">
                  <a
                    id="search-button-listener"
                    className="mk-search-trigger mk-fullscreen-trigger"
                    href="#"
                  >
                    <span id="search-button">
                      <i
                        className="flaticon-magnifying-glass"
                        style={{ color: "black" }}
                      ></i>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export default NavWithoutBanner;
