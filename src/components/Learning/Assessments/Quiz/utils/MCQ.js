import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function MCQ({
    question,
    currentQues,
    pointsArr,
    setPointsArr,
    answerArr,
    setAnswerArr,
    answer,
}) {
    const [value, setValue] = useState("");

    const handleRadioChange = (e) => {
        const quesNo = currentQues - 1;
        let copyArr = [...pointsArr];
        let ansCopyArr = [...answerArr];
        setValue(e.target.value);
        // setPointsArr(
        if (e.target.value === `option${question.answer}`) {
            copyArr[quesNo] = 10;
        } else {
            copyArr[quesNo] = 0;
        }

        ansCopyArr[quesNo] = e.target.value;

        setAnswerArr(ansCopyArr);

        setPointsArr(copyArr);
    };

    return (
        <div>
            <div className="quiz__ques">
                <h4>{question.question}</h4>
            </div>

            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    {question.type === "true-false" ? (
                        <React.Fragment>
                            <FormControlLabel
                                value="true"
                                // onChange={onRadioChange}
                                control={<Radio />}
                                label={"True"}
                                checked={answer === "true" ? true : false}
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio />}
                                label={"False"}
                                checked={answer === "false" ? true : false}
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <FormControlLabel
                                value="optionA"
                                // onChange={onRadioChange}
                                control={<Radio />}
                                label={question.optionA}
                                checked={answer === "optionA" ? true : false}
                            />
                            <FormControlLabel
                                value="optionB"
                                control={<Radio />}
                                label={question.optionB}
                                checked={answer === "optionB" ? true : false}
                            />
                            <FormControlLabel
                                value="optionC"
                                control={<Radio />}
                                label={question.optionC}
                                checked={answer === "optionC" ? true : false}
                            />
                            <FormControlLabel
                                value="optionD"
                                control={<Radio />}
                                label={question.optionD}
                                checked={answer === "optionD" ? true : false}
                            />
                        </React.Fragment>
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default MCQ;
