import React from "react";
import { Link } from "react-router-dom";
import { Badge, Container, Row, Col } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";

const QuestionPreview = (props) => {
  return (
    <Container className="alert alert-primary">
      <Row>
        <Col xs={12}>
          <Link to={`/question/${props.question.id}`}>
            <h5>{props.question.title}</h5>
          </Link>
        </Col>
        <Col xs={12}>
          {props.question.anonym ? (
            "Anonymous"
          ) : (
            <Link to={`/user/${props.question.userId_}`}>
              {props.question.username}
            </Link>
          )}{" "}
          | <ReactTimeAgo date={props.question.submissionTime} /> | Votes: {props.question.votes}
        </Col>
        <Col xs={12}>
          <h6 className="text-truncate">{props.question.description}</h6>
        </Col>
        <Col>
          {props.question.technologyTags.map((technology) => {
            return (
              <Badge
                key={`technology-${technology.technologyTag}`}
                variant="primary"
                className="badge-pill mr-1"
              >
                {technology.technologyTag}
              </Badge>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionPreview;
