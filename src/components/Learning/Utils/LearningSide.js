import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Learning.css";
import { useStateValue } from "../../../StateProvider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Axios from "axios";
import swal from "sweetalert";
import { url } from "../../api";
import history from "../../../history";

function LearningSide({ id, tab, setDisplaySide, displaySide }) {
    const [{ darkMode, scroll }, dispatch] = useStateValue();
    const [active, setActive] = useState("");
    const [glossary, setGlossary] = useState(false);
    const [glossaryTerm, setGlossaryTerm] = useState("");
    const [definition, setDefinition] = useState([]);
    const [sideBar, setSideBar] = useState(false);
    // const [displaySide, setDisplaySide] = useState(false);
    const token = localStorage.getItem("pn_en");

    // const client = Owlbot("e34a031b90084bafe592a895c924acd322a56b58");
    const owlToken = "e34a031b90084bafe592a895c924acd322a56b58";
    const glossaryRef = useRef(null);

    useEffect(() => {
        if (glossaryRef.current) {
            executeScroll();
        }
    }, [definition.length]);

    const executeScroll = () => {
        console.log("insideeee");
        glossaryRef.current.scrollIntoView();
    };

    useEffect(() => {
        setActive(tab);
    }, [tab]);

    const setDarkMode = (value) => {
        dispatch({
            type: "SET_DARK_MODE",
            darkMode: value,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchWord();
        }
    };

    // if (scroll > document.getElementById("side")?.offsetHeight) {
    //     setSideBar(true);
    // }

    if (window.location.href.includes("learn")) {
        window.onscroll = () => {
            // console.log(
            //     document.getElementById("footer").getBoundingClientRect().top
            // );
            // console.log(scroll - window.pageYOffset);
            // console.log(window.pageYOffset);
            if (
                // scroll - window.pageYOffset <=
                document.getElementById("footer").getBoundingClientRect().top <=
                document.getElementById("side")?.offsetHeight
            ) {
                // console.log("reached");
                setSideBar(true);
            } else {
                setSideBar(false);
            }
        };
    }

    const searchWord = async () => {
        setGlossary(false);
        console.log("search word");
        if (glossaryTerm !== "") {
            try {
                const response = await Axios.get(
                    `https://owlbot.info/api/v4/dictionary/${glossaryTerm}`,
                    {
                        headers: {
                            Authorization: `Token ${owlToken}`,
                        },
                    }
                );
                console.log(response.data);
                setDefinition(response.data.definitions);
            } catch (e) {
                return swal({
                    text: "No matching words found",
                    icon: "warning",
                });
            }
            // setGlossaryTerm("");
        }
    };

    const fetchTrackProgress = async (course_id) => {
        try {
            const response = await Axios.get(
                `${url}/track/course/${course_id}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data, "asdasdasdasdsadasdsds");
            return response.data.data[0];
        } catch (e) {}
    };

    const onCoursePageRedirect = async () => {
        const pro = await fetchTrackProgress(id);
        if (pro) {
            history.push(`/learn/${id}/lesson/${pro.lesson_id}`);
        }
    };

    return (
        <>
            <div
                className="sidemenu__fl"
                onClick={() => setDisplaySide(!displaySide)}
            >
                <i class="fas fa-chevron-left"></i>
            </div>
            <div
                id="side"
                className={
                    !sideBar
                        ? "col-lg-2 learningside"
                        : "col-lg-12 learningside2"
                }
            >
                <a className="btn-width">
                    {" "}
                    <button
                        className={
                            active === "learn" ? "learningside__active" : null
                        }
                        onClick={() => onCoursePageRedirect()}
                    >
                        Learning Page
                    </button>
                </a>

                <Link to={`/learn/${id}/syllabus`} className="btn-width">
                    {" "}
                    <button
                        className={
                            active === "syllabus"
                                ? "learningside__active"
                                : null
                        }
                    >
                        Syllabus
                    </button>
                </Link>

                <Link to={`/learn/${id}/assessment`} className="btn-width">
                    <button
                        className={
                            active === "assess" ? "learningside__active" : null
                        }
                    >
                        Assessments
                    </button>
                </Link>

                <Link to={`/learn/${id}/leaderboard`} className="btn-width">
                    <button
                        className={
                            active === "progress"
                                ? "learningside__active"
                                : null
                        }
                    >
                        Progress
                    </button>
                </Link>
                <Link to={`/learn/${id}/bookmark`} className="btn-width">
                    {" "}
                    <button
                        className={
                            active === "bookmark"
                                ? "learningside__active"
                                : null
                        }
                    >
                        Bookmark
                    </button>
                </Link>
                <Link to={`/learn/${id}/discussion`} className="btn-width">
                    <button
                        className={
                            active === "discuss" ? "learningside__active" : null
                        }
                    >
                        Discussion
                    </button>
                </Link>
                {/* <BootstrapSwitchButton
                checked={false}
                onChange={() => setDarkMode(darkMode ? false : true)}
                onstyle="dark"
                offstyle="light"
                style="border"
            /> */}
                {/* <div>Dark Mode</div> */}

                <div className="custom-control custom-switch custom-switch-learn btn-width">
                    <div>Darkmode</div>

                    <input
                        type="checkbox"
                        className="custom-control-input"
                        name="paid"
                        id="customSwitch1"
                        onChange={() => setDarkMode(darkMode ? false : true)}
                        checked={darkMode}
                    />
                    <span className="darkmode__span">Off</span>
                    <label
                        className="custom-control-label"
                        htmlFor="customSwitch1"
                    >
                        On{" "}
                    </label>
                </div>

                {!glossary ? (
                    <button
                        className="btn btn-primary glossary__btn btn-width"
                        onClick={() => setGlossary(true)}
                    >
                        Glossary <i className="fas fa-search ml-1"></i>
                    </button>
                ) : (
                    <div className="glossary__input">
                        <Input
                            id=""
                            className="glossary__search"
                            style={{ color: darkMode ? "#ffffff" : "black" }}
                            type="text"
                            value={glossaryTerm}
                            onChange={(e) => setGlossaryTerm(e.target.value)}
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => searchWord()}
                                        style={{
                                            outline: "none",
                                        }}
                                    >
                                        <Search
                                            style={{
                                                color: darkMode
                                                    ? "white"
                                                    : "black",
                                                outline: "none",
                                            }}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                )}
                {definition.length !== 0 && (
                    <div className="glossary__definition" ref={glossaryRef}>
                        <h4>
                            Word: <strong>{glossaryTerm}</strong>
                        </h4>
                        {definition?.map((define, i) => (
                            <div key={i}>
                                <div>
                                    <strong>type:</strong>
                                    <span> {define.type}</span>
                                </div>
                                <div>
                                    <strong>definition:</strong>
                                    <span> {define.definition}</span>
                                </div>
                                <div>
                                    <strong>example:</strong>
                                    <span> {define.example}</span>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default LearningSide;
