import React from "react";
import { Modal, Button, Form, FormControl, Col } from "react-bootstrap";

const NewQuestion = (props) => {
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
          <div
            className="close-container"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <div className="leftright"></div>
            <div className="rightleft"></div>
          </div>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Title</Form.Label>
          <FormControl
            id="title"
            placeholder="Title"
            required
            onChange={(e) => {
              title = e.target.value;
            }}
          />
          <Form.Label>Description</Form.Label>
          <br></br>
          <textarea
            className="form-control"
            id="description"
            placeholder="Tell us your problem more detailed"
            style={{ width: "100%" }}
            onChange={(e) => {
              description = e.target.value;
            }}
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

export default NewQuestion;
