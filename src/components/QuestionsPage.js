import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import NewQuestionModal from "./modals/NewQuestion";
import QuestionsDisplayer from "./QuestionsDisplayer";

const QuestionsPage = (props) => {
  const [questions, setQuestions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const form = React.createRef();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.current.reportValidity()) {
      return;
    }

    try {
      const results = await props.questionsService.search(query);
      setQuestions(results);
    } catch (e) {}
  };

  const getAllQuestions = useCallback(async () => {
    try {
      const response = await props.questionsService.getAll();
      setQuestions(response);
    } catch (e) {}
  }, [props.questionsService]);

  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions, props.questionsService]);

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
            <Form.Row className="mb-3 mb-lg-0">
              <Col xs={12} lg={6}>
                <FormControl
                  className="input-group mb-3 mr-3"
                  id="search"
                  placeholder="Search..."
                  minLength="2"
                  required
                  onChange={(e) => setQuery(e.target.value)}
                />
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
