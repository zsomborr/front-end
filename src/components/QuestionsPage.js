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

  const sendSearch = async (value) => {
    const result = await questionsService.search(value);
    setQuestions(result);
  };
  const reloadQuestions = () => {
    questionsService.getAllQuestions(setQuestions);
  };

  return (
    <Container className="page">
      <Row className="content-container">
        <AddNewQuestionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          sendQuestion={addQuestion}
        />
        <Col>
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
                    onClick={(e) => {
                      sendSearch(e.target.value);
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
