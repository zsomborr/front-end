import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewReview from "./modals/NewReview";
import Noty from "noty";
import ReactStars from "react-stars";

const PublicUserPage = (props) => {
  const studentService = props.studentService;
  const mentorService = props.mentorService;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    module: null,
    technologyTags: [],
    projectTags: [],
  });

  const getReviews = useCallback(async () => {
    const response = await mentorService.getUserReviews(props.match.params.id);
    setReviews(response.data);
  }, [mentorService, props.match.params.id]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  useEffect(() => {
    const getUser = async () => {
      const response = await studentService.getUserDataById(
        props.match.params.id
      );
      setUser(response.data);
    };
    getUser();
  }, [props.match.params.id, studentService]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(user.email);
    new Noty({
      layout: "bottomLeft",
      timeout: 500,
      text: `Copied: ${user.email}`,
      type: "info",
    }).show();
  };

  return (
    <Container className="page">
      <Row className="content-container">
        <NewReview
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          mentorService={props.mentorService}
          userId={props.match.params.id}
          onSuccess={getReviews}
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
                    <strong>Rank: </strong>
                    {user.rank}
                  </p>
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
                    <Row
                      className={`${
                        user.discordId ? null : "d-none"
                      } discordTag mt-2 text-right rounded-pill`}
                    >
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
                      >
                        <a
                          href={`https://discordapp.com/users/${user.discordId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light"
                        >
                          <u>
                            {user.discordUsername}#{user.discriminator}
                          </u>
                        </a>
                        <i className="fas fa-external-link-alt ml-1 text-light"></i>
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
                        className="text-right align-self-center font-weight-bold pl-0"
                      >
                        <a href={`mailto:${user.email}`} className="text-light">
                          <u>{user.email}</u>
                        </a>
                        <FontAwesomeIcon
                          icon={["far", "copy"]}
                          className="ml-1 text-light"
                          onClick={handleCopyEmail}
                          title="Copy email address to clipboard"
                        ></FontAwesomeIcon>
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

            {reviews.map((review, index) => {
              const even = index % 2 === 0;
              if (review.review === "") {
                return (
                  <Col xs={12} className="text-center ">
                    {review.reviewer} rated this mentor with
                    <ReactStars
                      value={review.rating}
                      size={16}
                      className="d-inline-block align-bottom mx-1 text-shadow-small"
                      edit={false}
                    />
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
                      <ReactStars
                        value={review.rating}
                        size={20}
                        className={
                          even
                            ? "d-flex justify-content-end text-shadow-small"
                            : "text-shadow-small"
                        }
                        edit={false}
                      />
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
