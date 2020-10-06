import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";

const PublicUserPage = (props) => {
  const studentService = props.studentService;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    module: null,
    technologyTags: [],
    projectTags: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await studentService.getUserDataById(
        props.match.params.id
      );
      setUser(response.data);
    };
    getData();
  }, [props.match.params.id, studentService]);

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
                    {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Country: </strong>
                    {user.country ? user.country : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>City: </strong>
                    {user.city ? user.city : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>Module: </strong>
                    {user.module ? user.module : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>Technologies</strong> I can help with:
                  </p>
                  <p>
                    {user.technologyTags.map((tech) => {
                      return (
                        <Badge
                          key={`technology-${tech.id}`}
                          variant="primary"
                          className="badge-pill ml-1"
                        >
                          {tech.technologyTag}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Projects</strong> I can help with:
                  </p>
                  <p>
                    {user.projectTags.map((project) => {
                      return (
                        <Badge
                          key={`project-${project.id}`}
                          variant="danger"
                          className="badge-pill ml-1"
                        >
                          {project.projectTag}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Contact</strong> me here:
                  </p>
                  <Col>
                    <Row className="d-none discordTag mt-2 text-right rounded-pill">
                      <Col className="text-left" xs={3} sm={3}>
                        <Image
                          className="emailImage "
                          src="/discord-logo.webp"
                          alt="Discord"
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
                        {user.discord}
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
                        {user.email}
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
