import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

const SingleAnswer = ({ answer, editAnswerContent, editAnswerButton }) => {
  return (
    <Row key={`answer-${answer.id}`} className="mb-5">
      <Col xs={12} lg={2} className="text-center">
        <Image
          className="img-fluid img-thumbnail rounded-circle border"
          src="/missing-profile-pic.jpg"
          alt="Profile"
        />
      </Col>
      <Col
        xs={12}
        lg={9}
        className="order-4 order-lg-2 preserve-line"
        id={`answer-${answer.id}`}
      >
        {editAnswerContent(answer.content, answer.id)}
      </Col>
      <Col xs={12} lg={1} className="order-5 order-lg-3 preserve-line">
        {answer.myAnswer ? editAnswerButton(answer.id) : ""}
      </Col>
      <Col xs={12} lg={2} className="order-2 order-lg-4 text-center">
        <Link to={`/user/${answer.userId_}`}>{answer.username}</Link>
      </Col>
      <Col
        xs={12}
        lg={10}
        className="order-3 order-lg-5 text-center text-lg-right font-italic"
      >
        <ReactTimeAgo date={new Date(Date.parse(answer.submissionTime))} />
      </Col>
    </Row>
  );
};

export default SingleAnswer;
