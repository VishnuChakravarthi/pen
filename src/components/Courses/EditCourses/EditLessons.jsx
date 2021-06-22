import axios from "axios";
import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import AddLesson from "./Modal/AddLessons";
import { url } from "../../api";
import EditLesson from "./Modal/EditLesson";

const EditLessons = ({ syllabus }) => {
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);

  const fetchLessons = async (id) => {
    console.log("clicked");
    setLoading(true);
    try {
      const response = await axios.get(`${url}/view-lessons/${id}`);
      console.log(response);
      // if (response.data === []) {
      //   setLessons([]);
      //   return;
      // }
      setLessons(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(loading);
  console.log(lessons);

  const [addLesson, setAddLesson] = useState(false);

  const toggleAddLesson = (e) => {
    e.preventDefault();
    setAddLesson(!addLesson);
  };

  return (
    <React.Fragment>
      <Accordion>
        {syllabus?.map((syllabus, index) => (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                eventKey={syllabus.id}
                onClick={() => fetchLessons(syllabus.id)}
              >
                {syllabus.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={syllabus.id}>
              <Card.Body>
                {loading ? (
                  <div className="w-100 d-flex align-items-center">
                    <p>Loading Lessons...</p>
                  </div>
                ) : !lessons.length ? (
                  <div>
                    <p>No Lessons</p>
                    <div className="text-right">
                      <button className="btn btn-secondary">
                        Add New Lesson
                      </button>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    {lessons?.map((lesson, index) => (
                      <div key={index}>
                        <EditLesson
                          title={lesson.title}
                          description={lesson.description}
                          file_type={lesson.file_type}
                          course_file={lesson.course_file}
                          sharp_script={lesson.sharp_script}
                          file_extension={lesson.file_extension}
                          id={lesson.id}
                        />
                      </div>
                    ))}
                    <div className="text-right mt-3">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => toggleAddLesson(e)}
                        type="button"
                      >
                        Add New Lesson
                      </button>
                    </div>
                  </React.Fragment>
                )}
                {/* MODAL */}
                <AddLesson
                  addLesson={addLesson}
                  setAddLesson={setAddLesson}
                  id={syllabus.id}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </React.Fragment>
  );
};

export default EditLessons;
