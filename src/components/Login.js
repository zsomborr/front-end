import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Alert,
  Container,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import WebsiteDescription from "./WebsiteDescription";

const Login = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.studentService.login(email, password);
      history.push("/questions");
    } catch (e) {
      if (e.response.status === 403) {
        setErrorMessage("Invalid email or password!");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={6}>
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
            <Form.Label htmlFor="email" srOnly>
              Email address
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fa fa-lock" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="password"
                type={passwordType}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Prepend
                className="passwordIconHover"
                onClick={togglePassword}
              >
                <InputGroup.Text>
                  <i className="fa fa-eye password-icon" />
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
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
            <p>
              or <Link to={"/"}>back to home page</Link>.
            </p>
          </Form>
        </Col>
        <Col xs={12} lg={6} className="text-center">
          <WebsiteDescription />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
