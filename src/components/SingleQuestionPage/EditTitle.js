import React from "react";
import { Button, FormGroup, Form } from "react-bootstrap";

const EditTitle = ({ question, setNewTitle, saveEditing, cancelEditing }) => {
  return (
    <FormGroup>
      <Form.Control
        as="input"
        defaultValue={question.title}
        onChange={(e) => setNewTitle(e.target.value)}
      ></Form.Control>
      <div className="mt-2">
        <Button onClick={saveEditing} className="mr-2">
          Save
        </Button>
        <Button onClick={cancelEditing} className="btn-danger">
          Cancel
        </Button>
      </div>
    </FormGroup>
  );
};

export default EditTitle;
