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
          <h4>Are you sure you want to delete?</h4>
          <CloseSymbol onClick={() => setIsModalOpen(false)} />
        </Col>
      </Modal.Header>
      <Modal.Footer>
        <AnimatedButton
          icon={["far", "trash-alt"]}
          isLoading={isLoading}
          onClick={() => deleteComponent()}
        >
          DELETE
        </AnimatedButton>
        <AnimatedButton
          variant="danger"
          icon={["fas", "ban"]}
          isLoading={isLoading}
          onClick={() => setIsModalOpen(false)}
        >
          CANCEL
        </AnimatedButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;
