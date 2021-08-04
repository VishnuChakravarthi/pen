import React, { useState, useEffect } from "react";
import history from "../../history";
import "./home.css";
import Typed from "react-typed";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import VideoPlayerModal from "./VideoPlayerModal";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { Helmet } from "react-helmet";

function Home() {
    const [search, setSearch] = useState("");
    const [videoPlayModal, setVideoPlayModal] = useState(false);
    // const shadow1 = {
    //     boxShadow:
    //         "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    //     marginRight: "1rem",
    //     paddingBottom: "1rem",
    //     borderRadius: "15px",

    //     // background: "#323643",
    // };
    // const shadow2 = {
    //     boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    //     inset 0 0 20px rgba(255, 255, 255,0),
    //     7px 7px 15px rgba(55, 84, 170,.15),
    //     -7px -7px 20px rgba(255, 255, 255,1),
    //     inset 0px 0px 4px rgba(255, 255, 255,.2)`,
    //     marginRight: "1rem",
    //     paddingBottom: "1rem",
    //     borderRadius: "15px",
    //     border: "0.5px solid #606470",
    //     // background: "#93deff",
    // };

    const handleSearch = () => {
        history.push(`/courses/${search}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            history.push(`/courses/${search}`);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <React.Fragment>
            <Helmet>
                <title>Home | The Pen App</title>
                <meta name="description" content="Home page" />
            </Helmet>
            <section>
                <VideoPlayerModal
                    open={videoPlayModal}
                    setVideoPlayModal={setVideoPlayModal}
                />
                <div
                    className="home-three home3-overlay home3_bgi6"
                    style={{ zIndex: 1 }}
                >
                    <div className="container">
                        {/* <div className="play__btn">
                            <div
                                className="video__play__button"
                                onClick={() => setVideoPlayModal(true)}
                            >
                                <span></span>
                            </div>
                        </div> */}
                        <div className="row posr">
                            <div className="col-lg-12 search__home__page">
                                <div
                                    className="home-text text-center"
                                    style={{ zIndex: 5 }}
                                >
                                    <h2 className="fz50">I Want to Learn</h2>
                                    <div className="">
                                        <div className="ht_search_widget">
                                            <div className="header_search_widget">
                                                <form className="form-inline mailchimp_form justify-content-center">
                                                    <div className="sear">
                                                        <Typed
                                                            strings={[
                                                                "Science and Engineering Psychology",
                                                                "Science of Creativity Poetry",
                                                                "Language Communicative English",
                                                                "Science and Engineering Climatology",
                                                                "Software and Tools	MS Excel",
                                                                "Marketing Social Media Marketing",
                                                                "Business Start-Up",
                                                                "Programming Languages Coding Basics",
                                                                "Programming Languages Basics of Python",
                                                                "Software and Tools	MS-Power Point",
                                                                "Writing Creative Writing",
                                                                "Writing Script Writing",
                                                            ]}
                                                            typeSpeed={40}
                                                            backSpeed={50}
                                                            attr="placeholder"
                                                            loop
                                                            smartBackspace
                                                        >
                                                            <input
                                                                type="text"
                                                                className="form-control mb-2 mr-sm-2"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setSearch(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                style={{
                                                                    fontSize:
                                                                        "1.5rem",
                                                                    width: "100%",
                                                                }}
                                                                onKeyDown={
                                                                    handleKeyDown
                                                                }
                                                            />
                                                        </Typed>
                                                        <button
                                                            type="submit"
                                                            onClick={() =>
                                                                handleSearch()
                                                            }
                                                            className="btn btn-primary"
                                                            style={{
                                                                height: "auto",
                                                                backgroundColor:
                                                                    "transparent",
                                                            }}
                                                        >
                                                            <i
                                                                class="fas fa-search"
                                                                // onClick={
                                                                //     dispatchCourses
                                                                // }
                                                            ></i>
                                                            {/* <span className="flaticon-magnifying-glass"></span> */}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row_style">
                            <svg
                                className="waves"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1000 300"
                                preserveAspectRatio="none"
                            >
                                <path d="M 1000 280 l 2 -253 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -235 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
                                <path d="M 1000 261 l 2 -222 c -157 -43 -312 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -153.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 16.61 v 22.39 z"></path>
                                <path d="M 1000 296 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    className="home3_about home8 pt-140"
                    // style={{ paddingTop: "70px" }}
                >
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-xs-12 col-lg-7 row"
                                style={{ marginLeft: "0px" }}
                            >
                                {/* <div className="row"> */}
                                <div className="col-xs-12 col-sm-6 col-lg-6 p0">
                                    <div className="col-xs-12 col-sm-12 col-lg-12">
                                        <div className="home3_about_icon_box one home8 ">
                                            <div className="details">
                                                <h4>Fuel your passion</h4>
                                                <ul>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Research modelled
                                                        learning approach
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Importance to the basics{" "}
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Deeper you learn, More
                                                        you standout
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        One well-structured
                                                        course for one topic
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Work is the prime
                                                        learning source
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Get skilled, put your
                                                        skills to work by our
                                                        projects and internships
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-xs-12 col-sm-12 col-lg-12">
                                        <div className="home3_about_icon_box three home8">
                                            <div className="details">
                                                <h4>
                                                    Language No More a Barrier
                                                </h4>
                                                <ul>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Explanation in simple
                                                        English
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Non-English native
                                                        accent
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Multi-language subtitles
                                                        for videos
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-lg-6 p0">
                                    <div className="col-xs-12 col-sm-12 col-lg-12">
                                        <div className="home3_about_icon_box two home8">
                                            <div className="details">
                                                <h4>Unlock Courses for free</h4>
                                                <ul>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Give and Take - By
                                                        giving quality content
                                                        on your preferred topic,
                                                        you can earn points
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Refer courses to get
                                                        points
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Get Points for
                                                        Consistency
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Get points for profile
                                                        completeness
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-xs-12 col-sm-12 col-lg-12">
                                        <div className="home3_about_icon_box four home8">
                                            <div className="details">
                                                <h4>Content</h4>
                                                <ul>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        To the point small
                                                        chunks of contents
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Sharp script for each
                                                        module for recollection
                                                        and Understanding
                                                    </li>
                                                    <li>
                                                        <span className="dot">
                                                            &#8226;
                                                        </span>
                                                        Interactive learning
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                            <div className="col-lg-5">
                                <div className="about_home3 home8">
                                    <h3 className="text-thm5">
                                        Our Core Values
                                    </h3>
                                    <h5 className="">
                                        To Unfurl the real purpose of learning
                                    </h5>
                                    <p style={{ color: "black" }}>
                                        Carefully architected for aspirants of
                                        structured and experiential learning
                                        inculcating the dive deep method of
                                        learning. We aim to provide the
                                        learners, Knowledge, employment, and
                                        research relevant learning to horn up
                                        their skills by making them work on
                                        various real-time projects and
                                        internships as a part of the course. We
                                        also make it very affordable by giving
                                        them the option of Giving and taking
                                        knowledge.
                                    </p>
                                    <p style={{ color: "black" }}>
                                        For learners of all age, who seek deep
                                        and experiential learning, take our PEN
                                        in hand
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="main-title text-center mb-0">
                                    <h1 className="text-thm5">Our Focus</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row  justify-content-center">
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/learningapproach.png"
                                            width="100px"
                                            alt="learningapproach.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            Learning Approach
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            Facilitating deep understanding of
                                            basics concepts, going beyond
                                            surface-level knowledge we enhance
                                            the scope of next-level learning and
                                            application of concepts in real-time
                                            projects.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/content.png"
                                            width="100px"
                                            alt="content.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            Contents
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            Simple and clear delivery of
                                            qualitative content. We also provide
                                            Sharp script for easier
                                            understanding and recollection and
                                            thinking Igniting assessments.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/elearning.png"
                                            width="100px"
                                            alt="elearning.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            Interactive learning
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            Workshops and Webinars for Work
                                            feedbacks and for facilitating
                                            networking. Concept checking
                                            questions, Peer review, Discussion
                                            forums are other features if
                                            interactive learning.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/user.png"
                                            width="100px"
                                            alt="user.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            For Users
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            <br></br>
                                            Enhance the inquisitive tendency,
                                            get skilled, increase your demand in
                                            the market. Blends the knowledge of
                                            technical, business, and social
                                            responsibilities.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/goodwill.png"
                                            width="100px"
                                            alt="goodwill.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            Goodwill
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            <br></br>
                                            For each course, we explain the ways
                                            that the learner can contribute back
                                            to the society from the skills they
                                            obtain from that course. We also
                                            offer climate change-related courses
                                            for free to spread awareness and to
                                            be a catalyst to climate action.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className="p-2 col-sm-6 col-lg-3 col-xl-3 m-4 box-shadow-card"
                                    //   style={shadow1}
                                >
                                    <Card.Body
                                        className=""
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            className="logo1 img-fluid"
                                            src="images/userfriendly.png"
                                            width="100px"
                                            alt="userfriendly.png"
                                        />
                                        <br></br>
                                        <br></br>
                                        <h3 className="text-center ">
                                            PEN platform
                                        </h3>
                                        <br></br>
                                        <Card.Text>
                                            Classy user-friendly platform. Mild
                                            colours are being used to give a
                                            smooth learning experience. Inbuilt
                                            Glossary to avoid App switching and
                                            text to speech reader of documents.
                                            Bookmark the courses wherever
                                            needed. Badges, Points, Performance
                                            ladder helps the learners to track
                                            their learning curve.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt60">
                        <div className="col-lg-6">
                            <div className="about_box_home6">
                                <div className="details">
                                    <h3>
                                        Systematic Research modelled learning
                                        approach
                                    </h3>
                                    <p style={{ color: "black" }}>
                                        Research modelled learning enhances
                                        better concept understanding, deep
                                        knowledge on application of the concepts
                                        and contents of the courses ignites
                                        deductive thinking on any speciality.
                                        The probability of getting side-tracked
                                        by less relevant concepts can be
                                        minimized.
                                    </p>
                                    <ul style={{ color: "black" }}>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            Origins of the concept
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            Clear Cut understanding on the
                                            basics
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            Going beyond the surface level
                                            knowledge
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            Cultivate Mindset on deep learning
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            How the concept is used in the
                                            industry
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            How does the concept applicable to
                                            next level learning?
                                        </li>
                                        <li>
                                            <span
                                                className="dot"
                                                style={{
                                                    marginLeft: "0px",
                                                    paddingRight: "0.7rem",
                                                }}
                                            >
                                                &#8226;
                                            </span>
                                            Aim of learning is its application
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_box_home7">
                                <div className="thumb">
                                    <img
                                        className="img-fluid img-rounded"
                                        src="images/about/11.jpg"
                                        alt="1.jpg"
                                        style={{ paddingTop: "70px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt60">
                        <div className="col-lg-6">
                            <div className="about_box_home7">
                                <div className="thumb">
                                    <img
                                        className="img-fluid img-rounded"
                                        src="images/about/12.jpg"
                                        alt="1.jpg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-6"
                            style={{ paddingTop: "25px" }}
                        >
                            <div className="about_box_home6">
                                <div className="details">
                                    <h3>Give and Take</h3>
                                    <p style={{ color: "black" }}>
                                        What is the use of sharing the things
                                        which I already know? The answer is
                                        simple you will learn more. Sorry did I
                                        read wrongly! No
                                    </p>
                                    <p style={{ color: "black" }}>
                                        When we share knowledge, we will get to
                                        know the answers that we missed figuring
                                        out.
                                    </p>
                                    <p style={{ color: "black" }}>
                                        In Pen as an attempt to promote sharing
                                        knowledge, we provide points for the
                                        learners who gives quality content on
                                        various topics. They can unlock their
                                        preferred courses using the points
                                    </p>
                                    <p
                                        style={{
                                            color: "black",
                                            fontWeight: "bolder",
                                            marginTop: "2rem",
                                        }}
                                    >
                                        <Link to="/giveandtake">
                                            Happy Giving and Taking
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Home;
