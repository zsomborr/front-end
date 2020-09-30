import React, { Fragment } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import QuestionsPage from "./components/QuestionsPage";
import Header from "./components/Header";
import Registration from "./components/Registration";
import StudentService from "./services/StudentService";
import SingleQuestionPage from "./components/SingleQuestionPage";
import QuestionsService from "./services/QuestionsService";
import { UserContextProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchMentorPage from "./components/SearchMentorPage";

function App() {
  axios.defaults.withCredentials = true;
  const studentService = new StudentService();
  const questionsService = new QuestionsService();

  return (
    <Fragment>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <Container>
        <Router>
          <UserContextProvider>
            <Header />
            <Route
              key="registration"
              path="/registration"
              render={() => <Registration studentService={studentService} />}
            ></Route>
            <Route
              key="login"
              path="/login"
              render={() => <Login studentService={studentService} />}
            ></Route>
            <ProtectedRoute
              key="questionsPage"
              path="/questions"
              component={(props) => (
                <QuestionsPage questionsService={questionsService} {...props} />
              )}
            />
            <ProtectedRoute
              key="singleQuestion"
              path="/question/:id"
              render={() => <SingleQuestionPage />}
            />
            <ProtectedRoute
              key="searchMentors"
              path="/mentors"
              render={() => <SearchMentorPage />}
            />
          </UserContextProvider>
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
