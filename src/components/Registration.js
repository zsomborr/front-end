import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import Username from "./form/Username";
import Password from "./form/Password";

const Registration = (props) => {
  const studentService = props.studentService;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Registration</p>
          <Form>
            <Username setUsername={setUsername} />

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

            <Password setPassword={setPassword} />

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
