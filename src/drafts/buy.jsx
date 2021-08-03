import React, { useEffect, useState } from "react";
import Navbar from "./Nav";
import Footer from "../components/Footer";
import queryString from "query-string";
import { url } from "../components/api";

function Buy({ location }) {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const { id } = queryString.parse(location.search);
        const FetchData = async () => {
            try {
                const response = await fetch(url + `/view-course/${id}`);
                const data = await response.json();
                console.log(data.data);
                setPrices(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        FetchData();
        console.log(id);
    }, []);

    function courseFn() {
        const { id } = queryString.parse(location.search);
        window.location.href = `/course?id=${id}`;
    }

    return (
        <React.Fragment>
            <Navbar />
            <React.Fragment>
                <div>
                    <div className="container" style={{paddingTop: "81px"}}>
                        <div className="col-12">
                            <div
                                className="height-container p-3"
                                style={{ height: "" }}
                            >
                                <h3
                                    class="text-center p-3 "
                                    style={{ fontSize: "2rem" }}
                                >
                                    Choose Competency Level
                                </h3>
                                <div className="row align-items-center justify-content-center ">
                                    <div className="col-lg-4 col-sm-6 mb-3">
                                        <div className="card buy-card">
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    background:
                                                        "-webkit-linear-gradient(45deg, rgb(224, 197, 0) 0%, rgb(247, 182, 149) 100%)",
                                                    borderRadius: "15px",
                                                }}
                                            >
                                                <div className="header-container p-4">
                                                    <h3 className="title-buy">
                                                        PROFICIENT
                                                    </h3>
                                                    <div className="price">
                                                        <i class="fas fa-rupee-sign mr-1"></i>
                                                        {prices.price1
                                                            ? prices.price1
                                                            : "Free"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="body-card pt-3 pl-5">
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Quality
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Content
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Assesment
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Mini Project
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/close.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Internship(offline/online)
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/close.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Live project Mentor
                                                </p>
                                            </div>
                                            <div className="buy-button mt-3">
                                                <button onClick={courseFn}>
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 mb-3">
                                        <div className="card buy-card ">
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    background:
                                                        "-webkit-linear-gradient(45deg, #c96881 0%,#f7b695 100%)",
                                                    borderRadius: "15px",
                                                }}
                                            >
                                                <div className="header-container p-4">
                                                    <h3 className="title-buy">
                                                        COMPETENT
                                                    </h3>
                                                    <div className="price">
                                                        <i class="fas fa-rupee-sign mr-1"></i>
                                                        {prices.price2
                                                            ? prices.price2
                                                            : "Free"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="body-card pt-3 pl-5">
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Quality
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Content
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Assesment
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Mini Project
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Internship (Offline/Online)
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/close.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Live project Mentor
                                                </p>
                                            </div>
                                            <div className="buy-button mt-3">
                                                <button onClick={courseFn}>
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="card buy-card">
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    background:
                                                        "-webkit-linear-gradient(45deg, #6B6ECC 0%, #89BFDF 100%)",
                                                    borderRadius: "15px",
                                                }}
                                            >
                                                <div className="header-container p-4">
                                                    <h3 className="title-buy">
                                                        EXPERT
                                                    </h3>
                                                    <div className="price">
                                                        <i class="fas fa-rupee-sign mr-1"></i>
                                                        {prices.price3
                                                            ? prices.price3
                                                            : "Free"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="body-card pt-3 pl-5 pb-3">
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Quality
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Content
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Assesment
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Mini Project
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Internship (Offline/Online)
                                                </p>
                                                <p>
                                                    <img
                                                        src="./images/tick.svg"
                                                        alt="available"
                                                        width="25px"
                                                        className="mr-2"
                                                    />
                                                    Live project Mentor
                                                </p>
                                            </div>
                                            <div className="buy-button">
                                                <button onClick={courseFn}>
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

export default Buy;
