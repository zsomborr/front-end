import React from "react";
import {
  Modal,
  Button,
  Form,
  FormControl,
  FormGroup,
  Col,
} from "react-bootstrap";

const NewQuestion = (props) => {
  let title = "";
  let description = "";

  const handleSubmit = () => {
    const sendRequest = async () => {
      try {
        await props.questionsService.add(title, description);
        props.setIsModalOpen(false);
        props.onSuccess();
      } catch (e) {}
    };
    sendRequest();
  };

  return (
    <Modal show={props.isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Ask new question</h4>
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
        <Form>
          <FormGroup>
            <Form.Label htmlFor="title">Title</Form.Label>
            <FormControl
              id="title"
              placeholder="Title"
              required
              onChange={(e) => (title = e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="description">Description</Form.Label>
            <FormControl
              as="textarea"
              id="description"
              placeholder="Tell us your problem more detailed"
              onChange={(e) => (description = e.target.value)}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => handleSubmit()}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewQuestion;
