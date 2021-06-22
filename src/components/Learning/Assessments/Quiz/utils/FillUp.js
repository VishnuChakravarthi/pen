import React, { useState } from "react";

function FillUp({
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
            <h5>{question.question}</h5>
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

export default FillUp;
