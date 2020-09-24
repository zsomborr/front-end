import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const AddNewQuestionModal = (props) => {
  let title = "";
  let description = "";
  const setIsModalOpen = props.setIsModalOpen;
  const isModalOpen = props.isModalOpen;
  const sendQuestion = props.sendQuestion;

  return (
    <Modal show={isModalOpen}>
      <Modal.Header>
        <Row>
          <Col>Give new question</Col>
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
        </Row>
      </Modal.Header>
      <Modal.Body>
        <p>title</p>
        <input></input>
        <p>description</p>
        <input></input>
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
