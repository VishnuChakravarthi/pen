import React, { useEffect, useState } from "react";
import { url } from "../../api";
// import history from "../../../history";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./SelectPlan.css";
import { useStateValue } from "../../../StateProvider";

function SelectPlan({ match }) {
    const [prices, setPrices] = useState([]);
    const token = localStorage.getItem("Token");

    const [{ cartLength }, dispatch] = useStateValue();

    console.log(match.params, "select plan");
    useEffect(() => {
        FetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const FetchData = async () => {
        try {
            const response = await fetch(
                url + `/view-course/${match.params.id}`
            );
            const data = await response.json();
            console.log(data.data);
            setPrices(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // function courseFn() {
    //     // console.log(course);
    //     // history.push(`/course/${match.params.id}`);
    // }

    const addtoCart = async () => {
        const postData = {
            course_id: match.params.id,
        };
        try {
            const response = await Axios.post(`${url}/cart`, postData, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });

            console.log(response.data);
            dispatch({
                type: "SET_CART",
                cartLength: cartLength + 1,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section>
            <div className="container">
                <div className="col-12">
                    <div
                        className="height-container p-3"
                        style={{ height: "" }}
                    >
                        <h3
                            className="text-center p-3 "
                            style={{ fontSize: "2rem" }}
                        >
                            Choose Competency Level
                        </h3>
                        <div className="row align-items-center justify-content-center ">
                            <div className="col-lg-4 col-sm-6 mb-3">
                                <div className="card buy-card">
                                    <div
                                        className="d-flex justify-content-center align-items-center price__container"
                                        style={{
                                            background:
                                                "-webkit-linear-gradient(45deg, rgb(224, 197, 0) 0%, rgb(247, 182, 149) 100%)",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <div className="triangle__div1"></div>
                                        <div className="triangle__div2"></div>

                                        <div className="header-container p-4">
                                            <h3 className="title-buy">
                                                PROFICIENT
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="body-card plan__desc pt-3 pl-5">
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Quality
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Content
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Assesment
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Mini Project
                                        </p>
                                        <p>
                                            <img
                                                src="/images/close.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Internship(offline/online)
                                        </p>
                                        <p>
                                            <img
                                                src="/images/close.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Live project Mentor
                                        </p>
                                    </div>
                                    <div className="buy__button">
                                        <div className="price price__buy">
                                            {prices.price_type?.toLowerCase() ===
                                            "paid" ? (
                                                <>
                                                    <i className="fas fa-rupee-sign mr-1"></i>
                                                    {prices.price1}
                                                </>
                                            ) : (
                                                "Free"
                                            )}
                                        </div>
                                        <Link to={`/cart`}>
                                            <button
                                                onClick={() => addtoCart()}
                                                className="buy__btn btn__buy hover__filled"
                                            >
                                                <span>Get Started</span>
                                            </button>
                                            {/* <div
                                                class="button-container-1"
                                                onClick={() => addtoCart()}
                                            >
                                                <span class="mas">
                                                    GET STARTED
                                                </span>
                                                <button
                                                    id="work"
                                                    type="button"
                                                    name="Hover"
                                                >
                                                    GET STARTED
                                                </button>
                                            </div> */}
                                            {/* <button class="buy__btn btn-1 hover-filled-slide-right">
                                                <span>hover me</span>
                                            </button> */}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-3">
                                <div className="card buy-card ">
                                    <div
                                        className="d-flex justify-content-center align-items-center price__container"
                                        style={{
                                            background:
                                                "-webkit-linear-gradient(45deg, #c96881 0%,#f7b695 100%)",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <div className="triangle__div1"></div>
                                        <div className="triangle__div2"></div>
                                        <div className="header-container p-4">
                                            <h3 className="title-buy">
                                                COMPETENT
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="body-card plan__desc pt-3 pl-5">
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Quality
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Content
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Assesment
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Mini Project
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Internship (Offline/Online)
                                        </p>
                                        <p>
                                            <img
                                                src="/images/close.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Live project Mentor
                                        </p>
                                    </div>
                                    <div className="buy__button">
                                        <div className="price price__buy">
                                            {prices.price2 !== "undefined" &&
                                            prices.price2 ? (
                                                <>
                                                    <i className="fas fa-rupee-sign mr-1"></i>
                                                    {prices.price2}
                                                </>
                                            ) : (
                                                "Free"
                                            )}
                                        </div>
                                        <Link to={`/cart`}>
                                            <button
                                                onClick={() => addtoCart()}
                                                className="buy__btn btn__buy hover__filled"
                                            >
                                                <span>Get Started</span>
                                            </button>
                                            {/* <div
                                                class="button-container-1"
                                                onClick={() => addtoCart()}
                                            >
                                                <span class="mas">
                                                    GET STARTED
                                                </span>
                                                <button
                                                    id="work"
                                                    type="button"
                                                    name="Hover"
                                                >
                                                    GET STARTED
                                                </button>
                                            </div> */}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-3">
                                <div className="card buy-card">
                                    <div
                                        className="d-flex justify-content-center align-items-center price__container"
                                        style={{
                                            background:
                                                "-webkit-linear-gradient(45deg, #6B6ECC 0%, #89BFDF 100%)",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <div className="triangle__div1"></div>
                                        <div className="triangle__div2"></div>
                                        <div className="header-container p-4">
                                            <h3 className="title-buy">
                                                EXPERT
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="body-card plan__desc pt-3 pl-5">
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Quality
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Content
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Assesment
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Mini Project
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Internship (Offline/Online)
                                        </p>
                                        <p>
                                            <img
                                                src="/images/tick.svg"
                                                alt="available"
                                                width="25px"
                                                className="mr-2"
                                            />
                                            Live project Mentor
                                        </p>
                                    </div>
                                    <div className="buy__button">
                                        <div className="price price__buy">
                                            {prices.price3 !== "undefined" &&
                                            prices.price3 ? (
                                                <>
                                                    <i className="fas fa-rupee-sign mr-1"></i>
                                                    {prices.price3}
                                                </>
                                            ) : (
                                                "Free"
                                            )}
                                        </div>
                                        <Link to={`/cart`}>
                                            <button
                                                onClick={() => addtoCart()}
                                                className="buy__btn btn__buy hover__filled"
                                            >
                                                <span>Get Started</span>
                                            </button>
                                            {/* <div
                                                class="button-container-1"
                                                onClick={() => addtoCart()}
                                            >
                                                <span class="mas">
                                                    GET STARTED
                                                </span>
                                                <button
                                                    id="work"
                                                    type="button"
                                                    name="Hover"
                                                >
                                                    GET STARTED
                                                </button>
                                            </div> */}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectPlan;
