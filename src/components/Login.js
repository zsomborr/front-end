import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Alert, Container, Col, Button, Form, Row } from "react-bootstrap";
import WebsiteDescription from "./WebsiteDescription";
import Username from "./form/Username";
import Password from "./form/Password";
import ValidationService from "../services/ValidationService";
import UserContext from "../contexts/UserContext";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const form = React.createRef();
  const validator = new ValidationService();

  const asError = (message) => {
    setErrorMessages((errorMessages) => [...errorMessages, message]);
  };

  const isFormValid = () => {
    let isValid = true;
    if (!validator.isValidUsername(username)) {
      asError("Username should contain only English letters and _ character!");
      isValid = false;
    }

    if (!validator.isValidPassword(password)) {
      asError(
        "Invalid password! It should contain at least one digit, one upper and lower case letter, and one of the following special characters: !@#$%&*()-+=^"
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!form.current.reportValidity()) {
      return;
    }

    if (!isFormValid()) {
      return false;
    }

    try {
      await props.studentService.login(username, password, setIsAuthenticated);
    } catch (e) {
      if (e.response && e.response.status === 403) {
        asError("Invalid username or password!");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      return;
    }
    const referrer = location.state ? location.state.from : "/";
    history.push(referrer);
  }, [history, location.state, isAuthenticated]);

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Login</p>

          {errorMessages.map((message, index) => (
            <Alert
              key={`loginError-${index}`}
              variant="danger"
              className="text-center text-lg-left"
            >
              {message}
            </Alert>
          ))}

          <Form ref={form}>
            <Username setUsername={setUsername} />

            <Password setPassword={setPassword} />

            <Button
              variant="primary"
              type="submit"
              className="mb-2 mr-sm-2"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <p>
              Don’t have an account yet?
              <Link to={"/registration"}> Register now!</Link>
            </p>
          </Form>
        </Col>
        <Col xs={12} lg={6} className="content-container text-center">
          <WebsiteDescription />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
