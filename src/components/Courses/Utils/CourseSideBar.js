import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import history from "../../../history";
import { url } from "../../api";

function CourseSideBar({ free, allCourses, setCourses }) {
    const [categories, setCategories] = useState([]);
    const [catFilterIds, setCatFilterIds] = useState([]);
    const [priceFilterType, setPriceFilterType] = useState([]);

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(url + "/view-categories");
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let catFilteredList = [];
        let priceFilteredList = [];

        if (catFilterIds.length === 0 && priceFilterType.length === 0) {
            console.log(catFilterIds);
            setCourses(allCourses);
            return;
        }

        if (priceFilterType.length === 0 && catFilterIds.length > 0) {
            catFilterIds.forEach((category) => {
                const l = allCourses.filter(
                    (course) => course.category_id === category
                );

                catFilteredList = [...catFilteredList, ...l];
            });
            setCourses(catFilteredList);
        }

        if (priceFilterType.length > 0 && catFilterIds.length === 0) {
            console.log(priceFilterType);

            priceFilterType.forEach((type) => {
                const l = allCourses.filter(
                    (course) => course.price_type === type
                );

                priceFilteredList = [...priceFilteredList, ...l];
            });
            setCourses(priceFilteredList);
        }

        if (priceFilterType.length > 0 && catFilterIds.length > 0) {
            catFilterIds.forEach((category) => {
                const l = allCourses.filter(
                    (course) => course.category_id === category
                );

                catFilteredList = [...catFilteredList, ...l];
            });
            priceFilterType.forEach((type) => {
                const l = allCourses.filter(
                    (course) => course.price_type === type
                );

                priceFilteredList = [...priceFilteredList, ...l];
            });

            const result = catFilteredList.filter((cat) =>
                priceFilteredList.some(
                    (price) => price.course_id === cat.course_id
                )
            );

            // console.log(result);
            setCourses(result);
        }
    }, [catFilterIds, priceFilterType]);

    // async function priceFilterFree(e) {
    //     history.push("/courses");
    // }

    const priceFilter = (e, type) => {
        // let priceFilteredList = [];
        if (free) {
            return history.push("/courses");
        }
        if (e.target.checked) {
            setPriceFilterType([...priceFilterType, type]);
        }

        if (!e.target.checked) {
            setPriceFilterType(
                priceFilterType.filter((pType) => pType !== type)
            );
        }
        console.log(priceFilterType);
    };

    const categoryFilter = (e, cat_id) => {
        if (e.target.checked) {
            setCatFilterIds([...catFilterIds, cat_id]);
        }
        if (!e.target.checked) {
            setCatFilterIds(catFilterIds.filter((id) => id !== cat_id));
        }
    };

    return (
        <div>
            <div
                className="selected_filter_widget style3 mb30 pb-2 border-bottom all-course-box p-3"
                style={{ background: "white" }}
            >
                <div id="accordion" className="panel-group">
                    <div className="panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a
                                    href="#panelBodyPrice"
                                    className="accordion-toggle link fz20 mb15"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                >
                                    Price
                                </a>
                            </h4>
                        </div>
                        <div
                            id="panelBodyPrice"
                            className="panel-collapse collapse show"
                        >
                            <div className="panel-body">
                                <div className="ui_kit_whitchbox">
                                    <div className="custom-control custom-switch">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            name="paid"
                                            id="customSwitch1"
                                            onChange={(e) =>
                                                priceFilter(e, "Paid")
                                            }
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customSwitch1"
                                        >
                                            Paid{" "}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-switch">
                                        <input
                                            type="checkbox"
                                            name="free"
                                            className="custom-control-input"
                                            id="customSwitch2"
                                            checked={free}
                                            onChange={(e) =>
                                                priceFilter(e, "Free")
                                            }
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customSwitch2"
                                        >
                                            Free
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="selected_filter_widget style3 mb30  pb-2 border-bottom all-course-box p-3"
                style={{ background: "white" }}
            >
                <div id="accordion" className="panel-group">
                    <div className="panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a
                                    href="#panelBodySoftware"
                                    className="accordion-toggle link fz20 mb15"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                >
                                    Categories
                                </a>
                            </h4>
                        </div>
                        <div
                            id="panelBodySoftware"
                            className="panel-collapse collapse show"
                        >
                            <div className="panel-body">
                                <div className="ui_kit_checkbox">
                                    {/* <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            name="0"
                                            id={`category0`}
                                            onChange={(e) =>
                                                categoryFilter(e, 0)
                                            }
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={`category0`}
                                        >
                                            Uncategorised
                                            <span className="float-right"></span>
                                        </label>
                                    </div> */}
                                    {categories?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="custom-control custom-checkbox"
                                        >
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                name={item.category_id}
                                                id={`category${item.category_id}`}
                                                onChange={(e) =>
                                                    categoryFilter(
                                                        e,
                                                        item.category_id
                                                    )
                                                }
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={`category${item.category_id}`}
                                            >
                                                {item.category}
                                                <span className="float-right"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="selected_filter_widget style3 mb30 all-course-box p-3 "
                style={{ background: "white" }}
            >
                <div id="accordion" className="panel-group">
                    <div className="panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a
                                    href="#panelBodySkills"
                                    className="accordion-toggle link fz20 mb15"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                >
                                    Skill level
                                </a>
                            </h4>
                        </div>
                        <div
                            id="panelBodySkills"
                            className="panel-collapse collapse show"
                        >
                            <div className="panel-body">
                                <div className="ui_kit_checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="Beginner"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="Beginner"
                                        >
                                            Beginner{" "}
                                            <span className="float-right"></span>
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="Intermediate"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="Intermediate"
                                        >
                                            Intermediate{" "}
                                            <span className="float-right">
                                                {" "}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="Advanced"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="Advanced"
                                        >
                                            Advanced{" "}
                                            <span className="float-right">
                                                {" "}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="Appropriate for all"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="Appropriate for all"
                                        >
                                            Appropriate for all{" "}
                                            <span className="float-right">
                                                {" "}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseSideBar;
