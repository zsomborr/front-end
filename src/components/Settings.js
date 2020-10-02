import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import DeletableTag from "./form/DeletableTag";
import TagAutoComplete from "./form/TagAutoComplete";

const Settings = () => {
  const user = {
    completed_projects: ["AskMate", "Proman"],
    technologies: ["C#"],
  };

  const projects = [
    "AskMate",
    "JavaScript game",
    "Proman",
    "Five-in-a-row",
    "Solitaire",
    "Klondike Solitaire",
    "Codecool Quest",
    "Snake Game",
    "Codecool Shop",
  ];

  const technologies = [
    "Python",
    "HTML5",
    "CSS3",
    "JavaScript",
    "Bootstrap",
    "Java",
    "C#",
  ];

  const [selectedProjects, setSelectedProjects] = useState(
    user.completed_projects
  );
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    user.technologies
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
              type="project (Codecool Shop, Five-in-a-row)"
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
              type="technology (Bootstrap/HTML5/CSS3)"
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
