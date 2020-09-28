import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const SingleQuestionPage = (props) => {
  const questionsService = props.questionsService;
  const [question, setQuestionDetails] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await questionsService.getQuestionDetails(
        props.match.params.id
      );

      setQuestionDetails(data.data.question);
      setAnswers(data.data.answers);
    };
    getData();
  }, []);

  if (question === undefined) {
    return null;
  }
  console.log("question", question);
  console.log("answers", answers);
  return (
    <Container className="page">
      <Row className="content-container">
        <Col>
          <span className="h3">{question.title}</span>
          <span className="ml-3">by: Jani</span>
        </Col>
        <Col>
          <Image
            className="img-fluid img-thumbnail rounded-circle border"
            src={"missing-profile-pic.jpg"}
            alt="Profile"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleQuestionPage;
