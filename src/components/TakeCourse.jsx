import React from "react";

import { Link } from "react-router-dom";
import swal from "sweetalert";
import Layout from "./Partials/Layout";

const TakeCourse = () => {
  async function deletefn(e) {
    const divs = e.target.parentElement;
    const tds = divs.parentElement;
    const trs = tds.parentElement;

    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to archive this user?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      trs.remove();
      swal("Deleted!", "Your course has been deleted!", "success");
    }

    console.log(trs);
  }
  return (
    <Layout>
      <div className="card-box">
        <h3>Take Courses</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created On</th>
                <th>Category</th>
                <th>Subscriptions</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>HTML and CSS full course</td>
                <td>20/05/2020</td>
                <td>Web Devlopment</td>
                <td>4</td>

                <td>
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>SASS Full course</td>
                <td>20/05/2020</td>
                <td>Web Devlopment</td>
                <td>3</td>

                <td>
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Adobe XD & Photoshop</td>
                <td>24/05/2020</td>
                <td>Web Design</td>
                <td>7</td>

                <td>
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Python Full Course</td>
                <td>20/05/2020</td>
                <td>Software </td>
                <td>14</td>

                <td>
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Numpy, TensorFlow</td>
                <td>30/05/2020</td>
                <td>Data science </td>
                <td>1</td>

                <td>
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Introduction To Pentesting Kali linux</td>
                <td>31/05/2020</td>
                <td>Ethical Hacking</td>
                <td>5</td>
                <td>
                  {" "}
                  <div className="d-flex">
                    <Link to="view-course">
                      {" "}
                      <button className="btn btn-primary mr-3">View</button>
                    </Link>
                    <Link to="edit-course">
                      <button className="btn btn-secondary mr-3">Edit</button>
                    </Link>

                    <button className="btn btn-danger mr-3" onClick={deletefn}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>{" "}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TakeCourse;
