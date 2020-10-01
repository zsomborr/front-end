import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const SingleQuestionPage = (props) => {
  const [question, setQuestionDetails] = useState([]);
  const [answers, setAnswers] = useState([]);
  const questionId = props.match.params.id;

  useEffect(() => {
    const getData = async () => {
      const response = await props.questionsService.getQuestionDetails(
        questionId
      );

      setQuestionDetails(response.data.question);
      setAnswers(response.data.answers);
    };
    getData();
  }, [props.questionsService, questionId]);

  return (
    <Container className="page">
      <Row className="content-container">
        <Col>
          <Row>
            <Col xs={9} lg={10} className="order-2 order-lg-1">
              <span className="h3">{question.title}</span>
              <span className="ml-3 d-none d-sm-inline-block">
                by: {question.username}
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
            <Col>{question.description}</Col>
          </Row>
          <Row>
            <Col className="text-right text-muted">
              {question.submissionTime}
            </Col>
          </Row>
          <hr></hr>
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
                <Col xs={12} lg={10} className="order-4 order-lg-2">
                  {answer.content}
                </Col>
                <Col xs={12} lg={2} className="order-2 order-lg-3 text-center">
                  {answer.username}
                </Col>
                <Col
                  xs={12}
                  lg={10}
                  className="order-3 order-lg-4 text-center text-lg-right font-italic"
                >
                  {answer.submissionTime}
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
