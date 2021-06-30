import React from "react";
import { Col, Modal } from "react-bootstrap";
import AnimatedButton from "../form/AnimatedButton";
import CloseSymbol from "./CloseSymbol";

const DeleteAnswer = ({ isModalOpen, setIsModalOpen, deleteAnswer }) => {
  return (
    <Modal show={isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Are u sure u want to delete this answer?</h4>
          <CloseSymbol onClick={() => setIsModalOpen(false)} />
        </Col>
      </Modal.Header>
      <Modal.Footer>
        <AnimatedButton
          icon={["far", "paper-plane"]}
          onClick={() => deleteAnswer()}
        >
          YES
        </AnimatedButton>
        <AnimatedButton
          icon={["far", "paper-plane"]}
          onClick={() => setIsModalOpen(false)}
        >
          NO
        </AnimatedButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAnswer;
