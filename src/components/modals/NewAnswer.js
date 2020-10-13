import React from "react";
import { Button, Col, Form, FormGroup, Modal } from "react-bootstrap";
import CloseSymbol from "./CloseSymbol";
import Noty from "noty";

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
      new Noty({
        text: "Your answer added.",
        type: "success",
      }).show();
    } catch (e) {}
  };

  return (
    <Modal show={props.isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Answer</h4>
          <CloseSymbol onClick={() => props.setIsModalOpen(false)} />
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
