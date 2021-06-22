import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { url } from "../../api";
import axios from "axios";
import swal from "sweetalert";
import ClassicInputs from "./Inputs/ClassicInputs";
import TextAreaInputs from "./Inputs/TextAreaInputs";
import DropdownInputs from "./Inputs/DropdownInputs";
import BulletInputs from "./Inputs/BulletInputs";
import MediaEdit from "./MediaEdit";
import EditSyllabus from "./Modal/EditSyllabus";
import AddSyllabus from "./Modal/AddSyllabus";
import EditLesson from "./EditLessons";

const EditCourse = ({ location }) => {
  const { id } = queryString.parse(location.search);
  const [newWTL, setNewWTL] = useState([]);
  const [newReq, setNewReq] = useState([]);
  const [newSkinDev, setNewSkinDev] = useState([]);
  const [course, setCourse] = useState({
    course_id: id,
    category_id: 1,
    course_title: "",
    short_description: "",
    course_description: "",
    category: "",
    course_type: "",
    course_outcome1: "",
    course_outcome2: "",
    course_outcome3: "",
    price_type: "",
    price1: "",
    price2: "",
    price3: "",
    what_learns: [],
    requirements: [],
    skills_developed: "",
  });

  const [categories, setCategories] = useState([]);
  const [syllabus, setSyllabus] = useState([]);

  const handleInputs = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          firstResponse,
          secondResponse,
          thirdResponse,
        ] = await Promise.all([
          axios.get(`${url}/view-course/${id}`),
          axios.get(`${url}/view-categories`),
          axios.get(`${url}/syllabus/${id}`),
          // axios.get(`${API_URL}common/banners`),
        ]);
        console.log({ firstResponse, secondResponse, thirdResponse });
        setCourse(firstResponse.data.data);
        const names = secondResponse.data.data?.map((res) => res.category);
        setCategories(names);
        setNewWTL(firstResponse.data.data.what_learns);
        setNewReq(firstResponse.data.data.requirements);
        setNewSkinDev(firstResponse.data.data.skills_developed.split(","));
        setSyllabus(thirdResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const editCourse = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("course_id", id);
    formData.append("course_title", course.course_title);
    formData.append("category_id", course.category_id);
    formData.append("category", course.category);
    formData.append("short_description", course.short_description);
    formData.append("course_description", course.course_description);
    formData.append("course_type", course.course_type);
    formData.append("course_outcome1", course.course_outcome1);
    formData.append("course_outcome2", course.course_outcome2);
    formData.append("course_outcome3", course.course_outcome3);
    formData.append("price_type", course.price_type);
    formData.append("what_learns", JSON.stringify(newWTL));
    formData.append("requirements", JSON.stringify(newReq));
    formData.append("skills_developed", newSkinDev.join());
    formData.append("feature_image", course.feature_image);
    formData.append("intro_file", course.intro_file);
    formData.append("intro_file_type", course.intro_file_type);
    if (course.price_type === "Paid") {
      formData.append("price1", course.price1);
      formData.append("price2", course.price2);
      formData.append("price3", course.price3);
    }
    console.log("Edit", formData);

    const token = await localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post(
        `${url}/edit-course/${course.course_id}`,
        formData,
        {
          headers: headers,
        }
      );
      console.log(response);
      swal("Success!", "Course Edited!", "success");
    } catch (error) {
      console.log(error);
      swal("OOPS!", "Editing Course Failed", "error");
    }
  };

  const [addSyllabus, setAddSyllabus] = useState(false);

  const toggleAddCourse = (e) => {
    e.preventDefault();
    setAddSyllabus(!addSyllabus);
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <h1 className="mb-4">Editing {course.course_title}</h1>
              <form className="form-horizontal">
                <h3 className="my-4">Introduction</h3>
                <ClassicInputs
                  handleInputs={handleInputs}
                  value={course.course_title}
                  name="course_title"
                  label="Course Title"
                />
                <TextAreaInputs
                  handleInputs={handleInputs}
                  value={course.short_description}
                  name="short_description"
                  label="Short Description"
                />
                <TextAreaInputs
                  handleInputs={handleInputs}
                  value={course.course_description}
                  name="course_description"
                  label="Course Description"
                />
                <DropdownInputs
                  handleInputs={handleInputs}
                  value={course.category}
                  name="category"
                  label="Category"
                  options={categories}
                />
                <DropdownInputs
                  handleInputs={handleInputs}
                  value={course.course_type}
                  name="course_type"
                  label="Skill Level"
                  options={[
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                    "Appropriate for all",
                  ]}
                />
                <h3 className="my-4">Course Outcome</h3>
                <ClassicInputs
                  handleInputs={handleInputs}
                  value={course.course_outcome1}
                  name="course_outcome1"
                  label="Job & FreeLancing"
                />
                <ClassicInputs
                  handleInputs={handleInputs}
                  value={course.course_outcome2}
                  name="course_outcome2"
                  label="Contribution"
                />
                <ClassicInputs
                  handleInputs={handleInputs}
                  value={course.course_outcome3}
                  name="course_outcome3"
                  label="Entrepreneurship"
                />
                <h3 className="my-4">Pricing</h3>
                <DropdownInputs
                  handleInputs={handleInputs}
                  value={course.price_type}
                  name="price_type"
                  label="Price Type"
                  options={["Paid", "Free"]}
                />
                {course.price_type === "Paid" && (
                  <>
                    <ClassicInputs
                      handleInputs={handleInputs}
                      value={course.price1}
                      name="price1"
                      label="price1"
                    />
                    <ClassicInputs
                      handleInputs={handleInputs}
                      value={course.price2}
                      name="price2"
                      label="price2"
                    />
                    <ClassicInputs
                      handleInputs={handleInputs}
                      value={course.price3}
                      name="price3"
                      label="price3"
                    />
                  </>
                )}
                <h3 className="my-4">What they learn</h3>
                <BulletInputs
                  items={newWTL}
                  setItems={setNewWTL}
                  title="What they learn"
                />
                <h3 className="my-4">Requirements</h3>
                {newReq.length === 0 && (
                  <div className="d-flex justify-content-between mb-1">
                    <p>
                      <i className="mdi mdi-check pr-3" />
                      No Data
                    </p>
                  </div>
                )}
                <BulletInputs
                  items={newReq}
                  setItems={setNewReq}
                  title="Requirements"
                />
                <h3 className="my-4">Skills Developed</h3>
                <BulletInputs
                  items={newSkinDev}
                  setItems={setNewSkinDev}
                  title="Skills Developed"
                />
                <div className="text-right mt-2">
                  <button
                    className="btn btn-primary py-1 px-3"
                    onClick={(e) => editCourse(e)}
                    type="button"
                  >
                    <p className="my-0" style={{ fontSize: "1.2rem" }}>
                      Submit
                    </p>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-box">
              <form className="form-horizontal">
                <h3 className="my-4">Edit Syllabus</h3>
                {syllabus?.map((syllabus, index) => (
                  <EditSyllabus
                    title={syllabus.title}
                    description={syllabus.description}
                    duration={syllabus.duration}
                    id={syllabus.id}
                    key={index}
                  />
                ))}
                <div className="text-right">
                  <button
                    className="btn btn-primary mb-1 mt-3"
                    onClick={(e) => toggleAddCourse(e)}
                    type="button"
                  >
                    Add New Syllabus
                  </button>
                </div>
              </form>
            </div>
            <div className="card-box">
              <form className="form-horizontal">
                <h3 className="my-4">Edit Lessons</h3>
                <EditLesson syllabus={syllabus} setSyllabus={setSyllabus} />
              </form>
            </div>
            <MediaEdit courseDetail={course} />
          </div>
        </div>
      </div>
      {/* MODAL */}
      <AddSyllabus
        isModal={addSyllabus}
        setIsModal={setAddSyllabus}
        courseId={id}
      />
    </React.Fragment>
  );
};

export default EditCourse;
