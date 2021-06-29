import React from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";

const EditAnswerForm = ({
  content,
  setNewAnswer,
  saveAnswerEditing,
  cancelAnswerEditing,
}) => {
  return (
    <Container>
      <FormGroup>
        <Form.Control
          as="textarea"
          rows="3"
          defaultValue={content}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></Form.Control>
      </FormGroup>
      <div className="mt-2">
        <Button onClick={saveAnswerEditing} className="mr-2">
          Save
        </Button>
        <Button onClick={cancelAnswerEditing} className="btn-danger">
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default EditAnswerForm;
