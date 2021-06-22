import React, { useState, useEffect } from "react";
import Sidebar from "../Partials/Sidebar";
import Navbar from "../Partials/Navbar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { url } from "../api";
import { CSVLink } from "react-csv";

function Categories() {
  //hook forms code
  // const { register, handleSubmit, watch, errors, reset } = useForm();
  const { register, handleSubmit, reset } = useForm();

  //category populating from api
  const [category, setCategory] = useState([]);
  const [courseCat, setCourseCat] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch(url + "/view-categories");
        const data = await response.json();
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);

  const token = localStorage.getItem("Token");
  //on submit function (posting to api)
  const onSubmit = async (values) => {
    try {
      const FetchOptions = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(url + "/add-categories", FetchOptions);
      const data = await response.json();
      console.log(values);
      if (!data.error) {
        reset();
        swal({
          text: "Category successfully added",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      swal({
        text: "Error connecting to server",
        icon: "error",
      });
    }
  };

  const viewCatCourse = async (id) => {
    try {
      const response = await fetch(
        url +
          `/view-all-courses/category/${id}
`
      );

      const data = await response.json();
      console.log(data.data);
      setCourseCat(data.data);
      toggle();
    } catch (error) {}
  };

  async function deletefn(e) {
    const divs = e.target.parentElement;
    const tds = divs.parentElement;
    const trs = tds.parentElement;

    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this category?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      trs.remove();
      swal("Deleted!", "Your imaginary file has been deleted!", "success");
    }

    console.log(trs);
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const headers = [
    { label: "ID", key: "category_id" },
    { label: "No of Courses", key: "courses_count" },
    { label: "Name", key: "category" },
    { label: "Created Date", key: "created_at" },
  ];

  return (
    <div id="wrapper">
      <React.Fragment>
        <Navbar />
        <Sidebar />
        <React.Fragment>
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">
                <div className="card-box">
                  <h3>Add categories</h3>
                  <form
                    className="form-horizontal p-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group row">
                      <label
                        className="col-sm-2  col-form-label"
                        htmlFor="simpleinput"
                      >
                        Category Name
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter category"
                          name="category"
                          ref={register}
                        />
                      </div>
                      <div className="col-sm-4">
                        <button className="btn btn-primary" type="submit">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="card-box">
                  <div className="d-flex justify-content-between">
                    <h3>Categories List</h3>
                    <div className="d-flex align-items-center">
                      {category !== [] && (
                        <CSVLink
                          data={category}
                          headers={headers}
                          className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                          filename={"categories.csv"}
                        >
                          Export CSV
                        </CSVLink>
                      )}
                    </div>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>No.of courses</th>
                          <th>Created On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.category}</td>
                            <td>{item.courses_count}</td>
                            <td>{item.created_at}</td>
                            <td>
                              <div className="d-flex">
                                {" "}
                                <button
                                  className="btn btn-primary mr-3"
                                  onClick={() =>
                                    viewCatCourse(item.category_id)
                                  }
                                >
                                  View Courses
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={deletefn}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Courses</ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <th>ID</th>
                <th>Course Name</th>
                <th>Subscribers</th>
                <th>Action</th>
              </thead>
              <tbody>
                {courseCat.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.course_title}</td>
                    <td>{item.people_count}</td>
                    <td className="text-center">
                      <Link to={`/view-course?id=${item.course_id}`}>
                        {" "}
                        <button className="btn btn-primary">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td>1</td>
                  <td>HTML and CSS full course</td>
                  <td>7</td>
                  <td className="text-center">
                    <Link to="/view-course">
                      {" "}
                      <button className="btn btn-primary">View</button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>React.js Full course</td>
                  <td>10</td>
                  <td className="text-center">
                    <Link to="/view-course">
                      {" "}
                      <button className="btn btn-primary">View </button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>M.E.R.N Full course</td>
                  <td>4</td>
                  <td className="text-center">
                    <Link to="/view-course">
                      {" "}
                      <button className="btn btn-primary">View </button>
                    </Link>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Categories;
