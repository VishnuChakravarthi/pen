import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "../Partials/uploadModal";
import { url } from "../api";
import axios from "axios";
import { CSVLink } from "react-csv";

function Quiz() {
  async function deletefn(e) {
    const divs = e.target.parentElement;
    const tds = divs.parentElement;
    const trs = tds.parentElement;

    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this quiz?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      trs.remove();
      swal("Deleted!", "Your  file has been deleted!", "success");
    }

    console.log(trs);
  }
  const [modalShow, setModalShow] = useState(false);
  const [assessment, setAssessment] = useState([]);

  useEffect(() => {
    // const fetchAssessment = async () => {
    //   const token = localStorage.getItem("Token");
    //   await axios(`${url}/view-all-courses`, {
    //     method: "get",
    //     headers: {
    //       Authorization: `Basic ${token}`,
    //     },
    //   }).then(async (res) => {
    //     var arr = res.data.data.map((item) => item.course_id);
    //     arr.forEach(async (_item) => {
    //       await axios(`${url}/syllabus/${_item}`, {
    //         method: "get",
    //         headers: {
    //           Authorization: `Basic ${token}`,
    //         },
    //       }).then((_res) => {
    //         var _add = _res.data.data
    //           ? _res.data.data.map((ele) => ele.id)
    //           : [];
    //         _add.forEach(async (__item) => {
    //           await axios(`${url}/view-assessment/${__item}`, {
    //             method: "get",
    //             headers: {
    //               Authorization: `Basic ${token}`,
    //             },
    //           }).then((__res) => {
    //             if (__res.data.data) {
    //               var fin = __res.data.data.map((__item, i) => {
    //                 return {
    //                   ...__item,
    //                   course_title: res.data.data[i].course_title,
    //                 };
    //               });
    //               setAssessment([...assessment, ...fin]);
    //             }
    //           });
    //         });
    //       });
    //     });
    //   });
    // };

    const fetchAssessment = async () => {
      const token = localStorage.getItem("Token");
      await axios(`${url}/view-assessments`, {
        method: "get",
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then(async (res) => {
        console.log(res.data);
        if (Object.keys(res.data).includes("error")) {
          return setAssessment([]);
        }
        setAssessment(res.data.data);
      });
    };

    fetchAssessment();
  }, []);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "title" },
    { label: "Course", key: "course.course_title" },
    { label: "Created Date", key: "created_at" },
    { label: "Modified Date", key: "updated_at" },
  ];

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="table-responsive">
                <div className="d-flex justify-content-between">
                  <h3>Quizes</h3>
                  <div className="d-flex align-items-center">
                    <Link to="/add-quiz">
                      <button
                        type="button"
                        className="btn btn-purple btn-rounded w-md waves-effect waves-light mr-2"
                      >
                        <i className="mdi mdi-plus"></i> Create Quiz
                      </button>
                    </Link>
                    {assessment !== [] && (
                      <CSVLink
                        data={assessment}
                        headers={headers}
                        className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                        filename={"assesments.csv"}
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
                <table className="table-bordered table table-hover">
                  <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Created on</th>
                    <th>Modified on</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {assessment.length
                      ? assessment?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.title}</td>
                              <td>{item.course.course_title}</td>
                              <td>{item.created_at}</td>
                              <td>
                                {item.updated_at +
                                  " By " +
                                  item.updated_by.name}
                              </td>
                              <td>
                                <div className="d-flex">
                                  {/* <Link
                                    to={{
                                      pathname: "view-quiz",
                                      state: { item },
                                    }}
                                  >
                                    <button className="btn btn-primary mr-3">
                                      View
                                    </button>
                                  </Link> */}
                                  <Link to="/add-quiz">
                                    {" "}
                                    <button className="btn btn-secondary mr-3">
                                      Edit
                                    </button>
                                  </Link>
                                  <button
                                    className="btn btn-danger"
                                    onClick={deletefn}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Quiz;
