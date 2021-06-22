import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { url } from "../api";
import axios from "axios";
import MyVerticallyCenteredModal from "../Partials/uploadModal";
import { CSVLink } from "react-csv";
import ReactExport from "react-data-export";
import SortComp from "../Partials/SortComp";

const Courses = () => {
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
    console.log(coursesort);
  };

  useEffect(() => {
    if (!courses.length > 0) FetchData();
  }, [courses]);
  // const token = localStorage.getItem("Token");

  const FetchData = async () => {
    try {
      const response = await fetch(url + "/view-all-courses");
      const data = await response.json();
      console.log(data.data);
      setCourses(data.data);
    } catch (error) {}
  };

  const archiveCourse = async (event, id) => {
    event.preventDefault();

    const willArchive = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to archive this course?",
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
      .delete(`${url}/delete-course/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Course Archived!", "success");
        FetchData();
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "Course Archive Failed", "error");
      });
  };

  const [modalShow, setModalShow] = useState(false);

  const headers = [
    { label: "ID", key: "course_id" },
    { label: "Name", key: "course_title" },
    { label: "Category", key: "category" },
    { label: "Subscriptions", key: "people_count" },
    { label: "Created Date", key: "created_at" },
  ];

  const dataSet1 = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true,
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false,
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false,
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true,
    },
  ];

  var dataSet2 = [
    {
      name: "Johnson",
      total: 25,
      remainig: 16,
    },
    {
      name: "Josef",
      total: 25,
      remainig: 7,
    },
  ];

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <React.Fragment>
      <ExcelFile element={<button>Download Data</button>}>
        <ExcelSheet data={dataSet1} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={(col) => (col.is_married ? "Married" : "Single")}
          />
        </ExcelSheet>
        <ExcelSheet data={dataSet2} name="Leaves">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Total Leaves" value="total" />
          <ExcelColumn label="Remaining Leaves" value="remaining" />
        </ExcelSheet>
      </ExcelFile>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="d-flex justify-content-between">
                <h3>Courses</h3>
                <div className="d-flex align-items-center">
                  <Link to="/add-course">
                    <button
                      type="button"
                      className="btn btn-purple btn-rounded w-md waves-effect waves-light mr-2"
                    >
                      <i className="mdi mdi-plus"></i> Create course
                    </button>
                  </Link>

                  {courses !== [] && (
                    <CSVLink
                      data={courses}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                      filename={"courses.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>
                        Name
                        <SortComp field="title" sort={sort} />
                      </th>
                      <th>
                        Created On
                        <SortComp field="created" sort={sort} />
                      </th>
                      <th>
                        Category
                        <SortComp field="category" sort={sort} />
                      </th>
                      <th>
                        Subscriptions
                        <SortComp field="subscription" sort={sort} />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.course_title}</td>
                        <td>{item.created_at}</td>
                        <td>{item.category}</td>
                        {/* <td>No (hard quoted)</td> */}
                        <td>{item.people_count ? item.people_count : 0}</td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/view-course?id=${item.course_id}`}>
                              {" "}
                              <button className="btn btn-primary mr-3">
                                View
                              </button>
                            </Link>

                            <Link to={`/edit-course?id=${item.course_id}`}>
                              <button className="btn btn-secondary mr-3">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger mr-3"
                              id={item.course_id}
                              onClick={(e) => archiveCourse(e, item.course_id)}
                            >
                              Archive
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

export default Courses;
