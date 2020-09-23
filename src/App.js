import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <div>
      <Router>
        <Route
          key="registration"
          path="/registration"
          render={() => <Registration />}
        ></Route>
        <Route key="login" path="/login" render={() => <Login />}></Route>
      </Router>
    </div>
  );
}

export default App;
