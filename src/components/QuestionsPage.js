import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import AnimatedButton from "./form/AnimatedButton";
import MultiSelect from "react-multi-select-component";
import { Link } from "react-router-dom";
import NewQuestionModal from "./modals/NewQuestion";
import ReactTimeAgo from "react-time-ago";

const QuestionsPage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const form = React.createRef();
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (selectedTechnologies.length === 0 && !form.current.reportValidity()) {
      return;
    }

    try {
      setIsLoading(true);
      if (selectedTechnologies.length !== 0) {
        const convert = (technologies) => {
          const r = [];
          technologies.forEach((technology) => {
            r.push({ technologyTag: technology.label });
          });
          return r;
        };
        const response = await props.questionsService.searchBy(
          convert(selectedTechnologies)
        );
        setQuestions(response.data);
      } else {
        const response = await props.questionsService.search(query);
        setQuestions(response.data);
      }
    } catch (e) {}
    setIsLoading(false);
  };

  const getAllQuestions = useCallback(async () => {
    try {
      const response = await props.questionsService.getAll();
      setQuestions(response.data);
    } catch (e) {}
  }, [props.questionsService]);

  useEffect(() => {
    const getAllTechnologies = async () => {
      const response = await props.technologiesService.getAll();
      const convert = (technologies) => {
        const r = [];
        technologies.forEach((technology) => {
          r.push({ value: technology.id, label: technology.technologyTag });
        });
        return r;
      };
      setAllTechnologies(convert(response.data));
    };
    getAllQuestions();
    getAllTechnologies();
  }, [getAllQuestions, props.questionsService, props.technologiesService]);

  return (
    <Container className="page">
      <Row className="content-container px-0 pb-0">
        <NewQuestionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          questionsService={props.questionsService}
          technologiesService={props.technologiesService}
          onSuccess={getAllQuestions}
        />
        <Col>
          <Form onSubmit={handleSearch} ref={form}>
            <Form.Row className="mb-3 mb-lg-2">
              <Col xs={12} lg={6}>
                <Row>
                  <Col md={6}>
                    <FormControl
                      className="input-group"
                      id="search"
                      placeholder="Search..."
                      minLength="2"
                      autocomplete="off"
                      required
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <MultiSelect
                      className="my-3 mt-md-0 mb-md-2"
                      options={allTechnologies}
                      value={selectedTechnologies}
                      onChange={setSelectedTechnologies}
                      labelledBy={"Select a technology"}
                      hasSelectAll={false}
                      shouldToggleOnHover={true}
                      overrideStrings={{
                        selectSomeItems: "Select a technology to filter",
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={6} lg={3}>
                <AnimatedButton
                  icon={["fas", "search"]}
                  isLoading={isLoading}
                  onClick={handleSearch}
                >
                  Search
                </AnimatedButton>
              </Col>
              <Col xs={6} lg={3} className="text-right">
                <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                  Ask question
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col xs={12}>
          {questions.length === 0 ? (
            <Alert variant="info">
              No questions found...
              <span onClick={() => setIsModalOpen(true)} className="a ml-1">
                Ask one
              </span>
              !
            </Alert>
          ) : null}
          {questions.map((question) => (
            <Container className="alert alert-primary">
              <Row>
                <Col xs={12}>
                  <Link to={`/question/${question.id}`}>
                    <h5>{question.title}</h5>
                  </Link>
                </Col>
                <Col xs={12}>
                  {question.anonym ? (
                    "Anonymous"
                  ) : (
                    <Link to={`/user/${question.userId_}`}>
                      {question.username}
                    </Link>
                  )}{" "}
                  | <ReactTimeAgo date={question.submissionTime} /> | Votes:{" "}
                  {question.vote} | Answers: {question.numberOfAnswers}
                </Col>
                <Col xs={12}>
                  <h6 className="text-truncate">{question.description}</h6>
                </Col>
                <Col>
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
              </Row>
            </Container>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionsPage;
