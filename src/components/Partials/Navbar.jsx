import React, { useEffect, useState } from "react";
import { url } from "../api";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  // const [key, SetKey] = useState("");
  // const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(true);

  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    async function fetchNotifs() {
      const token = localStorage.getItem("Token");
      await axios(`${url}/notifications`, {
        method: "get",
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then((res) => {
        console.log(res.data);
        setNotifs(res.data);
      });
    }

    if (loggedIn) {
      fetchNotifs();
    }
  }, [loggedIn]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
    // history.push("/");
    window.location.href = "/";
  };

  const markAllRead = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    try {
      await axios(`${url}/notification/ALL`, {
        method: "get",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const markOneRead = async (event, id) => {
    console.log(event);
    event.preventDefault();
    const token = localStorage.getItem("Token");
    console.log(id);
    try {
      await axios(`${url}/notification/${id}`, {
        method: "get",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".left-side-menu");
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  };

  return (
    <React.Fragment>
      <div className="navbar-custom">
        <ul className="list-unstyled topnav-menu float-right mb-0">
          {/* {props.search && (
            <li className="d-none d-sm-block">
              <form className="app-search">
                <div className="app-search-box">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        <i className="fe-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </li>
          )} */}

          <li className="notification-list">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="nav-link"
              >
                <i className="fe-bell noti-icon"></i>
                {notifs.length ? (
                  <span className="badge badge-danger rounded-circle noti-icon-badge">
                    {notifs.length}
                  </span>
                ) : null}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  className="notify-item"
                  onClick={(event) => markAllRead(event)}
                >
                  Mark all as Read
                </Dropdown.Item>
                {notifs.length ? (
                  <Dropdown.Divider />
                ) : (
                  <Dropdown.Item>No new Notifications</Dropdown.Item>
                )}
                {notifs.map((item) => (
                  <Dropdown.Item
                    className="notify-item"
                    onClick={(event) => markOneRead(event, item.id)}
                    key={item.id}
                  >
                    {item.data.msg}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li style={{ paddingTop: "1rem" }}>
            <span
              className="btn dbxshad  btn-thm circle"
              onClick={(e) => logout(e)}
              // data-toggle="modal"
              // data-target="#exampleModalCenter"
              style={{
                background: "#00b0f0",
                border: "1px solid #00b0f0",
                padding: "0.5rem 1rem",
              }}
            >
              <span className="dn-md titles-1 ">Sign Out</span>
            </span>
          </li>
        </ul>

        <div className="logo-box">
          <a href="/" className="logo text-center">
            <span className="logo-lg">
              <img src="assets/images/logo.png" alt="" width="125px" />
              {/* <!-- <span className="logo-lg-text-light">Xeria</span> --> */}
            </span>
            <span className="logo-sm">
              {/* <!-- <span className="logo-sm-text-dark">X</span> --> */}
              <img src="assets/images/logo.png" alt="" width="125px" />
            </span>
          </a>
        </div>

        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
          {window.innerWidth < 768 ? (
            <li>
              <button
                className="button-menu-mobile waves-effect"
                onClick={toggleSidebar}
              >
                <i className="fe-menu"></i>
              </button>
            </li>
          ) : (
            ""
          )}

          <li>
            <h4 className="page-title-main">Dashboard</h4>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
