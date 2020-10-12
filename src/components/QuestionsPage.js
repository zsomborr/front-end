import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import MultiSelect from "react-multi-select-component";
import NewQuestionModal from "./modals/NewQuestion";
import QuestionsDisplayer from "./QuestionsDisplayer";

const QuestionsPage = (props) => {
  const [questions, setQuestions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const form = React.createRef();
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (selectedTechnologies.length === 0 && !form.current.reportValidity()) {
      return;
    }

    try {
      if (selectedTechnologies.length !== 0) {
        const convert = (technologies) => {
          const r = [];
          technologies.forEach((technology) => {
            r.push({ technologyTag: technology.label });
          });
          return r;
        };
        const results = await props.questionsService.searchBy(
          convert(selectedTechnologies)
        );
        setQuestions(results);
      } else {
        const results = await props.questionsService.search(query);
        setQuestions(results);
      }
    } catch (e) {}
  };

  const getAllQuestions = useCallback(async () => {
    try {
      const response = await props.questionsService.getAll();
      setQuestions(response);
    } catch (e) {}
  }, [props.questionsService]);

  useEffect(() => {
    const getAllTechnologies = async () => {
      const response = await props.technologiesService.getAll();
      const convert = (technologies) => {
        const r = [];
        technologies.forEach((technology) => {
          r.push({ value: technology.id, label: technology.technologyTag });
        });
        return r;
      };
      setAllTechnologies(convert(response.data));
    };
    getAllQuestions();
    getAllTechnologies();
  }, [getAllQuestions, props.questionsService, props.technologiesService]);

  return (
    <Container className="page">
      <Row className="content-container">
        <NewQuestionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          questionsService={props.questionsService}
          technologiesService={props.technologiesService}
          onSuccess={getAllQuestions}
        />
        <Col>
          <Form onSubmit={handleSearch} ref={form}>
            <Form.Row className="mb-3 mb-lg-2">
              <Col xs={12} lg={6}>
                <Row>
                  <Col md={6}>
                    <FormControl
                      className="input-group"
                      id="search"
                      placeholder="Search..."
                      minLength="2"
                      required
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <MultiSelect
                      className="my-3 mt-md-0 mb-md-2"
                      options={allTechnologies}
                      value={selectedTechnologies}
                      onChange={setSelectedTechnologies}
                      labelledBy={"Select a technology"}
                      hasSelectAll={false}
                      shouldToggleOnHover={true}
                      overrideStrings={{
                        selectSomeItems: "Select a technology to filter",
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={6} lg={3}>
                <Button onClick={handleSearch}>Search</Button>
              </Col>
              <Col xs={6} lg={3} className="text-right">
                <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                  Add new question
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <Row>
            <Col>
              <QuestionsDisplayer questions={questions} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionsPage;
