import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import EditAnswerForm from "./EditAnswerForm";
import "./SingleAnswer.css";
import { FaCheck, FaBan, FaTrash, FaEdit } from "react-icons/fa";

const SingleAnswer = ({
  answer,
  answerService,
  getAnswers,
  handleDeleteAnswerRequest,
  question,
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
        <span className="icon ml-3" onClick={() => editAnswer()}>
          <FaEdit />
        </span>
      );
    }
  };

  const deleteAnswerButton = () => {
    return (
      <div
        className="icon ml-3"
        onClick={() => handleDeleteAnswerRequest(answer.id)}
      >
        <FaTrash />
      </div>
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

  const acceptAnswerButton = (answer) => {
    console.log(answer.accepted);
    return (
      <div className="icon ml-3" onClick={() => toggleAccept(answer.id)}>
        {answer.accepted ? <FaBan /> : <FaCheck />}
      </div>
    );
  };

  const toggleAccept = async (id) => {
    console.log("accept");
    await answerService.accept(id);
    await getAnswers();
  };

  return (
    <Row
      key={`answer-${answer.id}`}
      className={`mb-5 p-3 rounded border ${answer.accepted && "accepted"}`}
    >
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
        {question.myQuestion && acceptAnswerButton(answer)}
        {answer.myAnswer && editAnswerButton()}
        {answer.myAnswer && deleteAnswerButton()}
      </Col>
      {/* <Col xs={12} lg={1} className="order-5 order-lg-3 preserve-line">
        {answer.myAnswer && deleteAnswerButton()}
      </Col> */}
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
