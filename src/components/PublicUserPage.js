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
        <Col md={12} lg={5}>
          <Row className="d-flex align-items-end">
            <Col>
              <Row>
                <Col xs={3} sm={3}></Col>
                <Col xs={6} sm={6} className="text-center">
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
                    <strong>Name: </strong>
                    {userData["user-data"].firstName}{" "}
                    {userData["user-data"].lastName}
                  </p>
                  <p>
                    <strong>Country: </strong>
                    {userData["user-data"].country}
                  </p>
                  <p>
                    <strong>City: </strong>
                    {userData["user-data"].city}
                  </p>
                  <p>
                    <strong>Module: </strong>
                    {userData["user-data"].module}
                  </p>
                  <p>
                    <strong>Technologies</strong> I can help with:
                  </p>
                  <p>
                    {userData.tags.technologies.map((tech) => {
                      return (
                        <Badge variant="primary" className="badge-pill ml-1">
                          {tech}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Projects</strong> I can help with:
                  </p>
                  <p>
                    {userData.tags.projects.map((project) => {
                      return (
                        <Badge variant="danger" className="badge-pill ml-1">
                          {project}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Contact</strong> me here:
                  </p>
                  <Col>
                    <Row className="discordTag mt-2 text-right rounded-pill">
                      <Col className="text-left" xs={3} sm={3}>
                        <Image
                          className="emailImage "
                          src="/discord-logo.webp"
                          alt="Gmail"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        sm={9}
                        className="text-right align-self-center font-weight-bold"
                        style={{
                          wordWrap: "break-word",
                          fontSize: "100%",
                        }}
                      >
                        {userData["user-data"].discord}
                      </Col>
                    </Row>
                    <Row className="emailTag mt-2 text-right rounded-pill">
                      <Col className="text-left" xs={3} sm={3}>
                        <Image
                          className="emailImage "
                          src="/gmail-logo.png"
                          alt="Gmail"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        sm={9}
                        className="text-right align-self-center font-weight-bold"
                        style={{
                          wordWrap: "break-word",
                          fontSize: "100%",
                        }}
                      >
                        {userData["user-data"].email}
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="h4 text-center">Reviews</Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicUserPage;
