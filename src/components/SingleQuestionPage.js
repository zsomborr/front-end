import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const SingleQuestionPage = (props) => {
  const questionsService = props.questionsService;
  const [questionDetails, setQuestionDetails] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    const getData = async () => {
      return await questionsService.getQuestionDetails(props.match.params.id);
    };
    const data = getData();
    setQuestionDetails(data.question);
    setAnswers(data.answers);
  }, [questionsService]);

  return (
    <Container className="page">
      <Row className="content-container"></Row>
    </Container>
  );
};

export default SingleQuestionPage;
