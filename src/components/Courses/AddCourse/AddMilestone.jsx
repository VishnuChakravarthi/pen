import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../api";
import AddLesson from "./AddLesson";
import CircularProgress from "@material-ui/core/CircularProgress";

function AddMilestone({ courseData }) {
  // console.log(props.data, "data from before step");
  // const course_id = 1;
  const [page, setPage] = useState(1);
  const [page2Data, setPage2Data] = useState([]);
  const [numMiles, setNumMiles] = useState("");
  const [miles, setMiles] = useState([]);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("Token");
  //boiler plate of react hook forms
  // const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log(miles);
    setSaving(true);

    const asyncForEach = async (array, callback) => {
      for (let i = 0; i < array.length; i++) {
        await callback(array[i]);
      }
    };

    const submit = async () => {
      await asyncForEach(miles, async (item) => {
        item.course_id = courseData.course_id;
        // item.course_id = 22;

        await axios
          .post(`${url}/add-syllabus`, item, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
            setPage2Data((page2Data) => [...page2Data, res.data]);
          });
      });
      setPage(2);
      setSaving(false);
    };

    submit();
  };

  const generateMiles = () => {
    const num = parseInt(numMiles);
    var arr = [];
    for (var i = 0; i < num; i++) {
      console.log(i);
      arr.push({ title: "", description: "", duration: "" });
    }
    setMiles(arr);
  };
  if (page === 1) {
    return (
      <React.Fragment>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="card-box">
                <h3 className="mt-4 mb-3">MileStones</h3>
                <div className="form-group row">
                  <label
                    className="col-sm-2  col-form-label"
                    htmlFor="simpleinput"
                  >
                    {" "}
                    Enter Number of Milestones
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="number"
                      className="form-control"
                      name="milestone_count"
                      value={numMiles}
                      onChange={(e) => setNumMiles(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => generateMiles()}
                    >
                      Enter
                    </button>
                  </div>
                </div>
                {miles.map((item, index) => {
                  return (
                    <form className="form-horizontal" key={index}>
                      <h1>MileStone {index + 1}</h1>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Title
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="Duration"
                            value={item.title}
                            onChange={(e) => {
                              setMiles([
                                ...miles.slice(0, index),
                                { ...miles[index], title: e.target.value },
                                ...miles.slice(index + 1),
                              ]);
                            }}
                            maxLength="300"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Description
                        </label>
                        <div className="col-sm-10">
                          <textarea
                            type="text"
                            className="form-control"
                            name="Description"
                            rows="2"
                            cols="50"
                            value={item.description}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) {
                                setMiles([
                                  ...miles.slice(0, index),
                                  {
                                    ...miles[index],
                                    description: e.target.value,
                                  },
                                  ...miles.slice(index + 1),
                                ]);
                              }
                            }}
                            maxLength="2500"
                            required
                          />
                          <span className="color-gray">
                            {item.description
                              ? item.description.length + "/500"
                              : "0/500"}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Duration
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="Duration"
                            value={item.duration}
                            onChange={(e) => {
                              setMiles([
                                ...miles.slice(0, index),
                                {
                                  ...miles[index],
                                  duration: e.target.value,
                                },
                                ...miles.slice(index + 1),
                              ]);
                            }}
                            maxLength="100"
                            required
                          />
                        </div>
                      </div>
                    </form>
                  );
                })}
                {miles.length ? (
                  <button
                    type="submit"
                    className="btn-primary btn"
                    onClick={(e) => {
                      onSubmit();
                    }}
                  >
                    {!saving && "Submit"}
                    {saving && (
                      <CircularProgress style={{ width: 20, height: 20 }} />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <AddLesson data={page2Data} miles={miles} />;
  }
}

export default AddMilestone;
