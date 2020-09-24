import React from "react";
import {
  Modal,
  Button,
  Row,
  Form,
  FormControl,
  InputGroup,
  Col,
} from "react-bootstrap";

const AddNewQuestionModal = (props) => {
  let title = "";
  let description = "";
  const setIsModalOpen = props.setIsModalOpen;
  const isModalOpen = props.isModalOpen;
  const sendQuestion = props.sendQuestion;

  return (
    <Modal show={isModalOpen}>
      <Modal.Header style={{ display: "flex", flexDirection: "row" }}>
        <Col style={{ float: "left" }}>
          <h4>Ask new question</h4>
        </Col>
        <Col>
          <Button
            style={{ float: "right" }}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Close
          </Button>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Title</Form.Label>
          <FormControl id="title" placeholder="Title" required />
          <Form.Label>Description</Form.Label>
          <br></br>
          <textarea
            id="description"
            placeholder="Tell us your problem more detailed"
            style={{ width: "100%" }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            sendQuestion({ title: title, description: description });
            setIsModalOpen(!isModalOpen);
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewQuestionModal;
