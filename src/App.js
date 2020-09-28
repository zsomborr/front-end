import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Registration from "./components/Registration";
import StudentService from "./services/StudentService";

function App() {
  const studentService = new StudentService();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Fragment>
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
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
