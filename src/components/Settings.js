import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import DiscordButton from "./form/DiscordButton";
import DeletableTag from "./form/DeletableTag";
import FirstName from "./form/FirstName";
import LastName from "./form/LastName";
import TagAutoComplete from "./form/TagAutoComplete";

const Settings = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [module, setModule] = useState("");
  const [userTechnologies, setUserTechnologies] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [projects, setProjects] = useState([]);
  const form = React.createRef();
  const [modules] = useState([
    "ProgBasics",
    "Web",
    "OOP",
    "Advanced",
    "JobHunt",
  ]);

  useEffect(() => {
    const requestData = async () => {
      const unwrap = (source, columnName) => {
        const result = [];
        source.forEach((item) => result.push(item[columnName]));
        return result;
      };
      const response = await props.studentService.getSettingsDetails();
      const user = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCountry(user.country);
      setCity(user.city);
      if (user.module === null) {
        user.module = modules[0];
      }
      setModule(user.module);

      setUserProjects(unwrap(user.projectTags, "projectTag"));
      setUserTechnologies(unwrap(user.technologyTags, "technologyTag"));

      setProjects(unwrap(user.allProjectTags, "projectTag"));
      setTechnologies(unwrap(user.allTechnologyTags, "technologyTag"));
    };

    requestData();
  }, [modules, props.studentService]);

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

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!form.current.reportValidity()) {
      return;
    }
    const sendRequest = async () => {
      await props.studentService.updateInfo(
        firstName,
        lastName,
        country,
        city,
        module
      );
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
        <Col xs={12} lg={6} className="content-container">
          <h2>Personal details</h2>
          <Form onSubmit={handleProfileUpdate} ref={form}>
            <Form.Row>
              <Col xs={4} className="d-md-none"></Col>
              <Col
                xs={4}
                md={3}
                className="d-flex flex-column justify-content-center"
              >
                <Row>
                  <Col xs={8} md={12} className="mx-auto">
                    <Image
                      className="img-fluid img-thumbnail rounded-circle border"
                      src="/missing-profile-pic.jpg"
                      alt="Profile"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={9}>
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <FirstName
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={firstName}
                />

                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <LastName
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={lastName}
                />
              </Col>
            </Form.Row>
            <h4>Social</h4>
            <Row>
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <DiscordButton discordService={props.discordService} />
              </Col>
              <Col></Col>
            </Row>
            <h4>Location</h4>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Label htmlFor="country">Country</Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                  <Form.Control
                    id="country"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    defaultValue={country}
                    minLength="4"
                    maxLength="20"
                    required
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={6}>
                <Form.Label htmlFor="city">City</Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                  <Form.Control
                    id="city"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    defaultValue={city}
                    minLength="4"
                    maxLength="20"
                    required
                  />
                </InputGroup>
              </Col>
            </Form.Row>
            <h4>Study</h4>
            <Form.Group>
              <Form.Label htmlFor="module">Current module</Form.Label>
              <Form.Control
                id="module"
                as="select"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                custom
              >
                {modules.map((module) => (
                  <option key={module} value={module.toUpperCase()}>
                    {module}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button onClick={handleProfileUpdate}>Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
