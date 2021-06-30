import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import EditAnswerForm from "./EditAnswerForm";

const SingleAnswer = ({
  answer,
  answerService,
  getAnswers,
  handleDeleteAnswerRequest,
}) => {
  const [answerEditing, setAnswerEditing] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");

  const editAnswer = () => {
    setAnswerEditing(true);
    setNewAnswer(document.getElementById(`answer-${answer.id}`).innerText);
  };

  const editAnswerButton = () => {
    if (!answerEditing) {
      return (
        <span onClick={() => editAnswer()}>
          <i className="far fa-edit ml-3"></i>
        </span>
      );
    }
  };

  const deleteAnswerButton = () => {
    return (
      <span
        className="close-container"
        onClick={() => handleDeleteAnswerRequest(answer.id)}
      >
        Delete
      </span>
    );
  };

  const cancelAnswerEditing = () => {
    setAnswerEditing(false);
  };

  const saveAnswerEditing = async () => {
    setAnswerEditing(false);
    await answerService.setNewContentForAnswer(answer.id, newAnswer);
    getAnswers();
  };

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
        {!answerEditing ? (
          answer.content
        ) : (
          <EditAnswerForm
            content={answer.content}
            setNewAnswer={setNewAnswer}
            saveAnswerEditing={saveAnswerEditing}
            cancelAnswerEditing={cancelAnswerEditing}
          />
        )}
      </Col>
      <Col xs={12} lg={1} className="order-5 order-lg-3 preserve-line">
        {answer.myAnswer && editAnswerButton()}
      </Col>
      <Col xs={12} lg={1} className="order-5 order-lg-3 preserve-line">
        {answer.myAnswer && deleteAnswerButton()}
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
