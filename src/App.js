import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import QuestionPage from "./components/QuestionsPage";
import Registration from "./components/Registration";
import StudentService from "./services/StudentService";

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
          render={() => <QuestionPage />}
        />
      </Router>
    </div>
  );
}

export default App;
