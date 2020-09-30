import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const SearchMentorPage = () => {
  const [users, setUsers] = useState([]);

  const sampleUsers = [
    {
      profilePicture: "/ződ.png",
      userId: "1",
      firstName: "Zöld",
      lastName: "Zoli",
      username: "zöld",
      technologies: ["React"],
    },
    {
      profilePicture: "/nari.png",
      userId: "2",
      firstName: "Narancs",
      lastName: "Nándi",
      username: "nari",
      technologies: ["React", "C#", "Javascript"],
    },
    {
      profilePicture: "/feka.png",
      userId: "3",
      firstName: "Fekete",
      lastName: "Feri",
      username: "feka",
      technologies: ["Java", "Spring"],
    },
    {
      profilePicture: "/sari.png",
      userId: "4",
      firstName: "Sárga",
      lastName: "Sára",
      username: "sari",
      technologies: ["C#", "ASP.Net"],
    },
  ];

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  return (
    <Container className="page">
      <Row className="content-container">
        <Col>
          {users.map((user) => {
            return (
              <Row>
                <Col sm={2} className="text-center">
                  <Image
                    className="img-fluid img-thumbnail rounded-circle border"
                    src={user.profilePicture}
                    alt="Profile"
                  />
                </Col>
                <Col className="content-container" sm={10}>
                  <Row>
                    <Col>
                      <Link to={`/user/${user.userId}`} className="h5">
                        {user.firstName} {user.lastName}
                      </Link>
                    </Col>
                    <Col sm={4} className="mt-1">
                      {user.technologies.map((tech) => {
                        return (
                          <Badge
                            variant="primary"
                            className="badge-pill float-right ml-1"
                          >
                            {tech}
                          </Badge>
                        );
                      })}
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMentorPage;
