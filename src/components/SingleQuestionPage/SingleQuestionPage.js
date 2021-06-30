import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Button, Container, Row, Col, Image } from "react-bootstrap";
import NewAnswer from "../modals/NewAnswer";
import ReactTimeAgo from "react-time-ago";
import AnswersComponent from "./Answers";
import EditDescription from "./EditDescription";
import EditTitle from "./EditTitle";
import DeleteConfirm from "../modals/DeleteConfirm";
import Noty from "noty";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import "./SingleAnswer.css";

const SingleQuestionPage = (props) => {
  const [question, setQuestion] = useState({
    submissionTime: new Date().toString(),
    technologyTags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const questionId = props.match.params.id;
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const history = useHistory();

  const getAnswers = useCallback(async () => {
    const response = await props.answerService.getAnswersByQuestionId(
      questionId
    );
    console.log(response.data);
    setAnswers(response.data);
  }, [props.answerService, questionId]);

  const getQuestion = useCallback(async () => {
    const response = await props.questionsService.getQuestionDetails(
      questionId
    );
    setQuestion(response.data);
  }, [props.questionsService, questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  useEffect(() => {
    getAnswers();
  }, [getAnswers]);

  const toggleVote = async () => {
    await props.questionsService.voteOnQuestionById(questionId);
    getQuestion();
  };

  const editButton = () => {
    if (!editing) {
      return (
        <span className="icon ml-3" onClick={editQuestion}>
          <FaEdit />
        </span>
      );
    }
  };

  const deleteButton = () => {
    return (
      <span className="icon ml-3" onClick={() => setIsDeleteModalOpen(true)}>
        <FaTrash />
      </span>
    );
  };

  const deleteQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await props.questionsService.deleteQuestionById(question.id);
      new Noty({
        text: res.data.message,
        type: "info",
      }).show();
      setIsModalOpen(false);
      setIsLoading(false);
      history.push("/questions");
    } catch (e) {}
    setIsLoading(false);
  };

  const editQuestion = () => {
    setEditing(true);
    setNewTitle(question.title);
    setNewDescription(question.description);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveEditing = async () => {
    setEditing(false);
    await props.questionsService.setNewDataForQuestion(
      questionId,
      newTitle,
      newDescription
    );
    getQuestion();
  };

  return (
    <Container className="page">
      <Row className="content-container">
        <NewAnswer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          answerService={props.answerService}
          questionId={questionId}
          setAnswers={setAnswers}
          answers={answers}
          getAnswers={getAnswers}
        />
        <DeleteConfirm
          isLoading={isLoading}
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          deleteComponent={deleteQuestion}
        />
        <Col>
          <Row>
            <Col xs={9} lg={10} className="order-2 order-lg-1">
              {!editing ? (
                <span className="h3 mr-3">{question.title}</span>
              ) : (
                <EditTitle
                  question={question}
                  setNewTitle={setNewTitle}
                  saveEditing={saveEditing}
                  cancelEditing={cancelEditing}
                />
              )}
              <span className="d-none d-sm-inline-block">
                by:{" "}
                {question.anonym ? (
                  "Anonymous"
                ) : (
                  <Link to={`/user/${question.userId_}`}>
                    {question.username}
                  </Link>
                )}
              </span>
              {question.myQuestion && editButton()}
              {question.myQuestion && deleteButton()}
            </Col>
            <Col
              xs={3}
              lg={2}
              className="order-1 order-lg-2 float-right text-center"
            >
              <Image
                className="img-fluid img-thumbnail rounded-circle border"
                src={
                  question.anonym
                    ? "/anonymous-profile-pic.jpg"
                    : "/missing-profile-pic.jpg"
                }
                alt="Profile"
              />
              <span className="d-sm-none">{question.username}</span>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col lg={1} md={1} xs={1}>
              <Container>
                <Row>
                  <Col className="text-center">
                    {!question.myQuestion && (
                      <span onClick={toggleVote}>
                        {question.voted ? <AiTwotoneLike /> : <AiOutlineLike />}
                      </span>
                    )}
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col className="text-center" id="rating">
                  <Badge variant="dark">{question.vote}</Badge>
                </Col>
              </Row>
            </Col>
            <Col>
              {!editing ? (
                <Col id="description" className="preserve-line">
                  {question.description}
                </Col>
              ) : (
                <EditDescription
                  question={question}
                  setNewDescription={setNewDescription}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={9}>
              {question.technologyTags.map((technology) => (
                <Badge
                  key={`technology-${technology.technologyTag}`}
                  variant="primary"
                  className="badge-pill mr-1"
                >
                  {technology.technologyTag}
                </Badge>
              ))}
            </Col>
            <Col className="text-right text-muted">
              <ReactTimeAgo date={question.submissionTime} />
            </Col>
          </Row>
          <hr></hr>
          <Button
            className="mb-1"
            onClick={(e) => setIsModalOpen(!isModalOpen)}
          >
            Add new answer
          </Button>
          <br></br>
          <span className="h4">Answers</span>
          <AnswersComponent
            answers={answers}
            setAnswers={setAnswers}
            getAnswers={getAnswers}
            answerService={props.answerService}
            question={question}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleQuestionPage;
