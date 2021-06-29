import React from "react";
import { Col, FormGroup, Form } from "react-bootstrap";

const EditDescription = ({ editing, question, setNewDescription }) => {
  return (
    <Col>
      <FormGroup>
        <Form.Control
          as="textarea"
          rows="5"
          defaultValue={question.description}
          onChange={(e) => setNewDescription(e.target.value)}
        ></Form.Control>
      </FormGroup>
    </Col>
  );
};

export default EditDescription;
