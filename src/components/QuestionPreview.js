import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";

const QuestionPreview = (props) => {
  return (
    <Container className="alert alert-primary">
      <Row>
        <Col>
          <Link to={`/question/${props.question.id}`}>
            <h5>{props.question.title}</h5>
          </Link>
        </Col>
      </Row>
      <Row>
        <Row lg={1} md={1} sm={1}>
          <Col className="text-center font-italic">Votes:</Col>
          <Col className="text-center font-italic">{"0"}</Col>
        </Row>
        <Col>
          <Link to={`/user/${props.question.userId_}`}>
            {props.question.username}
          </Link>{" "}
          | <ReactTimeAgo date={props.question.submissionTime} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className="text-truncate">{props.question.description}</h6>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionPreview;
