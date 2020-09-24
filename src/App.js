import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import QuestionsPage from "./components/QuestionsPage";
import Registration from "./components/Registration";
import StudentService from "./services/StudentService";
import SingleQuestionPage from "./components/SingleQuestionPage";

function App() {
  const studentService = new StudentService();
  return (
    <div>
      <Router>
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
          render={() => <QuestionsPage />}
        />
        <Route
          key="singleQuestion"
          path="/question/:id"
          render={() => <SingleQuestionPage />}
        />
      </Router>
    </div>
  );
}

export default App;
