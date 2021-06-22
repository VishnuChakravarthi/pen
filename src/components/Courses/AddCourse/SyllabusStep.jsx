import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SyllabusStep = (props) => {
  console.log(props.data, "data from before step");
  const [section2, setSection2] = useState(false);

  //boiler plate of react hook forms
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const length = Object.keys(data).length;

    const values = Object.values(data);
    milestoneBlock(length, values);
    setSection2(true);
  };

  //rendering milestone
  const [milestone, setMilestone] = useState({
    count: "",
    div: [],
    milestoneBlock: [],
  });

  //milestone renderer
  const renderMilestoneInside = (i) => {
    return (
      <React.Fragment>
        <h3 className="mt-3 mb-2">{`Milestone ${i + 1}`}</h3>
        <div className="form-group row">
          <label className="col-sm-2  col-form-label" for="simpleinput">
            Enter No of lessons
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              name={`milestone${i + 1}_lessons_count`}
              ref={register}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  const lesson = (i, j) => {
    return (
      <React.Fragment>
        <h4>Lessons {j + 1}</h4>
        <div className="form-group row">
          <label className="col-sm-2  col-form-label" for="simpleinput">
            Lesson Name
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              name={`milestone${i + 1}_lessons${j + 1}_name`}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2  col-form-label" for="simpleinput">
            Lesson Material Type
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              name={`milestone${i + 1}_lessons${j + 1}type`}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2  col-form-label" for="simpleinput">
            Lesson Material
          </label>
          <div className="col-sm-6">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name={`milestone${i + 1}_lessons${j + 1}_file`}
            />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  };

  //lesson renderer
  const lessonRenderer = (i, values) => {
    const array = [];
    const lessons_count = values[i];
    console.log(lessons_count);
    for (let j = 0; j < lessons_count; j++) {
      array.push(lesson(i, j));
    }

    return <React.Fragment>{array}</React.Fragment>;
  };

  const milestoneGenrater = (e) => {
    const count = document.getElementsByName("milestone_count")[0].value;
    console.log(count);
    if (count) {
      setMilestone({
        ...milestone,
        count,
      });
      const arrayDiv = [];
      for (let i = 0; i < count; i++) {
        console.log(arrayDiv, "array div");
        arrayDiv.push(renderMilestoneInside(i));
      }
      setMilestone({
        ...milestone,
        div: arrayDiv,
      });
    } else {
      setMilestone("");
    }
  };

  //milestone block
  const milestoneDiv = (e, values) => {
    return (
      <React.Fragment>
        <h3 className="mb-3 mt-3">Milestone {e + 1}</h3>
        {lessonRenderer(e, values)}
      </React.Fragment>
    );
  };

  const milestoneBlock = (e, values) => {
    const milestoneArray = [];
    for (let i = 0; i < e; i++) {
      console.log(milestoneArray, "array milestone");
      milestoneArray.push(milestoneDiv(i, values));
    }
    setMilestone({
      ...milestone,
      milestoneBlock: milestoneArray,
    });
  };

  console.log(milestone.milestoneBlock, "from log");
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <h3 className="mt-4 mb-3">Sylabus & Lessons</h3>
              <div className="form-group row">
                <label className="col-sm-2  col-form-label" for="simpleinput">
                  {" "}
                  Enter Number of Milestones
                </label>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control"
                    name="milestone_count"
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => milestoneGenrater(e)}
                  >
                    Enter
                  </button>
                </div>
              </div>
              <div className={!section2 ? "milestone-container" : "d-none"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {milestone.div.map((item, index) => (
                    <> {item} </>
                  ))}
                  {milestone.div.length > 0 && (
                    <div className="d-flex justify-content-end mr-5">
                      <button className="btn btn-primary">Submit</button>
                    </div>
                  )}
                </form>
              </div>

              <div className={section2 ? "section-2" : "d-none"}>
                <div className="milestone-block">
                  <form>
                    {milestone.milestoneBlock.map((item, index) => (
                      <div className="mt-3 mb-3">{item}</div>
                    ))}
                    <div className="d-flex justify-content-end mr-5">
                      <button className="btn btn-primary">Submit</button>
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

export default SyllabusStep;
