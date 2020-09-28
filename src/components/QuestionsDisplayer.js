import React from "react";
import QuestionPreview from "./QuestionPreview";

const QuestionsDisplayer = (props) => {
  const data = props.questions;
  console.log("data", data);
  if (data === undefined || data.data.length === 0) {
    return (
      <div className="alert alert-info">No questions found...ask one!</div>
    );
  }
  return data.data.map((question) => <QuestionPreview question={question} />);
};

export default QuestionsDisplayer;
