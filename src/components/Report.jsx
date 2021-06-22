import React from "react";
import { CSVLink } from "react-csv";

const Report = () => {
  const report = [
    {
      name: "Adam Jansen",
      time: "about 2 minutes ago",
      img: "assets/images/users/user-1.jpg",
      comment: "The next button doesnt navigate properly",
    },
    {
      name: "John Smith",
      time: "about 2 hour ago",
      img: "assets/images/users/user-3.jpg",
      comment: "Bug is noted sorting out!",
    },
    {
      name: "Matt Cheuvront",
      time: "about 2 minutes ago",
      img: "assets/images/users/user-4.jpg",
      comment: "Bug is fixed",
    },
    {
      name: "Stephanie Walter",
      time: "about 3 hour ago",
      img: "assets/images/users/user-5.jpg",
      comment: "Tested works fine please test",
    },
  ];
  const headers = [
    { label: "Name", key: "name" },
    { label: "Time", key: "time" },
    { label: "Image", key: "img" },
    { label: "Comment", key: "comment" },
  ];

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="d-flex justify-content-between">
                <h3>Report History</h3>

                <div className="d-flex align-items-center">
                  {report !== [] && (
                    <CSVLink
                      data={report}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                      filename={"report.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>

              {report.map((rep) => (
                <div className="media mb-2 mt-3">
                  <img
                    src={rep.img}
                    alt=""
                    className="comment-avatar avatar-sm rounded mr-2"
                  />
                  <div className="media-body">
                    <h5 className="mt-0">
                      <a href="#!" className="text-dark">
                        {rep.name}
                      </a>
                      <small className="ml-1 text-muted">{rep.time}</small>
                    </h5>
                    <p>{rep.comment}</p>
                  </div>
                </div>
              ))}

              {/* <div className="media mb-2 mt-3">
                    <img
                      src="assets/images/users/user-1.jpg"
                      alt=""
                      className="comment-avatar avatar-sm rounded mr-2"
                    />
                    <div className="media-body">
                      <h5 className="mt-0">
                        <a href="#!" className="text-dark">
                          Adam Jansen
                        </a>
                        <small className="ml-1 text-muted">
                          about 2 minuts ago
                        </small>
                      </h5>
                      <p>The next button doesnt navigate properly</p>

                      <div className="media mb-2">
                        <img
                          src="assets/images/users/user-3.jpg"
                          alt=""
                          className="comment-avatar avatar-sm rounded mr-2"
                        />
                        <div className="media-body">
                          <h5 className="mt-0">
                            <a href="#!" className="text-dark">
                              John Smith
                            </a>
                            <small className="ml-1 text-muted">senior tech</small>
                          </h5>
                          <p>Bug is noted sorting out!</p>
                        </div>
                      </div>
                      <div className="media">
                        <img
                          src="assets/images/users/user-4.jpg"
                          alt=""
                          className="comment-avatar avatar-sm rounded mr-2"
                        />
                        <div className="media-body">
                          <h5 className="mt-0">
                            <a href="#!" className="text-dark">
                              Matt Cheuvront
                            </a>
                            <small className="ml-1 text-muted">
                              about 2 hour ago
                            </small>
                          </h5>
                          <p>Bug is fixed</p>

                          <div className="media mb-2">
                            <img
                              src="assets/images/users/user-5.jpg"
                              alt=""
                              className="comment-avatar avatar-sm rounded mr-2"
                            />
                            <div className="media-body">
                              <h5 className="mt-0">
                                <a href="#!" className="text-dark">
                                  Stephanie Walter
                                </a>
                                <small className="ml-1 text-muted">
                                  about 3 hour ago
                                </small>
                              </h5>
                              <p>Tested works fine please test</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Report;
