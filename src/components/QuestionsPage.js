import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import QuestionPreview from "./QuestionPreview";
import {
  Alert,
  Container,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import AddNewQuestionModal from "./AddNewQuestionModal";
import QuestionsDisplayer from "./QuestionsDisplayer";

const QuestionsPage = (props) => {
  const questionsService = props.questionsService;
  const [questions, setQuestions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    questionsService.getAllQuestions(setQuestions);
  }, []);

  const addQuestion = (questionData) => {
    questionsService.addNewQuestion(questionData, reloadQuestions);
  };

  const reloadQuestions = () => {
    questionsService.getAllQuestions(setQuestions);
  };

  return (
    <Container>
      <AddNewQuestionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        sendQuestion={addQuestion}
      />
      <h1 className="commonText">NAVBAR</h1>
      <Container>
        <Row>
          {/*<Col>
            <h3 className="commonText">Filter</h3>
            <Container>
              <h2 className="commonText">Filters here</h2>
            </Container>
          </Col>*/}
          <Col>
            <h3 className="commonText">Search bar</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormControl
              className="input-group mb-3 mr-3"
              id="search"
              placeholder="Search..."
              required
            />
          </Col>
          <Col>
            <Row>
              <Col>
                <Button
                  className="commonText"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  Search
                </Button>
              </Col>
              <Col className="text-right">
                <Button
                  className="commonText"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  Add new question
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="questionsBox">
        <QuestionsDisplayer questions={questions} />
      </Container>
    </Container>
  );
};

export default QuestionsPage;
