import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import WebsiteDescription from "./WebsiteDescription";
import UserContext from "../contexts/UserContext";

const Login = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === false) {
      return;
    }
    const referrer = location.state ? location.state.from : "/";
    history.push(referrer);
  }, [history, location.state, isAuthenticated]);

  const handleGoogleAuth = (response) => {
    props.studentService.login(response.tokenId, setIsAuthenticated);
  };

  return (
    <Container className="page">
      <Row>
        <Col className="content-container text-center">
          <WebsiteDescription />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleAuth}
            onFailure={() => {}}
            isSignedIn={true}
            buttonText="Sign in with Google"
            theme="dark"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
