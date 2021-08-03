import React, { useState } from "react";
import ReactPlayer from "react-player";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function VideoAudio({
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
            copyArr[quesNo] = +question.anspoint;
        } else {
            copyArr[quesNo] = 0;
        }
        ansCopyArr[quesNo] = e.target.value;

        setPointsArr(copyArr);
        setAnswerArr(ansCopyArr);
        console.log(pointsArr);
    };

    return (
        <div>
            <ReactPlayer
                className="react-player"
                url={question.question}
                width="100%"
                height="100%"
                playing
                controls
            />
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    {question.type === "video-audio-choose" ? (
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
                    ) : (
                        <React.Fragment>
                            <FormControlLabel
                                value="optionA"
                                // onChange={onRadioChange}
                                control={<Radio />}
                                label={
                                    <img
                                        width="100"
                                        src={question.optionA}
                                        alt="opt1"
                                    />
                                }
                                checked={answer === "optionA" ? true : false}
                            />
                            <FormControlLabel
                                value="optionB"
                                control={<Radio />}
                                label={
                                    <img
                                        width="100"
                                        src={question.optionB}
                                        alt="opt2"
                                    />
                                }
                                checked={answer === "optionB" ? true : false}
                            />
                            <FormControlLabel
                                value="optionC"
                                control={<Radio />}
                                label={
                                    <img
                                        width="100"
                                        src={question.optionC}
                                        alt="opt3"
                                    />
                                }
                                checked={answer === "optionC" ? true : false}
                            />
                            <FormControlLabel
                                value="optionD"
                                control={<Radio />}
                                label={
                                    <img
                                        width="100"
                                        src={question.optionD}
                                        alt="opt4"
                                    />
                                }
                                checked={answer === "optionD" ? true : false}
                            />
                        </React.Fragment>
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default VideoAudio;
