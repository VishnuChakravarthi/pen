import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { url } from "../api";
import { Link } from "react-router-dom";
import { Accordion, Button, Card, Badge } from "react-bootstrap";

const ViewCourse = ({ location }) => {
  //data from api
  const [courseDetail, setCourseDetail] = useState({ syllabus: [] });
  const [users, setUsers] = useState([]);

  const { id } = queryString.parse(location.search);

  useEffect(() => {
    const getSubscribedUser = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await fetch(url + `/purchases/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        const data = await response.json();
        console.log("subscribed-users", data.data);
        if (data.data) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSubscribedUser();
  }, [id]);

  useEffect(() => {
    const getCourseDetail = async () => {
      const token = localStorage.getItem("Token");
      console.log(url + `/view-course-detail/${id}`);
      try {
        const response = await fetch(url + `/view-course-detail/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        const data = await response.json();
        console.log("course details", data.data);
        setCourseDetail(data.data);
      } catch (error) {}
    };
    getCourseDetail();
  }, [id]);

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10 m-auto">
                <div className="card-box task-detail">
                  <div className="d-flex justify-content-between">
                    <h1 className="">
                      {courseDetail.course_title
                        ? courseDetail.course_title.toUpperCase()
                        : ""}
                    </h1>
                    <span className="d-flex justify-content-center align-items-center">
                      <Link to={`/edit-course?id=${id}`}>
                        <button className="btn btn-warning">Edit</button>
                      </Link>
                    </span>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      {courseDetail.feature_image && (
                        <div className="">
                          <img
                            src={courseDetail.feature_image}
                            alt=""
                            className="img-fluid"
                          />
                          <figcaption>Feature Image.</figcaption>
                        </div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      {courseDetail.intro_file_type === "youtube" && (
                        <div className="h-100">
                          <iframe
                            title="Introduction File"
                            src={courseDetail.intro_file}
                            style={{ height: "92%" }}
                          />
                          <figcaption>Introduction File.</figcaption>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="wrapper-course p-3">
                    <div className="">
                      <h3>Short Description</h3>
                      <p className="text-muted">
                        {courseDetail.short_description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3>Description</h3>
                      <p className="text-muted">
                        {courseDetail.course_description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3>What you will Learn</h3>
                      <div className="text-muted">
                        <ul style={{ listStyleType: "disc" }} className="ml-4">
                          {courseDetail.what_learns
                            ? courseDetail.what_learns.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))
                            : ""}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3>Requirements</h3>
                      <div className="text-muted">
                        <ul style={{ listStyleType: "disc" }} className="ml-4">
                          {courseDetail.requirements
                            ? courseDetail.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))
                            : ""}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3>Skills Developed</h3>
                      <div className="text-muted">
                        <ul style={{ listStyleType: "disc" }} className="ml-4">
                          {courseDetail.skills_developed
                            ? courseDetail.skills_developed
                                .split(",")
                                .map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))
                            : ""}
                        </ul>
                      </div>
                    </div>

                    <div className="row task-dates mb-0 mt-4">
                      <div className="col-lg-6">
                        <h5 className="font-600 m-b-5">Start Date</h5>
                        <p>
                          <small className="text-muted">
                            {courseDetail.created_at}
                          </small>
                        </p>
                      </div>

                      <div className="col-lg-6">
                        <h5 className="font-600 m-b-5">Last Updated date</h5>
                        <p>
                          <small className="text-muted">
                            {courseDetail.updated_at} by{" "}
                            {courseDetail.updated_by &&
                              courseDetail.updated_by.name}
                          </small>
                        </p>
                      </div>
                    </div>

                    <div className="row mb-0 mt-1">
                      <div className="col-lg-6">
                        <h5>Course Type</h5>
                        <p>{courseDetail.course_type}</p>
                      </div>
                      <div className="col-lg-6">
                        <h5>Category</h5>
                        <p>{courseDetail.category}</p>
                      </div>
                    </div>

                    <div className="row mb-0 mt-1">
                      <div className="col-lg-6">
                        <h5>Price Type</h5>
                        <p>{courseDetail.price_type}</p>
                      </div>
                      <div className="col-lg-6">
                        <h5>No of Modules</h5>
                        <p>{courseDetail.total_syllabus}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h2 className="mb-3">Syllabus</h2>
                      <Accordion>
                        {courseDetail.syllabus.map((module, index) => (
                          <Card key={index}>
                            <Card.Header>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey={index}
                              >
                                {module.title}
                                <Badge variant="warning" className="ml-2">
                                  {module.total_lessons}
                                </Badge>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                              <Card.Body>
                                <div className="row mb-0 mt-1">
                                  <div className="col-lg-12">
                                    <h5>Description</h5>
                                    {module.description}
                                  </div>
                                </div>
                                <div className="row mb-0 mt-1">
                                  <div className="col-lg-6">
                                    <h5>Duration</h5>
                                    <p>{module.duration}</p>
                                  </div>
                                  <div className="col-lg-6">
                                    <h5>No of Modules & Project</h5>
                                    <p>
                                      {module.modules ? module.modules : "0"} &{" "}
                                      {module.project ? module.project : "0"}
                                    </p>
                                  </div>
                                </div>
                                <div className="table-responsive mt-3">
                                  <table className="table-bordered table hover">
                                    <thead>
                                      <tr>
                                        <th>L.ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Course File</th>
                                        <th>Sharpscript</th>
                                        <th>Type</th>
                                        <th>Updated At</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {module.lessons.map((lesson, index) => (
                                        <tr key={index}>
                                          <td>{lesson.id}</td>
                                          <td>
                                            {lesson.title}
                                            {lesson.status ? (
                                              <Badge variant="success">
                                                Active
                                              </Badge>
                                            ) : (
                                              <Badge variant="danger">
                                                Inactive
                                              </Badge>
                                            )}
                                          </td>
                                          <td>{lesson.description}</td>
                                          <td
                                            style={{ wordBreak: "break-word" }}
                                          >
                                            <a
                                              href={lesson.course_file}
                                              className="text-primary"
                                            >
                                              <u>{lesson.course_file}</u>
                                            </a>
                                            <p>
                                              <b>Size:</b>
                                              {"      "}
                                              {lesson.file_size}
                                            </p>
                                          </td>
                                          <td
                                            style={{ wordBreak: "break-word" }}
                                          >
                                            <a
                                              href={lesson.sharp_script}
                                              className="text-primary"
                                            >
                                              <u>{lesson.sharp_script}</u>
                                            </a>
                                          </td>
                                          <td>{lesson.file_type}</td>
                                          <td>{lesson.updated_at}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ))}
                      </Accordion>
                    </div>

                    {users.length && (
                      <div className="mt-4">
                        <h3 className="mb-3">
                          Subscribed users{" "}
                          <Badge variant="warning">{users.length}</Badge>
                        </h3>
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Joined Date</th>
                                {/* <th>Last Visited Date</th> */}
                                <th>Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user, index) => (
                                <tr key={index}>
                                  <td>{user.user.id}</td>
                                  <td>{user.user.name}</td>
                                  <td>{user.created_at.split(" ")[0]}</td>
                                  <td>{user.user.points}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewCourse;
