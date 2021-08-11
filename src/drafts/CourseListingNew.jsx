import React, { useState, useEffect } from "react";
import NavMain from "./Nav";
import MyVerticallyCenteredModal from "./shareModal";
import queryString from "query-string";
import Footer from "../components/Footer";
import { url } from "../components/api";
import axios from "axios";

function FreeCourseListing() {
    // const { search } = queryString.parse(location.search);
    const [modalShow, setModalShow] = useState(false);
    const [courses, setCourses] = useState([]);
    const [cat, setCat] = useState([]);
    const [skill, setSkill] = useState([]);
    const [key, SetKey] = useState(search ? search : "");

    function coursefn(e) {
        // window.location.href = `/course-info?id=${e}`;
    }

    async function pricefn(e) {
        console.log(e.target.checked, "checked");
        console.log(e.target.name, "name");
        const free = document.querySelector("#customSwitch2").checked;
        const paid = document.querySelector("#customSwitch1").checked;
        console.log(paid, free, "options");

        if (e.target.checked && e.target.name === "free" && !paid) {
            try {
                const response = await fetch(
                    url + `/view-all-courses/price/FREE`
                );
                const data = await response.json();
                console.log(data.data);
                setCourses(data.data);
            } catch (error) {
                console.log(error);
            }
        } else if (e.target.checked && e.target.name === "paid") {
            if (!free) {
                try {
                    const response = await fetch(
                        url + `/view-all-courses/price/PAID`
                    );
                    const data = await response.json();
                    console.log(data.data);
                    setCourses(data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            try {
                const response = await fetch(url + "/view-all-courses");
                const data = await response.json();
                console.log(data, "datas");
                setCourses(data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function skillCheckFn(e) {
        if (e.target.checked === true) {
            const skill = e.target.id;

            try {
                const response = await fetch(
                    url + `/view-all-courses/skill/${skill}`
                );
                const data = await response.json();
                console.log(data, "datas");
                setCourses(data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function fetchCatfn(e) {
        if (e.target.checked === true) {
            const cat = e.target.id;
            try {
                const response = await fetch(
                    url + `/view-all-courses/category/${cat}`
                );
                const data = await response.json();
                console.log(data, "datas");
                if (data.data) {
                    setCourses(data.data);
                } else {
                    setCourses([]);
                }
            } catch (error) {}
        }
    }

    async function searchFilterfn(e) {
        const key1 = e;
        if (key1) {
            try {
                const response = await fetch(
                    url + `/view-all-courses/search/${key1}`
                );
                const data = await response.json();
                console.log(data, "datas");
                if (data.data) {
                    setCourses(data.data);
                } else {
                    setCourses([]);
                }
            } catch (error) {}
        } else {
            try {
                const response = await fetch(url + "/view-all-courses");
                const data = await response.json();
                console.log(data, "datas");
                setCourses(data.data);
            } catch (error) {
                console.log(error);
                // setCourses([]);
            }
        }
    }
    const addtocart = async (e) => {
        const token = localStorage.getItem("pn_en");
        await axios({
            method: "post",
            url: `${url}/cart`,
            headers: { Authorization: `Basic ${token}` },
            data: {
                course_id: `${e}`,
            },
        }).then(function (res) {
            console.log(res.data);
        });
    };

    useEffect(() => {
        // console.log("yydyyd", queryString);
        // const { id, search } = queryString.parse(location.search);

        let courses;
        // console.log(id, "yydyyd");
        if (search) {
            // searchFilterfn(search);
        }

        if (id) {
            document.querySelector("#customSwitch2").checked = true;
            courses = url + "/view-all-courses/price/FREE";
        } else {
            courses = url + "/view-all-courses";
        }

        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(courses);
                    const data = await response.json();
                    console.log(data, "datas");
                    data.data ? setCourses(data.data) : setCourses([]);
                } catch (error) {
                    console.log(error);
                    // setCourses([]);
                }
            };
            const fetchData2 = async () => {
                try {
                    const response = await fetch(url + "/view-categories");
                    const data = await response.json();
                    console.log(data, "datas");
                    setCat(data.data);
                } catch (error) {
                    console.log(error);
                    // setCat([]);
                }
            };
            const fetchData3 = async () => {
                try {
                    const response = await fetch(url + "/skill-level-count");
                    const data = await response.json();
                    console.log(data, "datas");
                    setSkill(data);
                } catch (error) {
                    console.log(error);
                    // setSkill([]);
                }
            };
            fetchData().then((suc) => {
                console.log(search);
                if (search && search != "") searchFilterfn(search);
            });
            fetchData2();
            fetchData3();
        }
    }, []);

    console.log(cat);
    console.log(skill);
    const star = () => {
        return (
            <li className="list-inline-item">
                <a href="#">
                    <i className="fa fa-star"></i>
                </a>
            </li>
        );
    };

    const mappedData = courses?.map((item, index) => {
        const stars = [];
        for (let i = 0; i <= item.rating; i++) {
            stars.push(star());
        }
        return (
            <a
                rel="noopener noreferrer"
                href={`/course-info?id=${item.course_id}`}
                target="_blank"
            >
                <div
                    className="col-lg-12 all-course-single"
                    style={
                        index % 2 == 0
                            ? { border: "0.5px solid #606470" }
                            : { border: "0.5px solid #00b0f0" }
                    }
                >
                    <div className="courses_list_content">
                        <div className="top_courses list">
                            <div className="thumb col- align-content-center">
                                <img
                                    className="img-whp"
                                    src={item.feature_image}
                                    alt="t1.jpg"
                                    width="140px"
                                    height="165px"
                                />
                                <div className="overlay">
                                    <div className="icon">
                                        <span className="flaticon-like"></span>
                                    </div>
                                    <a className="tc_preview_course" href="#">
                                        Preview Course
                                    </a>
                                </div>
                            </div>
                            <div className="details col-9 p-0">
                                <div className="tc_content">
                                    <h5> {item.course_title}</h5>

                                    <p>{item.short_description}</p>
                                </div>
                                <div className="tc_footer">
                                    <ul className="tc_meta float-left fn-414">
                                        <li className="list-inline-item">
                                            <a href="#">
                                                <i className="flaticon-profile"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">{item.people_count}</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">
                                                <i class="fas fa-book-open"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">{item.lesson_count}</a>
                                        </li>
                                    </ul>
                                    {item.price1 ? (
                                        <div className="tc_price float-right fn-414">
                                            Rs {item.price1}
                                        </div>
                                    ) : (
                                        <div className="tc_price float-right fn-414">
                                            Free
                                        </div>
                                    )}

                                    <ul className="tc_review float-right fn-414">
                                        {stars}({item.rating})
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => {
                                            coursefn(item.course_id);
                                        }}
                                    >
                                        View Details
                                    </button>
                                    <a href="/buy">
                                        <button className="btn  btn-learning mr-2">
                                            Start Learning
                                        </button>
                                    </a>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setModalShow(true)}
                                    >
                                        <span class="flaticon-share">
                                            {" "}
                                            Share
                                        </span>
                                    </button>
                                    <button
                                        className="btn btn-warning ml-2"
                                        onClick={() => {
                                            addtocart(item.course_id);
                                        }}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        );
    });

    console.log(courses?.length);
    // console.log(mappedData?.length);

    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 offset-xl-3 text-center">
                <div className="breadcrumb_content">
                  <h4 className="breadcrumb_title">Courses</h4>
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    ></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}

                <section
                    className="courses-list2 pb40"
                    style={{ background: "whitesmoke", paddingTop: "90px" }}
                >
                    <div className="container ">
                        <div className="row">
                            <div
                                className="col-md-12 col-lg-8 col-xl-9"
                                style={
                                    {
                                        //   borderRight: "0.3px solid rgba(0,0,0,0.5)",
                                        //   background: "white",
                                    }
                                }
                            >
                                <div
                                    className="row courses_list_heading  all-course-box"
                                    style={{
                                        background: "white",
                                        margin: "0rem 0.25rem",
                                    }}
                                >
                                    <div className="col-xl-4 p0">
                                        <div className="instructor_search_result style2">
                                            <p className="mt10 fz15">
                                                <span className="color-dark pr10">
                                                    {courses?.length}
                                                </span>
                                                &nbsp;results
                                                {/* <span className="color-dark pr10 ml-3">
                                                    100
                                                </span>
                                                Video Tutorials */}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 p0">
                                        <div className="candidate_revew_select style2 text-right">
                                            <ul className="mb0">
                                                {/* <li className="list-inline-item">
                                                    <select className="selectpicker show-tick">
                                                        <option>
                                                            Newly published
                                                        </option>
                                                        <option>Recent</option>
                                                        <option>
                                                            Old Review
                                                        </option>
                                                    </select>
                                                </li> */}
                                                <li className="list-inline-item">
                                                    <div className="candidate_revew_search_box course fn-520">
                                                        <div className="form-inline my-2 my-lg-0">
                                                            <input
                                                                className="form-control mr-sm-2"
                                                                type="search"
                                                                placeholder="Search courses by title"
                                                                aria-label="Search"
                                                                value={key}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    SetKey(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    searchFilterfn(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <button
                                                                className="btn my-2 my-sm-0"
                                                                type="button"
                                                            >
                                                                <span className="flaticon-magnifying-glass"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row courses_container style2"> */}
                                <p></p>
                                {mappedData}

                                {/* </div> */}

                                <div
                                    className="row "
                                    style={{ margin: "0rem 0.25rem" }}
                                >
                                    <div className="col-lg-12 mt50">
                                        <div className="mbp_pagination">
                                            <ul className="page_navigation">
                                                <li className="page-item disabled">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                        tabindex="-1"
                                                        aria-disabled="true"
                                                    >
                                                        {" "}
                                                        <span className="flaticon-left-arrow"></span>{" "}
                                                        Prev
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        1
                                                    </a>
                                                </li>
                                                <li
                                                    className="page-item"
                                                    aria-current="page"
                                                >
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        2{" "}
                                                        <span className="sr-only">
                                                            (current)
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        ...
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        14
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link"
                                                        href="#"
                                                    >
                                                        Next{" "}
                                                        <span className="flaticon-right-arrow-1"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* modal */}

                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />

                            {/* sidebar */}

                            <div className="col-lg-4 col-xl-3">
                                <div className="container ">
                                    <div
                                        className="selected_filter_widget style3 mb30 pb-2 border-bottom all-course-box p-3"
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodyPrice"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Price
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodyPrice"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_whitchbox">
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    name="paid"
                                                                    id="customSwitch1"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        pricefn(
                                                                            e
                                                                        );
                                                                    }}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customSwitch1"
                                                                >
                                                                    Paid{" "}
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    name="free"
                                                                    className="custom-control-input"
                                                                    id="customSwitch2"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        pricefn(
                                                                            e
                                                                        );
                                                                    }}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="customSwitch2"
                                                                >
                                                                    Free
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="selected_filter_widget style3 mb30  pb-2 border-bottom all-course-box p-3"
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodySoftware"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Categories
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodySoftware"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_checkbox">
                                                            {cat
                                                                ? cat?.map(
                                                                      (
                                                                          item,
                                                                          index
                                                                      ) => (
                                                                          <div className="custom-control custom-checkbox">
                                                                              <input
                                                                                  type="checkbox"
                                                                                  className="custom-control-input"
                                                                                  id={
                                                                                      item.category_id
                                                                                  }
                                                                                  onClick={(
                                                                                      e
                                                                                  ) => {
                                                                                      fetchCatfn(
                                                                                          e
                                                                                      );
                                                                                  }}
                                                                              />
                                                                              <label
                                                                                  className="custom-control-label"
                                                                                  for={
                                                                                      item.category_id
                                                                                  }
                                                                              >
                                                                                  {
                                                                                      item.category
                                                                                  }
                                                                                  <span className="float-right">
                                                                                      (
                                                                                      {
                                                                                          item.courses_count
                                                                                      }

                                                                                      )
                                                                                  </span>
                                                                              </label>
                                                                          </div>
                                                                      )
                                                                  )
                                                                : ""}

                                                            {/* <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck15"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck15"
                                >
                                  Adobe Illustrator{" "}
                                  <span className="float-right">(15)</span>
                                </label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck16"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck16"
                                >
                                  Graphic Design{" "}
                                  <span className="float-right">(126)</span>
                                </label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck17"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck17"
                                >
                                  Sketch{" "}
                                  <span className="float-right">(1,584)</span>
                                </label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck18"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck18"
                                >
                                  InDesign{" "}
                                  <span className="float-right">(34)</span>
                                </label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck19"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck19"
                                >
                                  CorelDRAW{" "}
                                  <span className="float-right">(34)</span>
                                </label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck20"
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheck20"
                                >
                                  After Effects{" "}
                                  <span className="float-right">(06)</span>
                                </label>
                              </div>
                              <a className="color-orose" href="#">
                                <span className="fa fa-plus pr10"></span> See
                                More
                              </a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="selected_filter_widget style3 mb30 all-course-box p-3 "
                                        style={{ background: "white" }}
                                    >
                                        <div
                                            id="accordion"
                                            className="panel-group"
                                        >
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a
                                                            href="#panelBodySkills"
                                                            className="accordion-toggle link fz20 mb15"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                        >
                                                            Skill level
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="panelBodySkills"
                                                    className="panel-collapse collapse show"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui_kit_checkbox">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="Beginner"
                                                                    onChange={
                                                                        skillCheckFn
                                                                    }
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="Beginner"
                                                                >
                                                                    Beginner{" "}
                                                                    <span className="float-right">
                                                                        (
                                                                        {skill
                                                                            ? skill.Beginner
                                                                            : "0"}
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="Intermediate"
                                                                    onChange={
                                                                        skillCheckFn
                                                                    }
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="Intermediate"
                                                                >
                                                                    Intermediate{" "}
                                                                    <span className="float-right">
                                                                        {" "}
                                                                        (
                                                                        {skill
                                                                            ? skill.Intermediate
                                                                            : "0"}
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="Advanced"
                                                                    onChange={
                                                                        skillCheckFn
                                                                    }
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="Advanced"
                                                                >
                                                                    Advanced{" "}
                                                                    <span className="float-right">
                                                                        {" "}
                                                                        (
                                                                        {skill
                                                                            ? skill.Advanced
                                                                            : "0"}
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="Appropriate for all"
                                                                    onChange={
                                                                        skillCheckFn
                                                                    }
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    for="Appropriate for all"
                                                                >
                                                                    Appropriate
                                                                    for all{" "}
                                                                    <span className="float-right">
                                                                        {" "}
                                                                        (
                                                                        {skill
                                                                            ? skill.Appropriate
                                                                            : "0"}
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="selected_filter_widget style3">
                  <div id="accordion" className="panel-group">
                    <div className="panel">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a
                            href="#panelBodyRating"
                            className="accordion-toggle link fz20 mb15"
                            data-toggle="collapse"
                            data-parent="#accordion"
                          >
                            Rating
                          </a>
                        </h4>
                      </div>
                      <div
                        id="panelBodyRating"
                        className="panel-collapse collapse"
                      >
                        <div className="panel-body">
                          <div className="ui_kit_checkbox style2">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck80"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck80"
                              >
                                Show All{" "}
                                <span className="float-right">(03)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck82"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck82"
                              >
                                1 star and higher{" "}
                                <span className="float-right">(15)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck83"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck83"
                              >
                                2 star and higher{" "}
                                <span className="float-right">(126)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck84"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck84"
                              >
                                3 star and higher{" "}
                                <span className="float-right">(1,584)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck85"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck85"
                              >
                                4 star and higher{" "}
                                <span className="float-right">(34)</span>
                              </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck86"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck86"
                              >
                                5 star and higher{" "}
                                <span className="float-right">(58)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default FreeCourseListing;
