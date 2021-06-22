import React, { useEffect, useRef, useState } from "react";
import { url } from "../api";
import axios from "axios";
import swal from "sweetalert";

const AddUser = () => {
  const name = useRef("");
  const email = useRef("");
  const phone = useRef("");
  const [pwd, setPwd] = useState("");
  const [rpwd, setRPwd] = useState("");

  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    if (pwd !== "" && rpwd !== "") {
      if (pwd === rpwd) {
        setErrMsg(false);
      } else {
        setErrMsg(true);
      }
    } else {
      setErrMsg(false);
    }
  }, [pwd, rpwd]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (pwd !== rpwd) {
      swal("OOPS!", "Password do not match", "error");
      return;
    }

    if (pwd.length < 8) {
      swal("OOPS!", "The password must be at least 8 characters", "error");
      return;
    }

    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const body = {
      name: name.current.value,
      email: email.current.value,
      phoneno: phone.current.value,
      password: pwd,
    };

    console.log(body);

    axios
      .post(`${url}/register-user`, body, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!", "User Added!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "Adding User Failed", "error");
      });
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              <h3 className="header-title">Add User</h3>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-group col-sm-12">
                  <label for="email">Enter name</label>
                  <input
                    type="text"
                    ref={name}
                    className="form-control"
                    required
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group col-sm-12">
                  <label for="email">Enter email</label>
                  <input
                    type="email"
                    ref={email}
                    className="form-control"
                    required
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group col-sm-12">
                  <label for="email">Enter Ph. Number</label>
                  <input
                    type="number"
                    ref={phone}
                    className="form-control"
                    required
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group col-sm-12">
                  <label for="email">Enter password</label>
                  <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="form-control"
                    required
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group col-sm-12">
                  <label for="email">Repeat password</label>
                  <input
                    type="password"
                    value={rpwd}
                    onChange={(e) => setRPwd(e.target.value)}
                    className="form-control"
                    required
                    placeholder="Enter password"
                  />
                </div>
                {errMsg && (
                  <p className="text-warning">Passwords do not match</p>
                )}
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddUser;
