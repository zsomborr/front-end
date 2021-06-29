import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Container,
  Row,
  Col,
  Image,
  FormGroup,
  Form,
} from "react-bootstrap";
import NewAnswer from "./modals/NewAnswer";
import ReactTimeAgo from "react-time-ago";

const SingleQuestionPage = (props) => {
  const [question, setQuestionDetails] = useState({
    submissionTime: new Date().toString(),
    technologyTags: [],
  });
  const [answers, setAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const questionId = props.match.params.id;
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [answerEditing, setAnswerEditing] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const [answerId, setAnswerId] = useState(0);

  const getData = useCallback(async () => {
    const response = await props.questionsService.getQuestionDetails(
      questionId
    );

    setQuestionDetails(response.data.question);
    setAnswers(response.data.answers);
  }, [props.questionsService, questionId]);

  const upvote = async () => {
    await props.questionsService.voteOnQuestionById(questionId, 1);
    getData();
  };

  const downvote = async () => {
    await props.questionsService.voteOnQuestionById(questionId, -1);
    getData();
  };

  const editButton = () => {
    if (!editing) {
      return (
        <span onClick={editQuestion}>
          <i className="far fa-edit ml-3"></i>
        </span>
      );
    }
  };

  const editQuestion = () => {
    setEditing(true);
    setNewTitle(question.title);
    setNewDescription(question.description);
  };

  const editDescription = () => {
    if (!editing) {
      return (
        <Col id="description" className="preserve-line">
          {question.description}
        </Col>
      );
    } else {
      return (
        <Col>
          <FormGroup>
            <Form.Control
              as="textarea"
              rows="5"
              defaultValue={question.description}
              onChange={(e) => setNewDescription(e.target.value)}
            ></Form.Control>
          </FormGroup>
        </Col>
      );
    }
  };

  const editTitle = () => {
    if (!editing) {
      return <span className="h3 mr-3">{question.title}</span>;
    } else {
      return (
        <FormGroup>
          <Form.Control
            as="input"
            defaultValue={question.title}
            onChange={(e) => setNewTitle(e.target.value)}
          ></Form.Control>
          <div className="mt-2">
            <Button onClick={saveEditing} className="mr-2">
              Save
            </Button>
            <Button onClick={cancelEditing} className="btn-danger">
              Cancel
            </Button>
          </div>
        </FormGroup>
      );
    }
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
    getData();
  };

  const cancelAnswerEditing = () => {
    setAnswerEditing(false);
    setAnswerId(0);
  };

  const saveAnswerEditing = async () => {
    setAnswerEditing(false);
    await props.answerService.setNewContentForAnswer(answerId, newAnswer);
    setAnswerId(0);
    getData();
  };

  const editAnswerContent = (content, id) => {
    if (id !== answerId) {
      return content;
    } else {
      return (
        <Container>
          <FormGroup>
            <Form.Control
              as="textarea"
              rows="3"
              defaultValue={content}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <div className="mt-2">
            <Button onClick={saveAnswerEditing} className="mr-2">
              Save
            </Button>
            <Button onClick={cancelAnswerEditing} className="btn-danger">
              Cancel
            </Button>
          </div>
        </Container>
      );
    }
  };

  const editAnswer = (id) => {
    setAnswerId(id);
    setAnswerEditing(true);
    setNewAnswer(document.getElementById(`answer-${id}`).innerText);
  };

  const editAnswerButton = (id) => {
    if (!answerEditing) {
      return (
        <span onClick={() => editAnswer(id)}>
          <i className="far fa-edit ml-3"></i>
        </span>
      );
    }
  };

  const acceptAnswerButton = (answer) => {
    return (
      <span onClick={() => toggleAccept(answer.id)}>
        <i className="fa fa-check ml-3">{}</i>
        <p>{answer.accepted ? "accepted" : "accept"}</p>
      </span>
    );
  };

  const toggleAccept = (id) => {
    console.log("accept");
    props.answerService.accept(id);
    getData();
  };

  useEffect(() => {
    getData();
  }, [getData, props.questionsService, questionId]);

  useEffect(() => {
    const isLastEmpty = (answers) => {
      const lastAnswer = answers[answers.length - 1];
      return Object.keys(lastAnswer).length === 1;
    };

    if (answers.length === 0 || !isLastEmpty(answers)) {
      return;
    }

    getData();
  }, [answers, getData]);

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
        />
        <Col>
          <Row>
            <Col xs={9} lg={10} className="order-2 order-lg-1">
              {editTitle()}
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
              {question.myQuestion ? editButton() : null}
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
              {question.voted ? (
                <Row>
                  <Col className="text-center" id="rating">
                    <Badge variant="dark">{question.vote}</Badge>
                  </Col>
                </Row>
              ) : (
                <Container>
                  <Row>
                    <Col className="text-center">
                      <span onClick={upvote}>
                        <i className="far fa-arrow-alt-circle-up"></i>
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center" id="rating">
                      {question.vote}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <span onClick={downvote}>
                        <i className="far fa-arrow-alt-circle-down"></i>
                      </span>
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
            <Col>{editDescription()}</Col>
          </Row>
          <Row>
            <Col xs={12} md={9}>
              {question.technologyTags.map((technology) => {
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
          {answers.map((answer) => {
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
                <Col
                  xs={12}
                  lg={1}
                  className="order-5 order-lg-3 preserve-line"
                >
                  {answer.myAnswer ? editAnswerButton(answer.id) : ""}
                  {question.myQuestion && acceptAnswerButton(answer)}
                </Col>
                <Col xs={12} lg={2} className="order-2 order-lg-4 text-center">
                  <Link to={`/user/${answer.userId_}`}>{answer.username}</Link>
                </Col>
                <Col
                  xs={12}
                  lg={10}
                  className="order-3 order-lg-5 text-center text-lg-right font-italic"
                >
                  <ReactTimeAgo
                    date={new Date(Date.parse(answer.submissionTime))}
                  />
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleQuestionPage;
