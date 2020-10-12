import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import NewReview from "./modals/NewReview";
import ReactStars from "react-stars";

const PublicUserPage = (props) => {
  const studentService = props.studentService;
  const mentorService = props.mentorService;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Reviews, setReviews] = useState([
    { id: null, rating: null, review: null, reviewer: null },
  ]);
  const [numOfRates, setNumOfRates] = useState(0);
  const [ratingsSum, setRatingsSum] = useState(0);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    module: null,
    technologyTags: [],
    projectTags: [],
  });

  const getData = async () => {
    const response = await mentorService.getUserReviews(props.match.params.id);
    setReviews(response.data);
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await mentorService.getUserReviews(
        props.match.params.id
      );
      setReviews(response.data);
    };
    getReviews();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await studentService.getUserDataById(
        props.match.params.id
      );
      setUser(response.data);
    };
    getData();
  }, [props.match.params.id, studentService]);

  return (
    <Container className="page">
      <Row className="content-container">
        <NewReview
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          mentorService={props.mentorService}
          userId={props.match.params.id}
          onSuccess={getData}
        />
        <Col md={12} lg={5}>
          <Row className="d-flex align-items-end">
            <Col>
              <Row>
                <Col xs={3} sm={3}></Col>
                <Col xs={6} sm={6} className="text-center">
                  <Image
                    className="img-fluid img-thumbnail rounded-circle border"
                    src="/missing-profile-pic.jpg"
                    alt="Profile"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="content-container">
                  <p>
                    <strong>Name: </strong>
                    {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Country: </strong>
                    {user.country ? user.country : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>City: </strong>
                    {user.city ? user.city : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>Module: </strong>
                    {user.module ? user.module : <i>Not set</i>}
                  </p>
                  <p>
                    <strong>Technologies</strong> I can help with:
                  </p>
                  <p>
                    {user.technologyTags.map((tech) => {
                      return (
                        <Badge
                          key={`technology-${tech.id}`}
                          variant="primary"
                          className="badge-pill ml-1"
                        >
                          {tech.technologyTag}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Projects</strong> I can help with:
                  </p>
                  <p>
                    {user.projectTags.map((project) => {
                      return (
                        <Badge
                          key={`project-${project.id}`}
                          variant="danger"
                          className="badge-pill ml-1"
                        >
                          {project.projectTag}
                        </Badge>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Contact</strong> me here:
                  </p>
                  <Col>
                    <Row className="d-none discordTag mt-2 text-right rounded-pill">
                      <Col className="text-left" xs={3} sm={3}>
                        <Image
                          className="emailImage "
                          src="/discord-logo.webp"
                          alt="Discord"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        sm={9}
                        className="text-right align-self-center font-weight-bold"
                        style={{
                          wordWrap: "break-word",
                          fontSize: "100%",
                        }}
                      >
                        {user.discord}
                      </Col>
                    </Row>
                    <Row className="emailTag mt-2 text-right rounded-pill">
                      <Col className="text-left" xs={3} sm={3}>
                        <Image
                          className="emailImage "
                          src="/gmail-logo.png"
                          alt="Gmail"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        sm={9}
                        className="text-right align-self-center font-weight-bold"
                        style={{
                          wordWrap: "break-word",
                          fontSize: "100%",
                        }}
                      >
                        {user.email}
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs={12} md={8} className="h4 text-center">
              Reviews
            </Col>

            <Col xs={12} md={4} className="text-center mb-4">
              <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                Add review
              </Button>
            </Col>

            {Reviews.map((review, index) => {
              const even = index % 2 === 0;
              if (review.review === "") {
                return (
                  <Col xs={12} className="text-center ">
                    {review.reviewer} rated this mentor with
                    <div className="d-inline-block align-bottom mx-1">
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={16}
                        color2={"#ffd700"}
                        edit={false}
                      />
                    </div>
                    stars.
                    <hr></hr>
                  </Col>
                );
              }
              return (
                <Col xs={12}>
                  <blockquote
                    className={even ? "blockquote text-right" : "blockquote"}
                  >
                    <p className="mb-0">{review.review}</p>
                    <footer className="blockquote-footer">
                      <cite title={`${review.reviewer}`}>
                        {review.reviewer}
                      </cite>
                      <div className={even ? "d-flex justify-content-end" : ""}>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={20}
                          color2={"#ffd700"}
                          edit={false}
                        />
                      </div>
                    </footer>
                  </blockquote>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicUserPage;
