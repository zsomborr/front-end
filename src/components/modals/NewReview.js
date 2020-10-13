import React from "react";
import { Button, Col, Form, FormGroup, Modal } from "react-bootstrap";
import ReactStars from "react-stars";
import CloseSymbol from "./CloseSymbol";

const NewReview = (props) => {
  let review = "";
  let stars = 0;

  const handleSubmit = async () => {
    try {
      await props.mentorService.addReview(stars, review, props.userId);
      props.setIsModalOpen(false);
      props.onSuccess();
    } catch (e) {}
  };

  return (
    <Modal show={props.isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Rate this mentor</h4>
          <CloseSymbol onClick={() => props.setIsModalOpen(false)} />
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ReactStars onChange={(rate) => (stars = rate)} size={50} />
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
