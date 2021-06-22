import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { url } from "../api";
import { CSVLink } from "react-csv";
import SortComp from "../Partials/SortComp";

function GiveAndTake({ setFeedLength }) {
  const [giveCourse, setCourse] = useState([]);

  const sort = (column, sorttype) => {
    var givesort = giveCourse;

    if (column === "name") {
      givesort = [...giveCourse].sort((a, b) => {
        return (a.user.name > b.user.name ? 1 : -1) * sorttype;
      });
      setCourse(givesort);
    } else if (column === "course") {
      givesort = [...giveCourse].sort((a, b) => {
        var check = a.title > b.title ? 1 : -1;
        return check * sorttype;
      });
      setCourse(givesort);
    } else if (column === "points") {
      givesort = [...giveCourse].sort((a, b) => {
        var check = a.points > b.points ? 1 : -1;
        return check * sorttype;
      });
      setCourse(givesort);
    } else if (column === "type") {
      givesort = [...giveCourse].sort((a, b) => {
        var check = a.type > b.type ? 1 : -1;
        return check * sorttype;
      });
      setCourse(givesort);
    } else if (column === "date") {
      givesort = [...giveCourse].sort((a, b) => {
        var check = a.created_at > b.created_at ? 1 : -1;
        return check * sorttype;
      });
      setCourse(givesort);
    }
  };
  useEffect(() => {
    const FetchData = async () => {
      const token = localStorage.getItem("Token");
      const response = await fetch(url + "/view-all-given-courses", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      console.log(data.data.length);
      setCourse(data.data);
      setFeedLength(data.data.length);
    };
    FetchData();
  }, [setFeedLength]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Customer Name", key: "user.name" },
    { label: "Given Course", key: "title" },
    { label: "Given Points", key: "points" },
    { label: "Date", key: "created_at" },
  ];

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="d-flex justify-content-between">
                <h3 className="m-3">View Given Courses</h3>
                <div className="d-flex align-items-center">
                  {giveCourse !== [] && (
                    <CSVLink
                      data={giveCourse}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mb-2 ml-3"
                      filename={"Give And Take.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>
                        Customer Name
                        <SortComp field="name" sort={sort} />
                      </th>
                      <th>
                        Given Course
                        <SortComp field="course" sort={sort} />
                      </th>
                      <th>
                        Given Points
                        <SortComp field="points" sort={sort} />
                      </th>
                      <th>
                        Date
                        <SortComp field="date" sort={sort} />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {giveCourse.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.user ? item.user.name : " "}</td>
                        <td>{item.title}</td>
                        <td>{item.points}</td>
                        <td>{item.created_at}</td>
                        <td>
                          {" "}
                          <Link to={`/view-give?id=${item.id}`}>
                            <button className="btn btn-primary">View</button>
                          </Link>
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
}

export default GiveAndTake;
