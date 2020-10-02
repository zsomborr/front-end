import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";

const PublicUserPage = (props) => {
  const studentService = props.studentService;
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getData = async () => {
      const userdata = await studentService.getUserDataById(
        props.match.params.id
      );
      setUserData(userdata);
    };
    getData();
  }, []);

  console.log("userData", userData);
  if (userData === undefined) {
    return (
      <Container className="page">
        <Row className="content-container">
          <Col></Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="page">
      <Row className="content-container">
        <Col sm={5}>
          <Row>
            <Col>
              <Row>
                <Col className="text-center">
                  <Image
                    className="img-fluid img-thumbnail rounded-circle border"
                    src="/missing-profile-pic.jpg"
                    alt="Profile"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="content-container">
                  <p>
                    Name: {userData["user-data"].firstName}{" "}
                    {userData["user-data"].lastName}
                  </p>
                  <p>Country: {userData["user-data"].country}</p>
                  <p>City: {userData["user-data"].city}</p>
                  <p>Module: {userData["user-data"].module}</p>
                  <p>Technologies I can help with:</p>
                  <p>
                    {userData.tags.technologies.map((tech) => {
                      return (
                        <Badge variant="primary" className="badge-pill ml-1">
                          {tech}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>Projects I can help with:</p>
                  <p>
                    {userData.tags.projects.map((project) => {
                      return (
                        <Badge variant="danger" className="badge-pill ml-1">
                          {project}
                        </Badge>
                      );
                    })}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={7}>
          <Row>
            <Col className="h4 text-center">Reviews</Col>
          </Row>
          <Row>
            <Col className="h4 text-center">Contacts</Col>
          </Row>
          <Row className="discordTag mt-1 text-right">
            <Col className="h3">Szpoti#6969</Col>
          </Row>
          <Row className="emailTag mt-2 text-right">
            <Col className="h3">balage.farago@gmail.com</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicUserPage;
