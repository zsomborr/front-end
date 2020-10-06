import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
    const students = await props.mentorService.filterBy(techs, projects);
    setUsers(students);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await props.mentorService.getAll();
      setUsers(response.data);
      const tags = await tagService.getAllTags();
      const techs = [];
      const projects = [];
      tags.technologyTags.map((tech) =>
        techs.push({ label: tech["technologyTag"], value: tech["id"] })
      );
      tags.projectTags.map((project) =>
        projects.push({ label: project["projectTag"], value: project["id"] })
      );
      setTechnologies(techs);
      setProjects(projects);
    };
    getData();
  }, [props.mentorService, tagService]);

  if (users === undefined || users.length === 0) {
    return (
      <Container className="page">
        <Row className="content-container">
          <Col>No user was found</Col>
        </Row>
      </Container>
    );
  }

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
              <Button onClick={search}>Search</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {users.map((user) => {
                return (
                  <Row>
                    <Col sm={2} className="text-center">
                      <Image
                        className="img-fluid img-thumbnail rounded-circle border"
                        src="/feka.png"
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMentorPage;
