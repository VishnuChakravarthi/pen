import Axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { url } from "../api";
const token = localStorage.getItem("Token");

const Settings = () => {
  const [points, setPoints] = useState({});
  const [allPoints, setAllPoints] = useState([]);

  useEffect(() => {
    (async () =>
      await Axios.get(`${url}/attribs`, {
        headers: { Authorization: `Basic ${token}` },
      }).then((response) => {
        setAllPoints(response.data.data);
      }))();
  }, []);

  console.log(allPoints);

  const handleInput = (e) => {
    console.log(e.target.name);
    setAllPoints(
      allPoints.map((points) =>
        points.key === e.target.name
          ? { key: points.key, value: e.target.value }
          : points
      )
    );
    setPoints({ key: e.target.name, value: e.target.value });
  };

  const submitPoints = async () => {
    await Axios.post(`${url}/attribs`, points, {
      headers: { Authorization: `Basic ${token}` },
    }).then((response) => {
      setAllPoints(response.data.data);
      swal("Success", "Updated successfully", "success");
    });
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Points for Referral</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Points alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[0].value}
                          name={allPoints.length && allPoints[0].key}
                          onChange={(e) => handleInput(e, 0)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Points for Consistency</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Points alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[4].value}
                          name={allPoints.length && allPoints[4].key}
                          onChange={(e) => handleInput(e, 4)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Points for Give</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Points alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[3].value}
                          name={allPoints.length && allPoints[3].key}
                          onChange={(e) => handleInput(e, 3)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Assestment Pass percentage</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Percetange alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[5].value}
                          name={allPoints.length && allPoints[5].key}
                          onChange={(e) => handleInput(e, 5)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Points for New Registration</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Points alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[1].value}
                          name={allPoints.length && allPoints[1].key}
                          onChange={(e) => handleInput(e, 1)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-box m-3">
                  <h3>Set Points for Profile Completion</h3>
                  <div className="row pl-3 pr-3 pt-3">
                    <div className="form-group col-sm-5">
                      <label for="exampleInputEmail1">Points alloted</label>
                      <div className="d-flex align-items-end pb-2">
                        <input
                          type="text"
                          className="form-control mr-3"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          style={{ width: "100px" }}
                          value={allPoints.length && allPoints[2].value}
                          name={allPoints.length && allPoints[2].key}
                          onChange={(e) => handleInput(e, 2)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={() => submitPoints()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
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

export default Settings;
