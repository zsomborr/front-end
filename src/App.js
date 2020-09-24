import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      </Router>
    </div>
  );
}

export default App;
