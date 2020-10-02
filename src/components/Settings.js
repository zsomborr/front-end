import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import DeletableTag from "./form/DeletableTag";
import TagAutoComplete from "./form/TagAutoComplete";

const Settings = (props) => {
  const [userTechnologies, setUserTechnologies] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const requestData = async () => {
      const unwrap = (source, columnName) => {
        const result = [];
        source.forEach((item) => result.push(item[columnName]));
        return result;
      };
      const response = await props.studentService.getSettingsDetails();
      setUserProjects(unwrap(response.data.projectTags, "projectTag"));
      setUserTechnologies(
        unwrap(response.data.technologyTags, "technologyTag")
      );

      setProjects(unwrap(response.data.allProjectTags, "projectTag"));
      setTechnologies(unwrap(response.data.allTechnologyTags, "technologyTag"));
    };

    requestData();
  }, [props.studentService]);

  const handleProjectDelete = (name) => {
    const sendRequest = async () => {
      await props.studentService.removeProject(name);
      setUserProjects(userProjects.filter((project) => project !== name));
    };
    sendRequest();
  };

  const handleTechnologyDelete = (name) => {
    const sendRequest = async () => {
      await props.studentService.removeTechnology(name);
      setUserTechnologies(
        userTechnologies.filter((technology) => technology !== name)
      );
    };
    sendRequest();
  };

  const handleAddProject = (name) => {
    const sendRequest = async () => {
      await props.studentService.addProject(name);
      if (!projects.includes(name)) {
        setProjects([...projects, name]);
      }
      setUserProjects([...userProjects, name]);
    };
    sendRequest();
  };

  const handleAddTechnology = (name) => {
    const sendRequest = async () => {
      await props.studentService.addTechnology(name);
      if (!technologies.includes(name)) {
        setTechnologies([...technologies, name]);
      }
      setUserTechnologies([...userTechnologies, name]);
    };
    sendRequest();
  };

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={6} className="content-container">
          <h2>Application related</h2>

          <Form.Label htmlFor="projects">
            <h4>Projects I can help with</h4>
          </Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <TagAutoComplete
              id="projects"
              source={projects}
              selectedItems={userProjects}
              onItemSelected={handleAddProject}
            />
          </InputGroup>
          <p>
            {userProjects.map((project, index) => (
              <DeletableTag
                key={`project-${index}`}
                name={project}
                onDelete={handleProjectDelete}
              />
            ))}
          </p>

          <Form.Label htmlFor="technologies">
            <h4>Technologies I can help with</h4>
          </Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <TagAutoComplete
              id="technologies"
              source={technologies}
              selectedItems={userTechnologies}
              onItemSelected={handleAddTechnology}
            />
          </InputGroup>
          <p>
            {userTechnologies.map((technology, index) => (
              <DeletableTag
                key={`technology-${index}`}
                name={technology}
                onDelete={handleTechnologyDelete}
              />
            ))}
          </p>
        </Col>
        <Col xs={12} lg={6} className="content-container"></Col>
      </Row>
    </Container>
  );
};

export default Settings;
