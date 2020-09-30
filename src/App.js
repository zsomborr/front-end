import React, { Fragment, useEffect, useState } from "react";
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
import AnswerService from "./services/AnswerService";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchMentorPage from "./components/SearchMentorPage";

function App() {
  axios.defaults.withCredentials = true;
  const studentService = new StudentService();
  const questionsService = new QuestionsService();
  const answerService = new AnswerService();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsAuthenticated(await studentService.isAuthenticated());
      setIsLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, studentService]);

  if (isLoading) {
    return (
      <Fragment>
        <div className="background">
          <div></div>
          <div></div>
        </div>
        <div>
          <img
            class="spinning-image"
            src="https://journey.code.cool/static/assets/favicon/apple-touch-icon-180x180.png?version=v1.1.0-local-AJA3231O"
            alt="Loading indicator"
          />
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <Container>
        <Router>
          <UserContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
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
              component={(props) => (
                <SingleQuestionPage
                  questionsService={questionsService}
                  answerService={answerService}
                  {...props}
                />
              )}
            />
            <Route
              key="searchMentors"
              path="/mentors"
              component={() => <SearchMentorPage />}
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
