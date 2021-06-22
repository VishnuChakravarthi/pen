import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { url } from "../api";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditUser = ({ match }) => {
  const [userDeets, setUserDeets] = useState({
    name: "",
    email: "",
    phoneno: "",
    dateofbirth: "",
    gender: "",
    state: "",
    city: "",
    country: "",
    street: "",
    pincode: "",
  });

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .get(`${url}/view-user/${match.params.id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.data);
        setUserDeets(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params.id]);

  const handleInputs = (event) => {
    setUserDeets({
      ...userDeets,
      [event.target.name]: event.target.value,
    });
  };

  const editUser = () => {
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    axios
      .post(`${url}/update-user/${match.params.id}`, userDeets, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal({
          text: "User details sucessfully changed",
          icon: "success",
        });
        history.push("/users");
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "User couldn't be edited!", "error");
      });
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid" style={{ overflowY: "scroll" }}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <div className="col-sm-8 m-auto">
                <div className="card-box">
                  <h4 className="header-title mt-0 mb-3 text-center">
                    Edit User
                  </h4>

                  <form data-parsley-validate noValidate>
                    <div className="form-group">
                      <label htmlFor="userName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={userDeets.name}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailAddress">Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={userDeets.email}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass1">Phone</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phoneno"
                        value={userDeets.phoneno}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter Ph. Number"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passWord2">D.O.B</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateofbirth"
                        value={userDeets.dateofbirth}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter date of birth"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass1">Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={userDeets.gender}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter gender"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passWord2">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={userDeets.street}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter street"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="passWord2">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={userDeets.city}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passWord2">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={userDeets.state}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter state"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passWord2">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={userDeets.country}
                        onChange={(e) => handleInputs(e)}
                        placeholder="Enter country"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passWord2">Pincode</label>
                      <input
                        type="number"
                        className="form-control"
                        name="pincode"
                        // onInput={() =>
                        //   (userDeets.pincode?.slice(0, 5))
                        // }
                        value={userDeets.pincode}
                        onChange={(e) =>
                          setUserDeets({
                            ...userDeets,
                            pincode: e.target.value.slice(0, 6),
                          })
                        }
                        placeholder="Enter pincode"
                        required
                      />
                    </div>
                    <div className="form-group text-center mb-0">
                      <button
                        className="btn btn-primary waves-effect waves-light mr-1"
                        type="button"
                        onClick={editUser}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditUser;
