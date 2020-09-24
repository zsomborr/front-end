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
  Modal,
} from "react-bootstrap";

const QuestionsPage = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <h1 className="commonText">NAVBAR</h1>
      <Container>
        <Row>
          <Col>
            <h3 className="commonText">Filter</h3>
          </Col>
          <Col>
            <h3 className="commonText">Search bar</h3>
          </Col>
          <Col>
            <Button className="commonText">Add new question</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="questionsBox">
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
        </div>
      </Container>
    </Container>
  );
};

export default QuestionsPage;
