import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container, Row, Col, Image } from "react-bootstrap";
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

  const getData = useCallback(async () => {
    const response = await props.questionsService.getQuestionDetails(
      questionId
    );

    setQuestionDetails(response.data.question);
    setAnswers(response.data.answers);
  }, [props.questionsService, questionId]);

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
              <span className="h3">{question.title}</span>
              <span className="ml-3 d-none d-sm-inline-block">
                by:{" "}
                <Link to={`/user/${question.userId_}`}>
                  {question.username}
                </Link>
              </span>
            </Col>
            <Col
              xs={3}
              lg={2}
              className="order-1 order-lg-2 float-right text-center"
            >
              <Image
                className="img-fluid img-thumbnail rounded-circle border"
                src="/missing-profile-pic.jpg"
                alt="Profile"
              />
              <span className="d-sm-none">{question.username}</span>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col className="preserve-line">{question.description}</Col>
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
                  lg={10}
                  className="order-4 order-lg-2 preserve-line"
                >
                  {answer.content}
                </Col>
                <Col xs={12} lg={2} className="order-2 order-lg-3 text-center">
                  <Link to={`/user/${answer.userId_}`}>{answer.username}</Link>
                </Col>
                <Col
                  xs={12}
                  lg={10}
                  className="order-3 order-lg-4 text-center text-lg-right font-italic"
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
