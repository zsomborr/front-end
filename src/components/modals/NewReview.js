import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Modal } from "react-bootstrap";
import ReactStars from "react-stars";

const NewReview = (props) => {
  console.log("reload");
  let review = "";
  let stars = 0;

  const handleSubmit = async () => {
    try {
      await props.mentorService.addReview(stars, review, props.userId);
      props.setIsModalOpen(false);
      props.onSuccess();
    } catch (e) {}
  };

  const ratingChanged = (rate) => {
    stars = rate;
    console.log("rate", stars);
  };

  return (
    <Modal show={props.isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Rate this mentor</h4>
          <div
            className="close-container"
            onClick={() => props.setIsModalOpen(false)}
          >
            <div className="leftright"></div>
            <div className="rightleft"></div>
          </div>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={50}
            color2={"#ffd700"}
          />
        </Col>

        <Col>
          <h4 className="mt-3">Add your review</h4>

          <Form>
            <FormGroup>
              <Form.Control
                className=""
                as="textarea"
                id="review"
                placeholder="Be inclusive and respectful.
Avoid sarcasm and be careful with jokes — tone is hard to decipher online. Prefer gender-neutral language when uncertain. If a situation makes it hard to be friendly, stop participating and move on."
                rows="5"
                required
                onChange={(e) => (review = e.target.value)}
              />
            </FormGroup>
          </Form>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewReview;
