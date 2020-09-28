import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";

import QuestionsPage from "./components/QuestionsPage";
import Header from "./components/Header";
import Registration from "./components/Registration";
import StudentService from "./services/StudentService";
import SingleQuestionPage from "./components/SingleQuestionPage";
import QuestionsService from "./services/QuestionsService";

function App() {
  const studentService = new StudentService();
  const questionsService = new QuestionsService();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Fragment>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <Container>
        <Router>
          <Header isAuthenticated={isAuthenticated} />
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
          <Route
            key="questionsPage"
            path="/questions"
            render={() => <QuestionsPage questionsService={questionsService} />}
          />
          <Route
            key="singleQuestion"
            path="/question/:id"
            render={() => <SingleQuestionPage />}
          />
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
