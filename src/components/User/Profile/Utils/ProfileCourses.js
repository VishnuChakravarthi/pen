import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-animated-progress-bar";
import { url } from "../../../api";
import history from "../../../../history";
import swal from "sweetalert";

function ProfileCourses({ spinner, setSpinner }) {
    const [courseLabel, setCourseLabel] = useState("");
    const [courses, setCourses] = useState([]);
    const [completedPercent, setCompletedPercent] = useState();
    const [completedTime, setCompletedTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const [badges, setBadges] = useState([]);
    // const [currentSyllabus, setCurrentSyllabus] = useState();

    const token = localStorage.getItem("Token");

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        await axios({
            method: "get",
            url: "http://epen.nyxwolves.tech/api/mypurchase",
            headers: { Authorization: `Basic ${token}` },
        }).then((res) => {
            console.log(res.data.data, "courses");
            setCourses(res.data.data);
            // fetchSyllabusAll(res.data.data);
        });
    };

    const openCourse = async (i, course) => {
        console.log(course);
        const response = await fetch(
            `${url}/results/${course.course.course_id}`,
            {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            }
        );
        console.log(response);
        const data = await response.json();
        setBadges(data.data[0]);
        setCompletedPercent();
        setCompletedTime(0);
        setRemainingTime(0);
        setCourseLabel(`card${i}`);
        await fetchSyllabusAll(course.course);
        // console.log(await fetchSyllabusAll(course.course));
        // setCompletedTime(await fetchSyllabusAll(course.course)[1]);
        // setRemainingTime(await fetchSyllabusAll(course.course)[2]);

        // fetchSy;
    };

    const fetchSyllabusAll = async (course) => {
        console.log(course);
        try {
            const response1 = await axios.get(
                `${url}/syllabus/${course.course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            const allSyllabus = response1.data.data.map((data) => data.id);
            const allDuration = response1.data.data.map((data) => {
                var week = data.duration.split(" ");
                return +week[0];
            });

            console.log(
                allDuration,
                "durrrrrrrrrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaaaa"
            );
            console.log(allSyllabus);
            const response2 = await fetchTrackProgress(course.course_id);
            console.log(
                response2,
                "***************************************************"
            );

            // calculatePercentage(allSyllabus, currentSyllabus);
            if (response2) {
                const currentSyllabus = response2.syllabus_id;

                const index = allSyllabus.indexOf(+currentSyllabus);
                console.log(index);
                const completed = allSyllabus.slice(0, index);
                const courseCompleted = allDuration.slice(0, index);
                const courseRem = allDuration.slice(index);
                const totalCourseWeek = courseCompleted.reduce(
                    (sum, num) => sum + num,
                    0
                );
                const totalCourseLeft = courseRem.reduce(
                    (sum, num) => sum + num,
                    0
                );
                const totalTime = totalCourseWeek * 7;
                const totalTimeRem = totalCourseLeft * 7;
                const totalLen = allSyllabus.length;
                const completedLen = completed.length;
                // setTotalSylCompleted(completed);
                const completedPercentage = (completedLen * 100) / totalLen;
                console.log(completedPercentage, totalTime, totalTimeRem);
                setCompletedPercent(completedPercentage);
                setCompletedTime(totalTime);
                setRemainingTime(totalTimeRem);
                // return [completedPercentage, totalTime, totalTimeRem];
            } else {
                return "0";
            }
        } catch (e) {}
    };

    // const calculatePercentage = (allSyllabus, currentSyllabus) => {
    //

    // };

    console.log(
        badges,

        "---------------------------------------------------------------------------"
    );

    const fetchTrackProgress = async (course_id) => {
        try {
            const response = await axios.get(
                `${url}/track/course/${course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            // console.log(response.data, "asdasdasdasdsadasdsds");
            return response.data.data[0];
        } catch (e) {}
    };

    // console.log();

    const fetchSyllabus = async (course_id) => {
        try {
            const response = await axios.get(`${url}/syllabus/${course_id}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(response.data, "sykasdkaldkalkdlak");
            return response.data.data[0];
        } catch (e) {}
    };

    const learnPageRedirect = async (course_id) => {
        setSpinner(true);
        const pro = await fetchTrackProgress(course_id);
        if (pro) {
            if (pro.lesson_id) {
                return history.push(
                    `/learn/${course_id}/lesson/${pro.lesson_id}`
                );
            }
        }
        const newCourse = await fetchSyllabus(course_id);
        if (newCourse) {
            return history.push(
                `/learn/${course_id}/lesson/${newCourse.lessons[0]?.id}`
            );
        }
        setSpinner(false);

        swal("Sorry", "No lessons to learn", "error");
    };

    console.log(spinner);

    return (
        <React.Fragment>
            <h3 className="text-center mb-3">COURSES</h3>
            <div className="faq_according">
                <div className="accordion" id="accordionExample">
                    {courses?.map((course, i) => (
                        <div key={i} className="card">
                            <div
                                className={`card-header ${
                                    courseLabel === `card${i}`
                                        ? `course__selected`
                                        : ""
                                }`}
                                style={{
                                    cursor: "pointer",
                                }}
                                id={`heading${i}`}
                                onClick={() => openCourse(i, course)}
                                data-toggle="collapse"
                                data-target={`#collapse${i}`}
                                aria-expanded="true"
                                aria-controls={`collapseOne${i}`}
                            >
                                <h2 className="mb-0">
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                    >
                                        <h3>{course.course.course_title}</h3>
                                        <span className="flaticon-right-arrow float-right"></span>
                                    </button>
                                </h2>
                            </div>
                            <div
                                id={`collapse${i}`}
                                className="collapse"
                                aria-labelledby={`heading${i}`}
                                data-parent="#accordionExample"
                            >
                                <div className="card-body progress_courses_card">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "80%",
                                            }}
                                        >
                                            <h4>
                                                Overall percentage completed
                                            </h4>
                                            {completedPercent ? (
                                                <ProgressBar
                                                    width="45%"
                                                    height="10px"
                                                    rect
                                                    fontColor="gray"
                                                    percentage={
                                                        completedPercent
                                                    }
                                                    rectPadding="1px"
                                                    rectBorderRadius="20px"
                                                    trackPathColor="transparent"
                                                    bgColor="#333333"
                                                    trackBorderColor="grey"
                                                />
                                            ) : (
                                                <ProgressBar
                                                    width="45%"
                                                    height="10px"
                                                    rect
                                                    fontColor="gray"
                                                    percentage={0}
                                                    rectPadding="1px"
                                                    rectBorderRadius="20px"
                                                    trackPathColor="transparent"
                                                    bgColor="#333333"
                                                    trackBorderColor="grey"
                                                />
                                            )}

                                            {/* <ProgressBar
                                                    width="45%"
                                                    height="10px"
                                                    rect
                                                    fontColor="gray"
                                                    percentage="0"
                                                    rectPadding="1px"
                                                    rectBorderRadius="20px"
                                                    trackPathColor="transparent"
                                                    bgColor="#333333"
                                                    trackBorderColor="grey"
                                                />
                                            )} */}
                                        </div>
                                        <button
                                            className="buy__btn btn__buy hover__filled"
                                            disabled={spinner}
                                            onClick={() =>
                                                learnPageRedirect(
                                                    course.course.course_id
                                                )
                                            }
                                        >
                                            {spinner && (
                                                <span>
                                                    <i className="fas fa-spinner"></i>
                                                </span>
                                            )}
                                            {!spinner && (
                                                <span className="return__course">
                                                    Return to course
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                    <div className="event_counter_plugin_container">
                                        <div className="event_counter_plugin_content">
                                            <ul
                                                className="row"
                                                style={{
                                                    margin: "0px",
                                                }}
                                            >
                                                <li>
                                                    Days Left
                                                    <span id="days">
                                                        {remainingTime}
                                                    </span>
                                                </li>
                                                <li>
                                                    Time Spent
                                                    <span id="minutes">
                                                        {completedTime} days
                                                    </span>
                                                </li>
                                                <li>
                                                    Overall Score
                                                    <span id="hours">
                                                        45 pts
                                                    </span>
                                                </li>
                                                <li>
                                                    Assesment Score
                                                    <span id="hours">
                                                        20 pts
                                                    </span>
                                                </li>
                                                <li>
                                                    Badge
                                                    <span id="hours text-center">
                                                        {badges?.badge ===
                                                        "Gold" ? (
                                                            <img
                                                                src="/images/gold.jpg"
                                                                alt="gold"
                                                                width="40px"
                                                            />
                                                        ) : badges?.badge ===
                                                          "Silver" ? (
                                                            <img
                                                                src="/images/silver.jpg"
                                                                alt="silver"
                                                                width="40px"
                                                            />
                                                        ) : badges?.badge ===
                                                          "Bronze" ? (
                                                            <img
                                                                src="/images/bronze.jpg"
                                                                alt="bronze"
                                                                width="40px"
                                                            />
                                                        ) : (
                                                            <p>No badges yet</p>
                                                        )}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProfileCourses;
