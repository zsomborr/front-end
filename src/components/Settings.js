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
      const response = await props.studentService.getSettingsDetails();
      if (response.status !== 200) {
        return;
      }
      setUserTechnologies(response.data.technologyTags);
      setUserProjects(response.data.projectTags);

      setTechnologies(response.data.allTechnologyTags);
      setProjects(response.data.allProjectTags);
    };

    requestData();
  }, [props.studentService]);

  const [selectedProjects, setSelectedProjects] = useState(userProjects);
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    userTechnologies
  );

  const handleProjectDelete = (name) => {
    setSelectedProjects(selectedProjects.filter((project) => project !== name));
  };

  const handleTechnologyDelete = (name) => {
    selectedTechnologies(
      selectedTechnologies.filter((technology) => technology !== name)
    );
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
              setSelectedItems={setSelectedProjects}
              selectedItems={selectedProjects}
            />
          </InputGroup>
          <p>
            {selectedProjects.map((project, index) => (
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
              setSelectedItems={setSelectedTechnologies}
              selectedItems={selectedTechnologies}
            />
          </InputGroup>
          <p>
            {selectedTechnologies.map((technology, index) => (
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
