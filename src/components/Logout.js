import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import UserContext from "../contexts/UserContext";

const Logout = (props) => {
  const [, setIsAuthenticated] = useContext(UserContext);
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        await props.studentService.logOut();
        setIsAuthenticated(false);
        history.push("/login");
      } catch (e) {
        setIsSuccess(false);
      }
    };
    sendRequest();
  }, [history, props.studentService, setIsAuthenticated]);

  if (isSuccess) {
    return null;
  }

  return (
    <Container className="page">
      <Row>
        <Col className="content-container pb-0">
          <Alert variant="danger" className="text-center">
            Couldn't log out You.
            <span onClick={history.goBack} className="a mx-1">
              Click here
            </span>
            to go back to the previous page.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
