import React from "react";
import QuestionPreview from "./QuestionPreview";

const QuestionsDisplayer = (props) => {
  const data = props.questions;
  console.log("data", data);
  if (data === undefined) {
    return <div>No questions found...ask one!</div>;
  } else {
    if (data.data.length === 0) {
      return <div>No questions found...ask one!</div>;
    } else {
      return data.data.map((question) => (
        <QuestionPreview question={question} />
      ));
    }
  }
};

export default QuestionsDisplayer;
