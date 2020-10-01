import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

const QuestionPreview = (props) => {
  const title = props.question.title;
  const description = props.question.description;
  const questionId = props.question.id;
  const submissionTime = props.question.submissionTime;

  return (
    <Container className="alert alert-primary">
      <Row>
        <Col>
          <Link to={`/question/${questionId}`}>
            <h5>{title}</h5>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>{description}</h6>
        </Col>
        <Col>{submissionTime}</Col>
      </Row>
    </Container>
  );
};

export default QuestionPreview;
