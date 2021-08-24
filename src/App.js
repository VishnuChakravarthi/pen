import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/DashboardStats/Home";
import Users from "./components/Users/Users";
import ViewUser from "./components/Users/ViewUser";
import EditUser from "./components/Users/EditUser";
import AddUser from "./components/Users/AddUser";
import Courses from "./components/Courses/Courses";
import ViewCourse from "./components/Courses/ViewCourse";
import AddCourse from "./components/Courses/AddCourse/AddCourse";
import EditCourse from "./components/Courses/EditCourses/EditCourse";
import Categories from "./components/Categories/Categories";
import Quiz from "./components/Quiz/Quiz";
import ViewQuiz from "./components/Quiz/ViewQuiz";
import AddQuiz from "./components/Quiz/AddQuiz";
import FeedBack from "./components/Feedbacks/Feedback";
import Report from "./components/Report";
import Orders from "./components/Order/Orders";
import Settings from "./components/Settings/Settings";
import GiveAndTake from "./components/GiveAndTake/GiveAndTake";
import ViewGive from "./components/GiveAndTake/ViewGive";
import TakeCourse from "./components/TakeCourse";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Partials/Sidebar";
import Navbar from "./components/Partials/Navbar";
import ArchivedCourses from "./components/Courses/ArchivedCourses";
import AddQuestions from "./components/Quiz/AddQuestions";
import Export from "./components/Export";
import CourseNotify from "./components/CourseNotify.js/CourseNotify";

function isAuthenticated() {
  return localStorage.getItem("Token") ? true : false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
const App = () => {
  const [feedLength, setFeedLength] = useState(0);
  const token = localStorage.getItem("Token");

  return (
    <div id="wrapper">
      <Router>
        {token && (
          <>
            <Navbar search={true} />
            <Sidebar feedLength={feedLength} />
          </>
        )}
        <Switch>
          <PrivateRoute path="/take-courses" component={TakeCourse} />
          <PrivateRoute path="/view-give" component={ViewGive} />
          <PrivateRoute path="/course-notify" component={CourseNotify} />
          <PrivateRoute
            path="/give-and-take"
            component={() => <GiveAndTake setFeedLength={setFeedLength} />}
          />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/report" component={Report} />
          <PrivateRoute path="/feedback" component={FeedBack} />
          <PrivateRoute path="/add-quiz" component={AddQuiz} />
          <PrivateRoute path="/view-quiz" component={ViewQuiz} />
          <PrivateRoute path="/quiz" component={Quiz} />
          <PrivateRoute path="/course-categories" component={Categories} />
          <PrivateRoute path="/add-course" component={AddCourse} />
          <PrivateRoute path="/edit-course" component={EditCourse} />
          <PrivateRoute path="/view-course" component={ViewCourse} />
          <PrivateRoute path="/courses" component={Courses} />
          <PrivateRoute path="/view-user" component={ViewUser} />
          <PrivateRoute path="/edit-user/:id" component={EditUser} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/add-user" component={AddUser} />
          <PrivateRoute path="/archived" component={ArchivedCourses} />
          <PrivateRoute path="/add-questions" component={AddQuestions} />
          <PrivateRoute path="/export" component={Export} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
