import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { url } from "../api";
import { CSVLink } from "react-csv";
import axios from "axios";
import SortComp from "../Partials/SortComp";

const ArchivedCourses = () => {
  //populating courses from api
  const [courses, setCourses] = useState([]);
  const sort = (column, sorttype) => {
    var coursesort = courses;

    if (column === "subscription") {
      coursesort = [...courses].sort((a, b) => {
        return (a.people_count - b.people_count) * sorttype;
      });
      setCourses(coursesort);
    } else if (column === "title") {
      coursesort = [...courses].sort((a, b) => {
        var check = a.course_title > b.course_title ? 1 : -1;
        return check * sorttype;
      });
      setCourses(coursesort);
    } else if (column === "created") {
      coursesort = [...courses].sort((a, b) => {
        var check = a.created_at > b.created_at ? 1 : -1;
        return check * sorttype;
      });
      setCourses(coursesort);
    } else if (column === "category") {
      coursesort = [...courses].sort((a, b) => {
        var check = a.category >= b.category ? 1 : -1;
        return check * sorttype;
      });
      setCourses(coursesort);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const FetchData = async () => {
      try {
        await axios({
          method: "GET",
          url: `/view-all-courses-admin`,
          baseURL: `${url}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          const archiveCourses = res.data.data.filter(
            (course) => course.status !== "active"
          );
          console.log(archiveCourses);
          setCourses(archiveCourses ? archiveCourses : []);
        });
      } catch (error) {
        swal({
          text: "Cannot connect to server",
          icon: "error",
        });
      }
    };

    FetchData();
  }, []);

  const archiveCourse = async (event, id) => {
    event.preventDefault();

    const willArchive = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Un-archive this course?",
      icon: "warning",
      dangerMode: true,
    });

    if (!willArchive) {
      return;
    }
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .put(
        `${url}/active-course/${id}`,
        {},
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal("Success!", "Course Unarchived!", "success");
      })
      .catch((error) => {
        console.log(error);
        console.log(`${url}/active-course/${id}`);
        swal("OOPS!", "Course Unarchive Failed", "error");
      });
  };

  const headers = [
    { label: "ID", key: "course_id" },
    { label: "Name", key: "course_title" },
    { label: "Category", key: "category" },
    { label: "Subscriptions", key: "people_count" },
    { label: "Created Date", key: "created_at" },
  ];

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="d-flex justify-content-between">
                <h3>Archived Courses</h3>
                <div className="d-flex align-items-center">
                  {courses !== [] && (
                    <CSVLink
                      data={courses}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mb-2"
                      filename={"archived_courses.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>
                        Name
                        <SortComp sort={sort} field="title" />
                      </th>
                      <th>
                        Created On
                        <SortComp sort={sort} field="created" />
                      </th>
                      <th>
                        Category
                        <SortComp sort={sort} field="category" />
                      </th>
                      <th>
                        Subscriptions
                        <SortComp sort={sort} field="subscription" />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((item, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.course_title}</td>
                        <td>{item.created_at}</td>
                        <td>{item.category}</td>
                        <td>{item.people_count ? item.people_count : 0}</td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/view-course?id=${item.course_id}`}>
                              {" "}
                              <button className="btn btn-primary mr-3">
                                View
                              </button>
                            </Link>
                            <button
                              className="btn btn-danger mr-3"
                              id={item.course_id}
                              onClick={(e) => archiveCourse(e, item.course_id)}
                            >
                              Un-Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ArchivedCourses;
