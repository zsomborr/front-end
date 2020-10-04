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

const UserPrivatePage = () => {
  const user = {
    personal: {
      name: {
        first: "VeryLongFirstName",
        last: "VeryLongLastName",
      },
      avatar: null,
      location: {
        country: "Hungary",
        city: "Budapest",
      },
      module: "JobHunt",
    },
    activity: {
      asked_questions: [
        {
          id: 1,
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submissionTime: "2020-10-05T14:43:36.785381",
        },
        {
          id: 2,
          title: "My Question #2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submissionTime: "2020-10-05T14:43:36.785381",
        },
      ],
      my_answers: [
        {
          id: 3,
          questionId_: 1,
          questionTitle: "Can i get some suggestion?",
          content: "Use the S.O.L.I.D. principles.",
          submissionTime: "2020-10-05T14:43:36.785381",
        },
        {
          id: 4,
          questionId_: 2,
          questionTitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
          content: "I would suggest to use Dependecy Injection.",
          submissionTime: "2020-10-05T14:43:36.785381",
        },
        {
          id: 4,
          questionId_: 2,
          questionTitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
          submissionTime: "2020-10-05T14:43:36.785381",
        },
      ],
    },
  };

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
                  {user.activity.asked_questions.map((question) => {
                    return (
                      <Row key={question.id}>
                        <Col xs={12} md={7} className="text-truncate">
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
                          {question.submissionTime}
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
                  {user.activity.my_answers.map((answer) => {
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
                          md={7}
                          className="text-truncate font-italic pl-4"
                        >
                          {answer.content}
                        </Col>
                        <Col className="text-right">
                          {answer.submissionTime}
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
                src={
                  user.personal.avatar
                    ? user.personal.avatar
                    : "missing-profile-pic.jpg"
                }
                alt="Profile"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} className="font-weight-bold">
              Name
            </Col>
            <Col md={8}>
              {user.personal.name.first} {user.personal.name.last}
            </Col>
            <Col md={4} className="font-weight-bold">
              Location
            </Col>
            <Col md={8}>
              {user.personal.location.country} / {user.personal.location.city}
            </Col>
            <Col md={4} className="font-weight-bold">
              Module
            </Col>
            <Col md={8}>{user.personal.module}</Col>
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
