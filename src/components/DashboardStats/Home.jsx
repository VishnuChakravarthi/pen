import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { url } from "../api";
import { states } from "./states.js";
import Location from "./Location";
import Categories from "./Categories";
import CatGender from "./CatGender";
import CourseGender from "./CourseGender";
import Export from "../Export";

const Home = () => {
  const [data, setData] = useState({
    user_per_category: [],
    user_per_category_gender: [],
    user_per_category_location: [],
    user_per_course: [],
    user_per_course_gender: [],
    user_per_course_location: [],
  });

  const [drop, setDrop] = useState("user_per_course_location");

  const [series1, setSeries1] = useState([44, 55, 41, 17]);

  const [series2, setSeries2] = useState([
    {
      name: "Female",
      data: [44, 55, 41, 67],
    },
    {
      name: "Male",
      data: [13, 23, 20, 8],
    },
    {
      name: "Others",
      data: [11, 17, 15, 15],
    },
  ]);

  const categories = ["Literature", "Tutorials", "Technology", "Education"];

  useEffect(() => {
    async function fetchDash() {
      const token = localStorage.getItem("Token");
      await axios(`${url}/dashboard`, {
        method: "get",
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then((res) => {
        console.log("dashboard", res.data[0]);
        setData(res.data[0]);
      });
    }
    fetchDash();
  }, []);

  const [options1] = useState({
    chart: {
      type: "donut",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
        },
      },
    ],
  });

  useEffect(() => {
    const perCat = () => {
      let literature = 0,
        tutorials = 0,
        technology = 0,
        education = 0;
      for (let i = 0; i < data.user_per_category.length; i++) {
        if (data.user_per_category[i].category === "Literature")
          literature = literature + data.user_per_category[i].user_count;
        if (data.user_per_category[i].category === "Tutorials")
          tutorials = tutorials + data.user_per_category[i].user_count;
        if (data.user_per_category[i].category === "Technology")
          technology = technology + data.user_per_category[i].user_count;
        if (data.user_per_category[i].category === "Education")
          education = education + data.user_per_category[i].user_count;
      }
      // console.log({ literature, tutorials, technology, education });
      setSeries1([literature, tutorials, technology, education]);
    };
    perCat();
  }, [data]);

  const [options2] = useState({
    chart: {
      type: "bar",
      height: 280,
      width: 360,
      stacked: true,
      stackType: "100%",
    },
    xaxis: {
      categories: categories,
    },
    fill: {
      opacity: 1,
    },
  });

  useEffect(() => {
    const perGen = () => {
      let lFemale = 0,
        lMale = 0,
        lOthers = 0,
        tuFemale = 0,
        tuMale = 0,
        tuOthers = 0,
        teFemale = 0,
        teMale = 0,
        teOthers = 0,
        eFemale = 0,
        eMale = 0,
        eOthers = 0;
      for (let i = 0; i < data.user_per_category_gender.length; i++) {
        if (data.user_per_category_gender[i].category === "Literature") {
          lFemale = data.user_per_category_gender[i].female;
          lMale = data.user_per_category_gender[i].male;
          lOthers = data.user_per_category_gender[i].others;
        }
        if (data.user_per_category_gender[i].category === "Tutorials") {
          tuFemale = data.user_per_category_gender[i].female;
          tuMale = data.user_per_category_gender[i].male;
          tuOthers = data.user_per_category_gender[i].others;
        }
        if (data.user_per_category_gender[i].category === "Technology") {
          teFemale = data.user_per_category_gender[i].female;
          teMale = data.user_per_category_gender[i].male;
          teOthers = data.user_per_category_gender[i].others;
        }
        if (data.user_per_category_gender[i].category === "Education") {
          eFemale = data.user_per_category_gender[i].female;
          eMale = data.user_per_category_gender[i].male;
          eOthers = data.user_per_category_gender[i].others;
        }
      }
      // console.log(
      //   lFemale + tuFemale + teFemale + eFemale,
      //   lMale + tuMale + teMale + eMale,
      //   lOthers + tuOthers + teOthers + eOthers
      // );
      setSeries2([
        {
          name: "Female",
          data: [lFemale, tuFemale, teFemale, eFemale],
        },
        {
          name: "Male",
          data: [lMale, tuMale, teMale, eMale],
        },
        {
          name: "Others",
          data: [lOthers, tuOthers, teOthers, eOthers],
        },
      ]);
    };
    perGen();
  }, [data]);

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              <div className="d-flex justify-content-between dash__head">
                <h1>Dashboard</h1>
                <Export />
              </div>
              {/* USERS PER CATEGORY */}
              <div className="row">
                <div className="col-xl-6">
                  <div className="card-box m-3">
                    <h4 className="header-title mb-3">Users per Category</h4>
                    <ReactApexChart
                      options={options1}
                      series={series1}
                      type="donut"
                      height={350}
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="card-box m-3">
                    <h4 className="header-title mb-3">
                      Users per Categories and Gender
                    </h4>
                    <ReactApexChart
                      options={options2}
                      series={series2}
                      type="bar"
                      height={260}
                    />
                  </div>
                </div>
              </div>
              {/* TABLES */}
              <div className="row mt-5">
                <div className="col-xl-12">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="header-title mb-3">
                      Course Users Categories
                    </h4>
                    <div className="form-group">
                      <select
                        className="form-control"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                      >
                        <option defaultChecked value="user_per_course_location">
                          Course Users Categorised by Location
                        </option>
                        <option value="user_per_category_location">
                          Course Users Categorised by Categories
                        </option>
                        <option value="user_per_course_gender">
                          Course Users Categorised by Gender
                        </option>
                        <option value="user_per_category_gender">
                          Course Users Categorised by Categories and Gender
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {drop === "user_per_course_location" && (
                      <Location states={states} data={data} />
                    )}
                    {drop === "user_per_category_location" && (
                      <Categories states={states} data={data} />
                    )}
                    {drop === "user_per_course_gender" && (
                      <CourseGender data={data} />
                    )}
                    {drop === "user_per_category_gender" && (
                      <CatGender data={data} />
                    )}
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

export default Home;
