import React, { useState, useEffect } from "react";
import AddMilestone from "./AddMilestone";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { url } from "../../api";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import CircularProgress from "@material-ui/core/CircularProgress";

const AddCourse = () => {
  //hooks form code
  // const { register, handleSubmit, watch, errors } = useForm();
  const [drop, setDrop] = useState("image");
  const { register, handleSubmit, watch } = useForm();

  //category
  const [category, setCategory] = useState([]);

  const [page, setPage] = useState(1);
  const [page1Data, setPage1Data] = useState([]);
  const [introFile, setIntroFile] = useState({});
  const [featureImage, setFeatureImage] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch(url + "/view-categories");
        const data = await response.json();
        console.log(data);
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);

  const addCourse = async (data) => {
    setSaving(true);
    console.log(data);

    let fd = new FormData();
    fd.append("course_title", data.course_title);
    fd.append("category_id", data.category_id);
    fd.append("short_description", data.short_description);
    fd.append("course_description", data.course_description);
    fd.append("course_outcome1", data.course_outcome1);
    fd.append("course_outcome2", data.course_outcome2);
    fd.append("course_outcome3", data.course_outcome3);
    fd.append("skills_developed", data.skills_developed);
    fd.append("course_type", data.course_type);
    fd.append("price1", data.price1);
    fd.append("price2", data.price2);
    fd.append("price3", data.price3);
    fd.append("price_type", data.price_type);

    fd.append("requirements", JSON.stringify(data.requirements));
    fd.append("what_learns", JSON.stringify(data.what_learns));

    // data.requirements.forEach((m) => fd.append("requirements", m));
    // data.what_learns.forEach((m) => fd.append("what_learns", m));
    fd.append("feature_image", featureImage);
    fd.append("intro_file_type", data.intro_file_type);
    fd.append("intro_file", introFile);

    const token = localStorage.getItem("Token");
    axios
      .post(`${url}/add-course`, fd, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        console.log(res);
        setSaving(false);
        setPage1Data(res.data);
        setPage(2);
      });
  };
  //on submit api posting
  const onSubmit = async (data) => {
    console.log(data);
    data.category_id = parseInt(data.category_id);
    //converting different what-learn inputs into single array
    const what_learns = [];
    for (let i = 0; i < options.whatLearn.length; i++) {
      if (options.whatLearn[i].value !== "") {
        what_learns.push(options.whatLearn[i].value);
      }
    }
    data.what_learns = what_learns;

    console.log(data);
    //converting different requirements inputs into single array
    const requirements = [];
    for (let i = 0; i < options.requirements.length; i++) {
      if (options.requirements[i].value !== "") {
        requirements.push(options.requirements[i].value);
      }
    }
    data.requirements = requirements;

    // //converting different skillsDeveloped inputs into single string
    const skills_developed = [];
    for (let i = 0; i < options.skillsDeveloped.length; i++) {
      if (options.skillsDeveloped[i].value !== "") {
        skills_developed.push(options.skillsDeveloped[i].value);
      }
    }
    data.skills_developed = skills_developed;
    data.price_type = priceType;
    // console.log(data, "data from form");
    addCourse(data);
  };

  const handleFeatureImage = (files) => {
    setFeatureImage(files[0]);
  };

  const handleIntroFile = (files) => {
    setIntroFile(files[0]);
  };

  const watchdesc = watch(["short_description", "course_description"]);

  const [priceType, setPriceType] = useState("free");

  const [options, setOptions] = useState({
    whatLearn: [{ id: 0, value: "" }],
    requirements: [{ id: 0, value: "" }],
    skillsDeveloped: [{ id: 0, value: "" }],
  });

  const addOptions = (type) => {
    // console.log(id);
    if (type === "whatLearn") {
      const id = options.whatLearn[options.whatLearn.length - 1].id + 1;
      setOptions({
        ...options,
        whatLearn: [...options.whatLearn, { id: +id, value: "" }],
      });
    }
    if (type === "requirements") {
      const id = options.requirements[options.requirements.length - 1].id + 1;
      setOptions({
        ...options,
        requirements: [...options.requirements, { id: +id, value: "" }],
      });
    }
    if (type === "skills") {
      const id =
        options.skillsDeveloped[options.skillsDeveloped.length - 1].id + 1;
      setOptions({
        ...options,
        skillsDeveloped: [...options.skillsDeveloped, { id: +id, value: "" }],
      });
    }
  };

  console.log(options.skillsDeveloped);

  const removeOptions = (type, i) => {
    console.log(i);

    if (type === "whatLearn") {
      setOptions({
        ...options,
        whatLearn: options.whatLearn.filter((sd) => sd.id !== i),
      });
    }
    if (type === "requirements") {
      setOptions({
        ...options,
        requirements: options.requirements.filter((sd) => sd.id !== i),
      });
    }
    if (type === "skills") {
      setOptions({
        ...options,
        skillsDeveloped: options.skillsDeveloped.filter((sd) => sd.id !== i),
      });
    }
  };

  const addValue = (e, type, i) => {
    console.log(i);
    if (type === "whatLearn") {
      setOptions({
        ...options,
        whatLearn: options.whatLearn.map((sd) =>
          sd.id === i ? { ...sd, value: e.target.value } : sd
        ),
      });
    }
    if (type === "requirements") {
      setOptions({
        ...options,
        requirements: options.requirements.map((sd) =>
          sd.id === i ? { ...sd, value: e.target.value } : sd
        ),
      });
    }
    if (type === "skills") {
      setOptions({
        ...options,
        skillsDeveloped: options.skillsDeveloped.map((sd) =>
          sd.id === i ? { ...sd, value: e.target.value } : sd
        ),
      });
    }
  };

  console.log(options);

  //rendering what they learn input fields
  const whatLearn = () =>
    options.whatLearn.map((sd, i) => (
      <div className="form-group col-sm-6 d-flex align-items-end pl-0">
        <div className="col-sm-10">
          <label htmlFor="exampleInputPassword1">Add Options</label>
          <input
            type="text"
            className="form-control"
            value={sd.value}
            onChange={(e) => addValue(e, "whatLearn", sd.id)}
            placeholder="Enter options"
            required
          />
        </div>
        <div className="col-sm-2 d-flex">
          {options.whatLearn.length > 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => removeOptions("whatLearn", sd.id)}
              >
                <i className="fas fa-minus"></i>
              </Button>
            </span>
          )}
          {i === options.whatLearn.length - 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => addOptions("whatLearn")}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </span>
          )}
        </div>
      </div>
    ));

  // //rendering requirements input fields
  const requirements = () =>
    options.requirements.map((sd, i) => (
      <div className="form-group col-sm-6 d-flex align-items-end pl-0">
        <div className="col-sm-10">
          <label htmlFor="exampleInputPassword1">Add Options</label>
          <input
            type="text"
            className="form-control"
            value={sd.value}
            onChange={(e) => addValue(e, "requirements", sd.id)}
            placeholder="Enter options"
            required
          />
        </div>
        <div className="col-sm-2 d-flex">
          {options.requirements.length > 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => removeOptions("requirements", sd.id)}
              >
                <i className="fas fa-minus"></i>
              </Button>
            </span>
          )}
          {i === options.requirements.length - 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => addOptions("requirements")}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </span>
          )}
        </div>
      </div>
    ));

  //rendering skills developed input fields
  const skillsDeveloped = () =>
    options.skillsDeveloped.map((sd, i) => (
      <div className="form-group col-sm-6 d-flex align-items-end pl-0">
        <div className="col-sm-10">
          <label htmlFor="exampleInputPassword1">Add Options</label>
          <input
            type="text"
            className="form-control"
            value={sd.value}
            onChange={(e) => addValue(e, "skills", sd.id)}
            placeholder="Enter options"
            required
          />
        </div>
        <div className="col-sm-2 d-flex">
          {options.skillsDeveloped.length > 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => removeOptions("skills", sd.id)}
              >
                <i className="fas fa-minus"></i>
              </Button>
            </span>
          )}
          {i === options.skillsDeveloped.length - 1 && (
            <span>
              <Button
                className="mr-1"
                color="secondary"
                id={i}
                onClick={() => addOptions("skills")}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </span>
          )}
        </div>
      </div>
    ));
  // return (
  //   console.log(length),
  //   (
  //     <div className="form-group col-sm-6 d-flex align-items-end pl-0">
  //       <div className="col-sm-10">
  //         <label htmlFor="exampleInputPassword1">Add Options</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name={
  //             length ? `skills_developed_${length}` : "skills_developed_0"
  //           }
  //           placeholder="Enter options"
  //           ref={register}
  //           required
  //         />
  //       </div>
  //       <div className="col-sm-2 d-flex">
  //         <span>
  //           <Button
  //             className="mr-1"
  //             color="secondary"
  //             // id={"Tooltip-" + "1"}
  //             id={`Tooltip-${length}`}
  //             onClick={() => {
  //               const divs = options.skillsDeveloped;
  //               console.log(divs, "divsssssssssssssssss");
  //               if (divs.length > 1) divs.pop();
  //               // console.log("divs after", divs);
  //               setOptions({
  //                 ...options,
  //                 skillsDeveloped: divs,
  //               });
  //             }}
  //           >
  //             <i className="fas fa-minus"></i>
  //           </Button>
  //         </span>
  //         <span>
  //           <Button
  //             className="mr-1"
  //             color="secondary"
  //             id={`Tooltip-${`1`}`}
  //             onClick={() => {
  //               const divs = options.skillsDeveloped;
  //               console.log(divs);
  //               divs.push(skillsDeveloped(divs.length));
  //               console.log("divs after", divs);
  //               setOptions({
  //                 ...options,
  //                 skillsDeveloped: divs,
  //               });
  //             }}
  //           >
  //             <i className="fas fa-plus"></i>
  //           </Button>
  //         </span>
  //       </div>
  //     </div>
  //   )
  // );
  // };

  // console.log("requirements", options.requirements);
  // console.log("skillsDeveloped", options.skillsDeveloped);

  if (page === 1) {
    return (
      <React.Fragment>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="card-box">
                <form
                  className="form-horizontal"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Course Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="course_title"
                        ref={register}
                        maxLength="255"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Short Description
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        type="text"
                        className="form-control"
                        ref={register}
                        name="short_description"
                        rows="2"
                        cols="50"
                        maxLength="1500"
                        required
                      />
                      <span className="color-gray">
                        {watchdesc.short_description
                          ? watchdesc.short_description.length + "/250"
                          : "0/250"}
                      </span>
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
                        ref={register}
                        name="course_description"
                        rows="4"
                        cols="50"
                        maxLength="5000"
                        required
                      />
                      <span className="color-gray">
                        {watchdesc.course_description
                          ? watchdesc.course_description.length + "/500"
                          : "0/500"}
                      </span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Category
                    </label>
                    <div className="col-sm-10">
                      <select
                        name="category_id"
                        className="form-control"
                        ref={register}
                        required
                      >
                        {category.map((item, index) => (
                          <option value={item.category_id}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Skill Level
                    </label>
                    <div className="col-sm-10">
                      <select
                        name="course_type"
                        className="form-control"
                        ref={register}
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="appropriate_for_all">
                          Appropriate for all
                        </option>
                      </select>
                    </div>
                  </div>

                  <h3 className="mt-3 mb-3">Course Outcome</h3>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Job & FreeLancing
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="course_outcome1"
                        ref={register}
                        maxLength="1000"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Contribution
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="course_outcome2"
                        ref={register}
                        maxLength="1000"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Entrepreneurship
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="course_outcome3"
                        ref={register}
                        maxLength="1000"
                        required
                      />
                    </div>
                  </div>

                  <h3 className="mb-3 mt-3">Pricing</h3>
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Pricing Type
                    </label>
                    <div className="col-sm-10">
                      <select
                        name="price_type"
                        value={priceType}
                        onChange={(e) => {
                          setPriceType(e.target.value);
                        }}
                        className="form-control"
                        required
                      >
                        <option value="paid">Paid</option>
                        <option value="free">Free</option>
                      </select>
                    </div>
                  </div>
                  {priceType === "paid" && (
                    <React.Fragment>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Proficient Price
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control"
                            name="price1"
                            ref={register}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Competent Price
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control"
                            name="price2"
                            ref={register}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-sm-2  col-form-label"
                          htmlFor="simpleinput"
                        >
                          Expert Price
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control"
                            name="price3"
                            ref={register}
                            required
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  )}

                  <h3 className="mb-3 mt-3">What they learn</h3>
                  {whatLearn()}

                  <h3 className="mb-3 mt-3">Requirements</h3>
                  {requirements()}
                  <h3 className="mb-3 mt-3">Skills Developed</h3>
                  {skillsDeveloped()}
                  <div className="form-group row">
                    <label
                      className="col-sm-2  col-form-label"
                      htmlFor="simpleinput"
                    >
                      Intro File type
                    </label>
                    <div className="col-sm-10">
                      <select
                        name="intro_file_type"
                        className="form-control"
                        ref={register}
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        required
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>
                  {drop === "image" && (
                    <React.Fragment>
                      <div className="attached-files mt-4 row">
                        <h4 className="header-title col-sm-2  mb-4">
                          Intro File
                        </h4>
                        <section className="container border-custom col-sm-10 p-3">
                          <DropzoneArea
                            onChange={(files) => handleIntroFile(files)}
                            maxFileSize={10485760}
                            filesLimit={1}
                          />
                        </section>
                      </div>
                      <div className="attached-files mt-4 row">
                        <h4 className="header-title col-sm-2  mb-4">
                          Feature Image
                        </h4>
                        <section className="container border-custom col-sm-10 p-3">
                          <DropzoneArea
                            onChange={(files) => handleFeatureImage(files)}
                            maxFileSize={10485760}
                            filesLimit={1}
                          />
                        </section>
                      </div>
                    </React.Fragment>
                  )}

                  {drop === "video" && (
                    <React.Fragment>
                      <div className="attached-files mt-4 row">
                        <h4 className="header-title col-sm-2  mb-4">
                          Intro File
                        </h4>
                        <section className="container border-custom col-sm-10 p-3">
                          <DropzoneArea
                            onChange={(files) => handleIntroFile(files)}
                            maxFileSize={10485760}
                            filesLimit={1}
                          />
                        </section>
                      </div>
                    </React.Fragment>
                  )}

                  <div className="d-flex justify-content-end p-3 w-100">
                    <button
                      className="btn btn-primary"
                      disabled={saving}
                      type="submit"
                      style={{ width: 80 }}
                    >
                      {!saving && "Next"}
                      {saving && (
                        <CircularProgress style={{ width: 20, height: 20 }} />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <AddMilestone courseData={page1Data} />;
  }
};

export default AddCourse;
