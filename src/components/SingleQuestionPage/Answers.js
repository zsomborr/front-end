import React from "react";
import SingleAnswer from "./SingleAnswer";

const AnswersComponent = ({ answers, answerService, getAnswers, question }) => {
  return (
    <>
      {console.log(answers)}
      {answers.length > 0 &&
        answers.map((answer) => (
          <SingleAnswer
            answer={answer}
            answerService={answerService}
            getAnswers={getAnswers}
            question={question}
          />
        ))}
    </>
  );
};

export default AnswersComponent;
