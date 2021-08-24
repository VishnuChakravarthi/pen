import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ feedLength }) => {
  const links = [
    {
      link: "/",
      icon: "mdi-view-dashboard",
      name: "Dashboard",
    },
    {
      link: "/users",
      icon: "mdi-account",
      name: "Users",
    },
    {
      link: "/courses",
      icon: "mdi-book-open-page-variant",
      name: "Courses",
    },
    {
      link: "/course-categories",
      icon: "mdi-cards",
      name: "Categories",
    },
    {
      link: "/give-and-take",
      icon: "mdi-swap-horizontal",
      name: "Give and Take",
    },
    {
      link: "/quiz",
      icon: "mdi-view-list",
      name: "Assesments",
    },
    {
      link: "/feedback",
      icon: "mdi-comment-alert",
      name: "Feedbacks",
    },
    {
      link: "/orders",
      icon: "mdi-calendar",
      name: "Orders",
    },
    {
      link: "/course-notify",
      icon: "mdi-book-open-page-variant",
      name: "Course Request",
    },
    {
      link: "/archived",
      icon: "mdi-view-list",
      name: "Archived Courses",
    },
    {
      link: "/settings",
      icon: "mdi-settings",
      name: "Settings",
    },
  ];

  return (
    <React.Fragment>
      <div className="left-side-menu">
        <div className="slimscroll-menu">
          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li className="menu-title">Navigation</li>

              {links.map((link, index) =>
                link.name === "Give and Take" ? (
                  <li key={index}>
                    <Link to={`${link.link}`}>
                      <i className={`mdi ${link.icon}`}></i>
                      <span className="badge badge-warning float-right">
                        {feedLength}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ) : (
                  <li key={index}>
                    <Link to={`${link.link}`}>
                      <i className={`mdi ${link.icon}`}></i>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
