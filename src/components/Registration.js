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

const Registration = (props) => {
  const authService = props.authService;
  const history = useHistory();
  const [passwordType, setPasswordType] = useState("password");
  const [nickname, setNicknameState] = useState("");
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

  const setNickname = (value) => {
    setNicknameState(value);
  };

  const setEmail = (value) => {
    setEmailState(value);
  };

  const setPassword = (value) => {
    setPasswordState(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    validData(firstName, lastName, nickname, email, password)
      ? console.log("registered")
      : console.log("failed to register");

    //await authService.Registration(nickname, email, password);
  };

  const validData = (firstName, lastName, nickname, email, password) => {
    if (
      nickname === undefined ||
      email === undefined ||
      password === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      nickname === "" ||
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
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-4 text-center">
          <p className="h2">Registration</p>
          <Form>
            <Form.Label htmlFor="nickname" srOnly>
              Nickname
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="nickname"
                placeholder="Nickname"
                onChange={(e) => setNickname(e.target.value)}
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
      </Row>
    </Container>
  );
};

export default Registration;
