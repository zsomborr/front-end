import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Col, Button, Form, Row } from "react-bootstrap";
import WebsiteDescription from "./WebsiteDescription";
import Username from "./form/Username";
import Password from "./form/Password";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.studentService.login(username, password);
      history.push("/");
    } catch (e) {
      if (e.response.status === 403) {
        setErrorMessage("Invalid email or password!");
      }
    }
  };

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Login</p>
          {0 < errorMessage.length && (
            <Alert
              key="searchBarError"
              variant="danger"
              className="text-center text-lg-left"
            >
              {errorMessage}
            </Alert>
          )}
          <Form>
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
