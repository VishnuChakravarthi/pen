import React, { useState, useEffect } from "react";
import { PDFReader } from "reactjs-pdf-reader";
import swal from "sweetalert";
import queryString from "query-string";
import { url } from "../api";
import axios from "axios";

const ViewGive = ({ location }) => {
  const [points, setPoints] = useState();
  const token = localStorage.getItem("Token");
  const { id } = queryString.parse(location.search);
  const [info, setInfo] = useState({
    file: "",
    points: "",
    status: "",
    title: "",
    description: "",
    user: {
      name: "",
      points: "",
    },
  });

  useEffect(() => {
    const FetchData = async () => {
      try {
        await axios({
          method: "GET",
          url: `/view-given-course/${id}`,
          baseURL: `${url}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          console.log(res.data.data);
          setInfo(res.data.data);
          if (res.data.data.user.points) {
            setPoints(res.data.data.user.points);
          } else {
            setPoints(0);
          }

          // setUsers((res.data.data ? res.data.data : []));
        });
      } catch (error) {
        swal({
          text: "Cannot connect to server",
          icon: "error",
        });
      }
    };
    FetchData();
  }, [id, location.search, token]);

  function Approvalfn(e) {
    e.preventDefault();
    const body = {
      id: id,
      points: points,
      status: "approved",
    };
    axios
      .post(`${url}/give-take-status-update`, body, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        console.log(res);
        swal({
          text: "Points Allocated",
          icon: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        swal({
          text: "Failed",
          icon: "error",
        });
      });
  }

  async function declinefn(e) {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this content?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      swal("Deleted!", "Your content has been deleted!", "success").then(() => {
        window.location.href = "/give-and-take";
      });
    }
  }
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              <h3 className="my-3">Title</h3>
              <div className="row pl-3 pr-3">{info.title}</div>
            </div>
            <div className="card-box m-3">
              <h3 className="mb-3 mt-3">Files</h3>
              <PDFReader
                url={info.file !== "" ? info.file : `./assets/1.pdf`}
              />
            </div>
            <div className="card-box m-3">
              <h3 className="mb-3 mt-3">Status</h3>
              <div className="row pl-3 pr-3">{info.status}</div>
            </div>
            <div className="card-box m-3">
              <h3 className="mb-3 mt-3">User Details</h3>
              <div className="row pl-3 pr-3 flex-column">
                <p className="d-block"> Name: {info.user.name}</p>
                <p className="d-block">Points: {info.user.points}</p>
              </div>
            </div>
            <div className="card-box m-3">
              <h3 className="mb-3 mt-3">Description</h3>
              <div className="row pl-3 pr-3">{info.description}</div>
            </div>
            {/* <div className="card-box m-3 text-center">
              <h3 className="mb-3 mt-3 text-left">Video</h3>
              <iframe
                className="iframe_video custom-iframe-width m-auto border border-0 shadow-lg rounded-lg w-100"
                src="//www.youtube.com/embed/57LQI8DKwec"
                frameborder="0"
                allowfullscreen
                title="course video"
                style={{
                  minHeight: "540px",
                  maxWidth: "960px",
                }}
              ></iframe>
            </div> */}
            <div className="card-box m-3">
              <h3 className="mb-3 mt-3">Approval</h3>
              <div className="row pl-3 pr-3 pt-3">
                <div className="form-group col-sm-5">
                  <label for="exampleInputEmail1">Points alloted</label>
                  <div className="d-flex align-items-end pb-2">
                    <input
                      type="number"
                      className="form-control mr-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={points ? points : 0}
                      onChange={(e) => setPoints(e.target.value)}
                    />

                    <button
                      className="btn btn-primary mr-3"
                      onClick={Approvalfn}
                    >
                      Approval
                    </button>
                    <button className="btn btn-danger mr-3" onClick={declinefn}>
                      Decline
                    </button>
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

export default ViewGive;
