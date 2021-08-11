import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Navbar from "./components/Navbar/navbar";

import Home from "./components/Home";

import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import CustomerFeedback from "./components/Feedback/CustomerFeedback";

import AllCourses from "./components/Courses/AllCourses";
import FreeCourses from "./components/Courses/FreeCourses";
import SearchCourses from "./components/Courses/SearchCourses";
import SelectPlan from "./components/Buy/SelectPlan";
import SingleCourse from "./components/Courses/SingleCourse";
import Schedule from "./components/Courses/CourseSchedule";

import Wishlist from "./components/Wishlist";
import Cart from "./components/cart";
import Checkout from "./components/Checkout";

import Syllabus from "./components/Learning/Syllabus";
import Assessments from "./components/Learning/Assessments";
import Discussion from "./components/Learning/Discussion";
import Bookmark from "./components/Learning/Bookmark";
import Leaderboard from "./components/Learning/Leaderboard";
import Quiz from "./components/Learning/Assessments/Quiz";

import GiveandTake from "./components/GiveAndTake/index.js";

import Footer from "./components/Footer/index.js";
import ResultDisplay from "./components/Learning/Assessments/Quiz/ResultDisplay.js";
import CategoryCourses from "./components/Courses/CategoryCourses";
import Register from "./components/User/Register";
import Learning from "./components/Learning";
import ResetPassword from "./components/User/ResetPassword";
import Replies from "./components/Learning/Discussion/Replies";
import IVMStest from "./components/IVMStest";

function App() {
    // const location = useLocation();

    return (
        <Router history={history}>
            <div className="wrapper">
                <Navbar />
                <Switch>
                    {/* --------------------USER ROUTE----------------- */}

                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/wishlist" exact component={Wishlist} />

                    {localStorage.getItem("pn_en") &&
                    localStorage.getItem("resusid") &&
                    localStorage.getItem("res_us") ? (
                        <Route path="/profile" exact component={Profile} />
                    ) : null}
                    <Route
                        path="/feedback"
                        exact
                        component={CustomerFeedback}
                    />

                    {/*----------------- COURSE ROUTES ------------------------- */}
                    <Route
                        path="/courses"
                        render={(props) => <AllCourses {...props} />}
                        exact
                    />
                    <Route path="/courses/free" exact component={FreeCourses} />
                    <Route
                        path="/courses/:search"
                        exact
                        component={SearchCourses}
                    />
                    <Route
                        path="/courses/category/:category_id"
                        exact
                        component={CategoryCourses}
                    />
                    <Route path="/course/:id" exact component={SingleCourse} />
                    <Route
                        path="/schedule/:course_id"
                        exact
                        component={Schedule}
                    />
                    <Route path="/buy/:id" exact component={SelectPlan} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/checkout" exact component={Checkout} />

                    {/* --------------GIVE AND TAKE ROUTES-------------- */}
                    <Route path="/giveandtake" exact component={GiveandTake} />

                    {/* ----------------COURSE TAKING ROUTES-------------- */}
                    <Route
                        path="/learn/:course_id/lesson/:lesson_id"
                        exact
                        component={Learning}
                    />
                    <Route
                        path="/learn/:course_id/syllabus"
                        exact
                        component={Syllabus}
                    />
                    <Route
                        path="/learn/:course_id/assessment"
                        exact
                        component={Assessments}
                    />
                    <Route
                        path="/learn/:course_id/leaderboard"
                        exact
                        component={Leaderboard}
                    />
                    <Route
                        path="/learn/:course_id/bookmark"
                        exact
                        component={Bookmark}
                    />
                    <Route
                        path="/learn/:course_id/discussion"
                        exact
                        component={Discussion}
                    />
                    <Route
                        path="/learn/:course_id/discussion/:discuss_id"
                        exact
                        component={Replies}
                    />
                    <Route
                        path="/learn/:course_id/assessment/:asses_id"
                        exact
                        component={Quiz}
                    />
                    <Route
                        path="/learn/:course_id/assessment/:asses_id/result"
                        exact
                        component={ResultDisplay}
                    />

                    <Route
                        path="/password/reset/:token"
                        exact
                        component={ResetPassword}
                    />

                    {/* <Route path="/sign" exact component={IVMStest} /> */}

                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
