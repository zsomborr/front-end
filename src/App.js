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
import AnswerService from "./services/AnswerService";
import { UserContextProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  axios.defaults.withCredentials = true;
  const studentService = new StudentService();
  const questionsService = new QuestionsService();
  const answerService = new AnswerService();

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
              component={(props) => (
                <SingleQuestionPage
                  questionsService={questionsService}
                  answerService={answerService}
                  {...props}
                />
              )}
            />
          </UserContextProvider>
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
