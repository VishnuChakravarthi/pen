// import React, { useEffect, useState } from "react";
import React from "react";
// import axios from 'axios';
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

const ViewQuiz = (props) => {
  // const [syllabusId, setSyllabusId] = useState();

  // useEffect(() => {
  //   setSyllabusId(props.location.state.item.syllabus_id);
  //   // Fetch Quiz
  // }, [props.location.state.item.syllabus_id]);

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              <h3 className="header-title">View Quiz</h3>

              <div className="row pl-3 pr-3 pt-3">
                <div className="form-group col-sm-5">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value="Asssestment-1"
                    disabled
                  />
                </div>
                <div className="form-group col-sm-5">
                  <label for="exampleInputPassword1">Related Course</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value="Html and css full course"
                    disabled
                  />
                </div>
                <div className="form-group col-sm-5">
                  <label for="exampleInputPassword1">Points </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="200"
                  />
                </div>
                <div className="form-group col-sm-5">
                  <label for="exampleInputPassword1">Difficulty level</label>
                  <select className="form-control" disabled value="medium">
                    <option value="mcq">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="image">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-box m-3">
              <div className="table-responsive">
                <div className="d-flex justify-content-end">
                  <h5>
                    Total Que : <span>4</span>
                  </h5>
                </div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <th>NO</th>
                    <th>Question</th>
                    <th>Options</th>
                    <th>Answer</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Is button block element or inline element?</td>
                      <td>
                        <ul>
                          <li>Block element</li>
                          <li>Inline element</li>
                        </ul>
                      </td>
                      <td>Inline element</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Which of the following is inline element ?</td>
                      <td>
                        <ul>
                          <li>div</li>
                          <li>p</li>
                          <li>input</li>
                          <li>span</li>
                        </ul>
                      </td>
                      <td>span</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Which bootstrap class centers text?</td>
                      <td>
                        <ul>
                          <li>align-items-center</li>
                          <li>justify-content-center</li>
                          <li>text-center</li>
                        </ul>
                      </td>
                      <td>text-center</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Is button block element or inline element?</td>
                      <td>
                        <ul>
                          <li>Block element</li>
                          <li>Inline element</li>
                        </ul>
                      </td>
                      <td>Inline element</td>
                    </tr>
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

export default ViewQuiz;
