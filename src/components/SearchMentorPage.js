import React, { useEffect, useState } from "react";
import { Alert, Badge, Col, Container, Image, Row } from "react-bootstrap";
import AnimatedButton from "./form/AnimatedButton";
import { Link } from "react-router-dom";
import MultiSelect from "react-multi-select-component";

const SearchMentorPage = (props) => {
  const tagService = props.tagService;
  const [users, setUsers] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const search = async () => {
    const techs = [];
    const projects = [];
    selectedTechs.map((tech) =>
      techs.push({ technologyTag: tech.label, id: tech.value })
    );
    selectedProjects.map((project) =>
      projects.push({ projectTag: project.label, id: project.value })
    );
    const response = await props.mentorService.filterBy(techs, projects);
    setUsers(response.data);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await props.mentorService.getAll();
      setUsers(response.data);
      const tagsResponse = await tagService.getAllTags();
      const techs = [];
      const projects = [];
      tagsResponse.data.technologyTags.map((tech) =>
        techs.push({ label: tech["technologyTag"], value: tech["id"] })
      );
      tagsResponse.data.projectTags.map((project) =>
        projects.push({ label: project["projectTag"], value: project["id"] })
      );
      setTechnologies(techs);
      setProjects(projects);
    };
    getData();
  }, [props.mentorService, tagService]);

  return (
    <Container className="page">
      <Row className="content-container">
        <Col>
          <Row className="mb-2">
            <Col sm={5}>
              <MultiSelect
                className="mb-2"
                options={technologies}
                value={selectedTechs}
                onChange={setSelectedTechs}
                labelledBy={"Select a technology"}
                hasSelectAll={false}
                shouldToggleOnHover={true}
                overrideStrings={{
                  selectSomeItems: "Select a technology to filter",
                }}
              />
            </Col>
            <Col sm={5}>
              <MultiSelect
                options={projects}
                value={selectedProjects}
                onChange={setSelectedProjects}
                labelledBy={"Select a Project"}
                hasSelectAll={false}
                shouldToggleOnHover={true}
                overrideStrings={{
                  selectSomeItems: "Select a project to filter",
                }}
              />
            </Col>
            <Col className="text-right">
              <AnimatedButton icon={["fas", "search"]} onClick={search}>
                Search
              </AnimatedButton>
            </Col>
          </Row>
          <Row>
            <Col>
              {users.map((user) => {
                return (
                  <Row key={user.id}>
                    <Col sm={2} className="text-center">
                      <Image
                        className="img-fluid img-thumbnail rounded-circle border"
                        src="/missing-profile-pic.jpg"
                        alt="Profile"
                      />
                    </Col>
                    <Col className="content-container" sm={10}>
                      <Row>
                        <Col>
                          <Link to={`/user/${user.id}`} className="h5">
                            {user.firstName} {user.lastName}
                          </Link>
                        </Col>
                        <Col sm={4} className="mt-1">
                          {user.technologyTags.map((tech) => {
                            return (
                              <Badge
                                key={`user-${user.id}-tech-${tech.id}`}
                                variant="primary"
                                className="badge-pill float-right ml-1"
                              >
                                {tech.technologyTag}
                              </Badge>
                            );
                          })}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
              {users.length === 0 ? (
                <Alert variant="info" className="mt-1">
                  No mentors found.
                </Alert>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMentorPage;
