import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

const QuestionPreview = (props) => {
  //const title = props.question.title;
  //const description = props.question.title;
  //const questionId = props.question.id;
  const questionId = 1;
  const title = "Title";
  const description = "Description";
  return (
    <Container style={boxStyle}>
      <Row>
        <Col>
          <Link to={`/question/${questionId}`}>{title}</Link>
        </Col>
      </Row>
      <Row>
        <Col>{description}</Col>
      </Row>
    </Container>
  );
};

const boxStyle = {
  borderTop: "gray solid 1px",
  borderBottom: "gray solid 1px",
};

export default QuestionPreview;
