import React, { useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import SingleAnswer from "./SingleAnswer";

const AnswersComponent = ({ answers, answerService, getAnswers }) => {
  const [answerEditing, setAnswerEditing] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const [answerId, setAnswerId] = useState(0);

  const editAnswer = (id) => {
    setAnswerId(id);
    setAnswerEditing(true);
    setNewAnswer(document.getElementById(`answer-${id}`).innerText);
  };

  const editAnswerButton = (id) => {
    if (!answerEditing) {
      return (
        <span onClick={() => editAnswer(id)}>
          <i className="far fa-edit ml-3"></i>
        </span>
      );
    }
  };

  const cancelAnswerEditing = () => {
    setAnswerEditing(false);
    setAnswerId(0);
  };

  const saveAnswerEditing = async () => {
    setAnswerEditing(false);
    await answerService.setNewContentForAnswer(answerId, newAnswer);
    setAnswerId(0);
    getAnswers();
  };

  const editAnswerContent = (content, id) => {
    if (id !== answerId) {
      return content;
    } else {
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
    }
  };

  return (
    <>
      {console.log(answers)}
      {answers.length > 0 &&
        answers.map((answer) => (
          <SingleAnswer
            answer={answer}
            editAnswerContent={editAnswerContent}
            editAnswerButton={editAnswerButton}
          />
        ))}
    </>
  );
};

export default AnswersComponent;
