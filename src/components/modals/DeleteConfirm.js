import React, { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import AnimatedButton from "../form/AnimatedButton";
import CloseSymbol from "./CloseSymbol";

const DeleteConfirm = ({
  isModalOpen,
  setIsModalOpen,
  deleteComponent,
  isLoading,
}) => {
  return (
    <Modal show={isModalOpen}>
      <Modal.Header>
        <Col>
          <h4>Are u sure u want to delete?</h4>
          <CloseSymbol onClick={() => setIsModalOpen(false)} />
        </Col>
      </Modal.Header>
      <Modal.Footer>
        <AnimatedButton
          icon={["far", "paper-plane"]}
          isLoading={isLoading}
          onClick={() => deleteComponent()}
        >
          YES
        </AnimatedButton>
        <AnimatedButton
          icon={["far", "paper-plane"]}
          isLoading={isLoading}
          onClick={() => setIsModalOpen(false)}
        >
          NO
        </AnimatedButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;
