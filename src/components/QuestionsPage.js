import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

const QuestionPage = (props) => {
  const [questions, setQuestions] = useState([]);

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
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
          <p>Question</p>
        </div>
      </Container>
    </Container>
  );
};

export default QuestionPage;
