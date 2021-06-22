import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";

function VideoAudioFillup({
    question,
    currentQues,
    pointsArr,
    setPointsArr,
    answerArr,
    setAnswerArr,
    answer,
}) {
    const [ansValue, setAnsValue] = useState(answer || "");
    const quesNo = currentQues - 1;
    const copyArr = [...pointsArr];
    let ansCopyArr = [...answerArr];

    const checkAnswer = () => {
        if (ansValue.trim().toLowerCase() === question.answer) {
            copyArr[quesNo] = 10;
        } else {
            copyArr[quesNo] = 0;
        }
        ansCopyArr[quesNo] = ansValue;

        setPointsArr(copyArr);
        setAnswerArr(ansCopyArr);
    };

    return (
        <div className="quiz__ques">
            <ReactPlayer
                className="react-player"
                url={question.question}
                width="100%"
                height="100%"
                playing
                controls
            />
            <div>
                <input
                    type="text"
                    value={ansValue}
                    onBlur={checkAnswer}
                    onChange={(e) => setAnsValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export default VideoAudioFillup;
