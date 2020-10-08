import React from "react";
import { Button, Col, Form, FormGroup, Modal } from "react-bootstrap";

const NewAnswer = (props) => {
  const form = React.createRef();
  let answer = "";

  const handleSubmit = async () => {
    if (!form.current.reportValidity()) {
      return;
    }

    try {
      await props.answerService.add(props.questionId, answer);
      props.setAnswers([...props.answers, { submissionTime: new Date() }]);
      props.setIsModalOpen(false);
    } catch (e) {}
  };

  return (
    <Modal show={props.isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Answer</h4>
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
        <Form ref={form}>
          <FormGroup>
            <Form.Control
              as="textarea"
              id="answer"
              placeholder="Be inclusive and respectful.
Avoid sarcasm and be careful with jokes — tone is hard to decipher online. Prefer gender-neutral language when uncertain. If a situation makes it hard to be friendly, stop participating and move on."
              minLength="2"
              rows="5"
              required
              onChange={(e) => (answer = e.target.value)}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAnswer;
