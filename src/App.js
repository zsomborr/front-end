import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      </Router>
    </div>
  );
}

export default App;
