import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import WebsiteDescription from "./WebsiteDescription";

const Registration = (props) => {
  const studentService = props.studentService;
  const history = useHistory();
  const [passwordType, setPasswordType] = useState("password");
  const [username, setUsernameState] = useState("");
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [firstName, setFirstNameState] = useState("");
  const [lastName, setLastNameState] = useState("");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const setFirstName = (value) => {
    setFirstNameState(value);
  };

  const setLastName = (value) => {
    setLastNameState(value);
  };

  const setUsername = (value) => {
    setUsernameState(value);
  };

  const setEmail = (value) => {
    setEmailState(value);
  };

  const setPassword = (value) => {
    setPasswordState(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    validData(firstName, lastName, username, email, password)
      ? await studentService.registration(
          firstName,
          lastName,
          username,
          email,
          password
        )
      : console.log("failed to register");
  };

  const validData = (firstName, lastName, username, email, password) => {
    if (
      username === undefined ||
      email === undefined ||
      password === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      username === "" ||
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      return false;
    }

    if (/\d/.test(String(firstName)) || /\d/.test(String(lastName))) {
      return false;
    }

    if (!validateEmail(email)) {
      return false;
    }

    return true;
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {}, []);

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Registration</p>
          <Form>
            <Form.Label htmlFor="username" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>

            <Form.Label htmlFor="firstname" srOnly>
              First Name
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="firstname"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </InputGroup>

            <Form.Label htmlFor="lastname" srOnly>
              Last Name
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="lastname"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </InputGroup>

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
                required
              />
            </InputGroup>

            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="password"
                type={passwordType}
                placeholder="Password"
                minLength="8"
                required
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
              onClick={handleRegister}
            >
              Registration
            </Button>
          </Form>
        </Col>
        <Col xs={12} lg={6} className="content-container text-center">
          <WebsiteDescription />
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
