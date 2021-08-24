import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { url } from "../api";
import MyVerticallyCenteredModal from "../Partials/uploadModal";
import { CSVLink } from "react-csv";
import { Suspense } from "react";

function Users() {
  //population users table with api data
  const [users, setUsers] = useState([]);

  const sort = (column, sorttype) => {
    var userssort = users;

    if (column === "username") {
      userssort = [...users].sort((a, b) => {
        return (a.name > b.name ? 1 : -1) * sorttype;
      });
      setUsers(userssort);
    } else if (column === "phone") {
      userssort = [...users].sort((a, b) => {
        var check = a.phoneno > b.phoneno ? 1 : -1;
        return check * sorttype;
      });
      setUsers(userssort);
    } else if (column === "email") {
      userssort = [...users].sort((a, b) => {
        var check = a.email > b.email ? 1 : -1;
        return check * sorttype;
      });
      setUsers(userssort);
    } else if (column === "date") {
      userssort = [...users].sort((a, b) => {
        var check = a.created_at > b.created_at ? 1 : -1;
        return check * sorttype;
      });
      setUsers(userssort);
    }
  };

  const token = localStorage.getItem("Token");
  useEffect(() => {
    const FetchData = async () => {
      try {
        await axios({
          method: "GET",
          url: `/view-users`,
          baseURL: `${url}`,
          headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
          setUsers(res.data.data ? res.data.data : []);
        });
      } catch (error) {
        swal({
          text: "Cannot connect to server",
          icon: "error",
        });
      }
    };

    FetchData();
  }, [token]);

  // const deletefn = async (e) => {
  //   e.preventDefault();

  //   const willDelete = await swal({
  //     title: "Are you sure?",
  //     text: "Are you sure that you want to delete this user?",
  //     icon: "warning",
  //     dangerMode: true,
  //   });

  //   if (!willDelete) {
  //     return;
  //   }

  //   axios.delete(url, {
  //     headers,
  //   });
  // };

  const [modalShow, setModalShow] = useState(false);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Username", key: "name" },
    { label: "Phone", key: "phoneno" },
    { label: "Email", key: "email" },
    { label: "Joined Date", key: "created_at" },
    { label: "Modified Date", key: "updated_at" },
  ];

  return (
    <React.Fragment>
      <Suspense fallback={<h2>Loading....</h2>}>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="card-box">
                <div className="d-flex justify-content-between">
                  <h3>Users</h3>
                  <div className="d-flex align-items-center">
                    <Link to="/add-user">
                      <button
                        type="button"
                        className="btn btn-purple btn-rounded w-md waves-effect waves-light mr-2"
                      >
                        <i className="mdi mdi-plus"></i> Add User
                      </button>
                    </Link>

                    {users !== [] && (
                      <CSVLink
                        data={users}
                        headers={headers}
                        className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                        filename={"users.csv"}
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
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>
                          Username
                          <span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("username", 1);
                              }}
                            >
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("username", -1);
                              }}
                            >
                              <i className="mdi mdi-arrow-down"></i>
                            </span>
                          </span>
                        </th>
                        <th>
                          Phone
                          <span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("phone", 1);
                              }}
                            >
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("phone", -1);
                              }}
                            >
                              <i className="mdi mdi-arrow-down"></i>
                            </span>
                          </span>
                        </th>
                        <th>
                          Email
                          <span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("email", 1);
                              }}
                            >
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("email", -1);
                              }}
                            >
                              <i className="mdi mdi-arrow-down"></i>
                            </span>
                          </span>
                        </th>
                        <th>
                          Joined Date
                          <span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("date", 1);
                              }}
                            >
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("date", -1);
                              }}
                            >
                              <i className="mdi mdi-arrow-down"></i>
                            </span>
                          </span>
                        </th>
                        <th>
                          Modified
                          <span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("date", 1);
                              }}
                            >
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                            <span
                              type="button"
                              onClick={() => {
                                sort("date", -1);
                              }}
                            >
                              <i className="mdi mdi-arrow-down"></i>
                            </span>
                          </span>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneno}</td>
                            <td>{item.email}</td>
                            <td>{item.created_at}</td>
                            <td>{item.updated_at}</td>
                            <td>
                              <div className="d-flex">
                                <Link to={`/view-user?id=${item.id}`}>
                                  <button className="btn btn-primary mr-3">
                                    View
                                  </button>
                                </Link>
                                <Link to={`edit-user/${item.id}`}>
                                  <button className="btn btn-secondary mr-3">
                                    Edit
                                  </button>
                                </Link>

                                {/* <button
                                className="btn btn-danger mr-3"
                                onClick={deletefn}
                              >
                                Delete
                              </button> */}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </React.Fragment>
  );
}

export default Users;
