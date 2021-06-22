import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { url } from "../api";
import queryString from "query-string";

const ViewUser = ({ location }) => {
  //users data from api based on url id
  const [user, setUser] = useState({
    courses: [],
  });
  useEffect(() => {
    const { id } = queryString.parse(location.search);
    const token = localStorage.getItem("Token");
    const FetchData = async () => {
      try {
        const response = await fetch(url + `/view-user/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        const data = await response.json();
        console.log(data.data);
        setUser(data.data);
      } catch (error) {
        swal({
          text: "Cannot connect to server",
          icon: "error",
        });
      }
    };

    FetchData();
  }, [location.search]);
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-sm-8 m-auto">
                <div className="bg-picture card-box">
                  <div className="profile-info-name">
                    {/* <img
                          src="https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
                          className="rounded-circle avatar-xl img-thumbnail float-left mr-3"
                          alt="profile"
                        /> */}

                    <div className="profile-info-detail overflow-hidden">
                      <h4 className="m-0">{user.name}</h4>
                      <p className="text-muted">
                        <i></i>
                      </p>

                      <div className="table-responsive mt-4">
                        <table className="table table-borderless mb-0">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <td>{user.name}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Email</th>
                              <td>{user.email}</td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>{user.phoneno || "unavailable"}</td>
                            </tr>
                            <tr>
                              <th>Total Courses</th>
                              <td>{user.courses.length}</td>
                            </tr>
                            <tr>
                              <th>Joined Date</th>
                              <td>{user.created_at}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {user.courses.length !== 0 && (
                <div className="col-sm-12">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Course</th>
                            <th>Taken On</th>
                            <th>Completion Date</th>
                            <th>Completed</th>
                            <th>Total Points</th>
                            <th>Achieved Points</th>
                            <th>Total Assessments</th>
                            <th>Completed Assessments</th>
                            <th>Course Ranking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.courses
                            ? user.courses.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.course_title}</td>
                                  <td>{item.taken_on}</td>
                                  <td>{item.completion}</td>
                                  <td>{item.completed}</td>
                                  <td>{item.total_points}</td>
                                  <td>{item.achieved_points}</td>
                                  <td>{item.total_assessment}</td>
                                  <td>{item.completed_assessment}</td>
                                  <td>{item.course_ranking}</td>
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <button className="btn btn-success">
                                        View Course
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewUser;
