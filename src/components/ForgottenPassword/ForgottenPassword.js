import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import WebsiteDescription from "../WebsiteDescription";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import Noty from "noty";

const ForgottenPassword = ({ studentService }) => {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const asError = (message) => {
    setErrorMessages((errorMessages) => [...errorMessages, message]);
  };

  const handleForgottenPassword = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!form.current.reportValidity()) {
      return;
    }

    try {
      let payload = { email: email };
      setLoading(true);
      await studentService.forgottenPassword(payload);
      setEmailSent(true);
      new Noty({
        text: `Email was sent to ${email}`,
        type: "success",
      }).show();
    } catch (e) {
      asError(e.response.data.message);
    }
    setLoading(false);
  };

  const saveNewPassword = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!form.current.reportValidity()) {
      return;
    }
    try {
      let payload = {
        email: email,
        code: emailCode,
        password1: password1,
        password2: password2,
      };
      setLoading(true);
      await studentService.saveNewPassword(payload);
      setEmailSent(false);
      new Noty({
        text: "New password saved.",
        type: "success",
      }).show();
      history.push("/");
    } catch (e) {
      asError(e.response.data.message);
    }
    setLoading(false);
  };

  const form = React.createRef();

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <p className="h2">Forgotten password</p>
          {errorMessages.map((message, index) => (
            <Alert
              key={`loginError-${index}`}
              variant="danger"
              className="text-center text-lg-left"
            >
              {message}
            </Alert>
          ))}
          {emailSent ? (
            <PasswordForm
              form={form}
              setPassword1={setPassword1}
              setPassword2={setPassword2}
              isLoading={isLoading}
              handleSubmit={saveNewPassword}
              setEmailCode={setEmailCode}
            />
          ) : (
            <EmailForm
              setEmail={setEmail}
              form={form}
              handleSubmit={handleForgottenPassword}
              isLoading={isLoading}
            />
          )}
        </Col>
        <Col xs={12} lg={6} className="content-container text-center">
          <WebsiteDescription />
        </Col>
      </Row>
    </Container>
  );
};

export default ForgottenPassword;
