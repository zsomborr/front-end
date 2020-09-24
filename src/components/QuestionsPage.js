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
    questionData.userId = 1; //TODO userId to add
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
          <Col>
            <h3 className="commonText">Filter</h3>
            <Container>
              <h2 className="commonText">Filters here</h2>
            </Container>
          </Col>
          <Col>
            <h3 className="commonText">Search bar</h3>
            <FormControl id="search" placeholder="Search..." required />
          </Col>
          <Col>
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
      </Container>
      <Container className="questionsBox">
        <QuestionsDisplayer questions={questions} />
      </Container>
    </Container>
  );
};

export default QuestionsPage;
