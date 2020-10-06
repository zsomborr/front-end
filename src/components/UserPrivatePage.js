import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Container,
  Image,
  useAccordionToggle,
  Row,
} from "react-bootstrap";
import AccordionContext from "react-bootstrap/AccordionContext";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const UserPrivatePage = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [module, setModule] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const requestData = async () => {
      const response = await props.studentService.getPrivateDetails();
      const user = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCountry(user.country);
      setCity(user.city);
      setModule(user.module);
      setQuestions(user.userQuestions);
      setAnswers(user.userAnswers);
    };

    requestData();
  }, [props.studentService]);

  const AnimatedToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const [symbol, setSymbol] = useState("");

    useEffect(() => {
      const isOpen = currentEventKey === eventKey;
      if (isOpen) {
        setSymbol("fa fa-minus mr-2");
      } else {
        setSymbol("fa fa-plus mr-2");
      }
    }, [currentEventKey, eventKey, symbol]);

    const onClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    return (
      <Card.Header onClick={onClick}>
        <i className={symbol} />
        {children}
      </Card.Header>
    );
  };

  return (
    <Container className="page">
      <Row>
        <Col xs={12} lg={8} className="content-container">
          <Accordion>
            <Card>
              <AnimatedToggle eventKey="0">Questions I asked</AnimatedToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {questions.map((question) => {
                    return (
                      <Row key={question.id}>
                        <Col xs={12} md={9} className="text-truncate">
                          <span className="font-weight-bold mr-3">
                            <Link
                              to={`/question/${question.id}`}
                              title={question.title}
                            >
                              {question.title}
                            </Link>
                          </span>
                          <span className="font-italic">
                            {question.description}
                          </span>
                        </Col>
                        <Col className="text-right">
                          <ReactTimeAgo date={question.submissionTime} />
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <AnimatedToggle eventKey="1">Questions I answered</AnimatedToggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {answers.map((answer) => {
                    return (
                      <Row key={answer.id}>
                        <Col
                          xs={12}
                          className="text-truncate font-weight-bold mr-3"
                        >
                          <Link
                            to={`/question/${answer.questionId_}`}
                            title={answer.questionTitle}
                          >
                            {answer.questionTitle}
                          </Link>
                        </Col>
                        <Col
                          xs={12}
                          md={9}
                          className="text-truncate font-italic pl-4"
                        >
                          {answer.content}
                        </Col>
                        <Col className="text-right">
                          <ReactTimeAgo date={answer.submissionTime} />
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col xs={12} lg={4} className="content-container">
          <Row>
            <Col md={4}></Col>
            <Col xs={12} md={4} className="text-center mb-md-3">
              <Image
                className="img-fluid img-thumbnail rounded-circle border"
                src="missing-profile-pic.jpg"
                alt="Profile"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} className="font-weight-bold">
              Name
            </Col>
            <Col md={8}>
              {firstName} {lastName}
            </Col>
            <Col md={4} className="font-weight-bold">
              Location
            </Col>
            <Col md={8}>
              {country ? country : <i>Not set</i>} /{" "}
              {city ? city : <i>Not set</i>}
            </Col>
            <Col md={4} className="font-weight-bold">
              Module
            </Col>
            <Col md={8}>{module ? module : <i>Not set</i>}</Col>
            <Col xs={12} className="text-right">
              <Link to="/settings">Update profile</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPrivatePage;
