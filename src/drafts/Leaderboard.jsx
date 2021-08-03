import React from "react";
import NavMain from "../components/Nav";
import Footer from "../components/Footer";
import Card from "react-bootstrap/Card";
import "./GiveAndTake.css";
import ProgressBar from "react-animated-progress-bar";
import "./performance.css";

function Leaderboard() {
    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 text-center">
                                <div className="breadcrumb_content">
                                    <h4 className="breadcrumb_title">
                                        Leaderboard
                                    </h4>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        ></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section style={{paddingTop: "81px"}}>
                    <h1 className="text-center  pb-4 mt-2">Leaderboard</h1>
                    <div className="container">
                        <div className="row">
                            <Card
                                style={{ width: "32%" }}
                                className="p-2 box-shadow-custom mr-3 position-relative"
                            >
                                <Card.Body className="">
                                    <h2 className="text-center ">Board</h2>

                                    <Card.Text>
                                        <div class="col-sm-12 col-md-12 col-lg-12">
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                src="https://via.placeholder.com/75"
                                                                alt=""
                                                                class="rounded-circle"
                                                                width="80px"
                                                                height="80px"
                                                            />
                                                        </td>
                                                        <td className="center-table">
                                                            Alexa
                                                        </td>
                                                        <td className="center-table">
                                                            450 points
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                src="https://via.placeholder.com/75"
                                                                alt=""
                                                                class="rounded-circle"
                                                                width="80px"
                                                                height="80px"
                                                            />
                                                        </td>
                                                        <td className="center-table">
                                                            Eliza
                                                        </td>
                                                        <td className="center-table">
                                                            450 points
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                src="https://via.placeholder.com/75"
                                                                alt=""
                                                                class="rounded-circle"
                                                                width="80px"
                                                                height="80px"
                                                            />
                                                        </td>
                                                        <td className="center-table">
                                                            Emma
                                                        </td>
                                                        <td className="center-table">
                                                            450 points
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                style={{ width: "32%" }}
                                className="p-2 box-shadow-custom mr-3"
                            >
                                <Card.Body>
                                    <h2 className="text-center">
                                        Course Progress
                                    </h2>

                                    <Card.Text>
                                        <h4>Overall percentage completed</h4>
                                        <ProgressBar
                                            height="10px"
                                            rect
                                            fontColor="gray"
                                            percentage="70"
                                            rectPadding="1px"
                                            rectBorderRadius="20px"
                                            trackPathColor="transparent"
                                            bgColor="#333333"
                                            trackBorderColor="grey"
                                        />

                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="img_hvr_box home7 w-100">
                                                    <div class="overlay">
                                                        <div class="details">
                                                            <h4>
                                                                Overall Score -
                                                                250points
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 ">
                                                <div class="img_hvr_box home7 two w-100">
                                                    <div class="overlay">
                                                        <div class="details">
                                                            <h4>
                                                                Assestments -
                                                                14/20
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="img_hvr_box home7 three w-100">
                                                    <div class="overlay">
                                                        <div class="details">
                                                            <h4>
                                                                Assestment
                                                                points - 10/20
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card
                                style={{ width: "32%" }}
                                className="p-2 box-shadow-custom"
                            >
                                <Card.Body>
                                    <h2 className="text-center">
                                        Skills Developed
                                    </h2>

                                    <Card.Text>
                                        <div
                                            class="blog_tag_widget"
                                            style={{
                                                border: "none",
                                                textAlign: "center",
                                            }}
                                        >
                                            <h4 class="title"></h4>
                                            <ul class="tag_list">
                                                <li class="list-inline-item">
                                                    <a href="#">Photoshop</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="#">Sketch</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="#">Beginner</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="#">UX/UI</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card
                                style={{ width: "80%" }}
                                className="p-2 box-shadow-custom ml-auto mr-auto m-3"
                            >
                                <Card.Body>
                                    <h2 className="text-center">Your Badge</h2>

                                    <Card.Text>
                                        <div className="d-flex justify-content-center">
                                            <img
                                                src="./images/sport.svg"
                                                className="img img-fluid"
                                                width="20.5%"
                                            ></img>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default Leaderboard;
