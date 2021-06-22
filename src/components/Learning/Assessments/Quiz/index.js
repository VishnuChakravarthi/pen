import React, { useEffect, useState } from "react";
import "./takeupasses.css";
import { url } from "../../../api";
import MCQ from "./utils/MCQ";
import FillUp from "./utils/FillUp";
import VideoAudio from "./utils/VideoAudio";
import { useStateValue } from "../../../../StateProvider";
import { Link } from "react-router-dom";
import VideoAudioFillup from "./utils/VideoAudioFillup";

function TakeupAsses({ match }) {
    const [data, setData] = useState([]);
    const [currentQues, setCurrentQues] = useState(1);
    const [pointsArr, setPointsArr] = useState([]);
    const [answerArr, setAnswerArr] = useState(new Array(data.length));
    const [, dispatch] = useStateValue();
    const quesPerPage = 1;

    // const pointsArr = new Array(data.length);
    const course_id = match.params.course_id;
    const asses_id = match.params.asses_id;
    // let quesNo = currentQues - 1;

    console.log(currentQues - 1);

    useEffect(() => {
        FetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const FetchData = async () => {
        const response = await fetch(url + `/view-questions/${asses_id}`);
        const data = await response.json();

        console.log(data);
        setData(data.data);
    };

    useEffect(() => {
        setPointsArr(new Array(data.length).fill(0));
    }, [data]);

    const indexOfLastQues = currentQues * quesPerPage;
    const indexOfFirstQues = indexOfLastQues - quesPerPage;
    const currentQuesArr = data?.slice(indexOfFirstQues, indexOfLastQues);

    const changeQues = (direction) => {
        if (direction === "prev" && currentQues > 1) {
            setCurrentQues(currentQues - 1);
        }

        if (direction === "next" && currentQues < data.length) {
            setCurrentQues(currentQues + 1);
            const quesNo = currentQues - 1;
            console.log(pointsArr[quesNo]);
            if (pointsArr[quesNo] === undefined) {
                const copyArr = [...pointsArr];
                copyArr[quesNo] = 0;
                setPointsArr(copyArr);
            }

            if (answerArr[quesNo] === undefined) {
                const copyArr = [...answerArr];
                copyArr[quesNo] = null;
                setAnswerArr(copyArr);
            }
        }
    };

    const submitTest = () => {
        dispatch({
            type: "SET_EXAM_RESULT",
            result: pointsArr,
        });
        // history.push(`/result`);
    };
    console.log(process.env.path);
    console.log(data, "quizdata");

    const renderQuestions = (question) => {
        if (
            question.type === "mcq" ||
            question.type === "problem-solution-mcq" ||
            question.type === "true-false"
        ) {
            return (
                <MCQ
                    question={question}
                    currentQues={currentQues}
                    pointsArr={pointsArr}
                    setPointsArr={setPointsArr}
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    answer={answerArr[currentQues - 1]}
                />
            );
        }
        if (
            question.type === "problem-solution-fillup" ||
            question.type === "fillup"
        ) {
            return (
                <FillUp
                    question={question}
                    currentQues={currentQues}
                    pointsArr={pointsArr}
                    setPointsArr={setPointsArr}
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    answer={answerArr[currentQues - 1]}
                />
            );
        }

        if (
            question.type === "video-audio-choose" ||
            question.type === "video-audio-image"
        ) {
            return (
                <VideoAudio
                    question={question}
                    currentQues={currentQues}
                    pointsArr={pointsArr}
                    setPointsArr={setPointsArr}
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    answer={answerArr[currentQues - 1]}
                />
            );
        }

        if (question.type === "video-audio-fillup") {
            return (
                <VideoAudioFillup
                    question={question}
                    currentQues={currentQues}
                    pointsArr={pointsArr}
                    setPointsArr={setPointsArr}
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    answer={answerArr[currentQues - 1]}
                />
            );
        }
    };

    console.log(pointsArr);
    console.log(answerArr);

    return (
        <React.Fragment>
            <React.Fragment>
                <section className="quiz">
                    <div className="container-quiz m-auto">
                        {/* <div className="result"></div> */}
                        <div className="que-no">
                            {currentQues}/{data.length}
                        </div>
                        <button className="restart">Restart</button>

                        <div className="quiz__inner">
                            {currentQuesArr.map((question) =>
                                renderQuestions(question)
                            )}

                            <div className="choices">
                                {currentQues > 1 ? (
                                    <button
                                        className="true"
                                        onClick={() => changeQues("prev")}
                                    >
                                        prev
                                    </button>
                                ) : null}
                                {currentQues !== data.length ? (
                                    <button
                                        className="true"
                                        onClick={() => changeQues("next")}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <Link
                                        to={`/learn/${course_id}/assessment/${asses_id}/result`}
                                    >
                                        <button
                                            className="true"
                                            onClick={() => submitTest()}
                                        >
                                            Submit
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="quiz__quesbtns">
                        {data.map((_, i) => (
                            <button
                                className={
                                    answerArr[i] === undefined
                                        ? `quiz__noans`
                                        : answerArr[i] === null
                                        ? `quiz__skipped`
                                        : `quiz__answered`
                                }
                                onClick={() => setCurrentQues(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}

export default TakeupAsses;
