import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import Username from "./form/Username";
import Password from "./form/Password";
import ValidationService from "../services/ValidationService";

const Registration = (props) => {
  const studentService = props.studentService;
  const validator = new ValidationService();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const form = React.createRef();

  const asError = (message) => {
    setErrorMessages((errorMessages) => [...errorMessages, message]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.current.reportValidity()) {
      return;
    }

    setErrorMessages([]);
    if (!isFormValid()) {
      return;
    }

    try {
      await studentService.registration(
        firstName,
        lastName,
        username,
        email,
        password
      );
      setErrorMessages([]);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        asError(e.response.data);
      }
    }
  };

  const isFormValid = () => {
    let isValid = true;
    if (!validator.isValidUsername(username)) {
      asError("Username should contain only English letters and _ character!");
      isValid = false;
    }

    if (!validator.isValidFirstName(firstName)) {
      asError("First name should contain only English letters!");
      isValid = false;
    }

    if (!validator.isValidLastName(lastName)) {
      asError("Last name should contain only English letters!");
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

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Registration</p>

          {errorMessages.map((message, index) => (
            <Alert
              key={`registrationError-${index}`}
              variant="danger"
              className="text-center text-lg-left"
            >
              {message}
            </Alert>
          ))}

          <Form ref={form}>
            <Username setUsername={setUsername} />

            <Form.Label htmlFor="firstname" srOnly>
              First Name
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="firstname"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                minLength="2"
                maxLength="20"
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
                minLength="2"
                maxLength="20"
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
                type="email"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                minLength="6"
                maxLength="50"
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
