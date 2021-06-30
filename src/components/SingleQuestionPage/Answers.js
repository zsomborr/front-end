import React, { useState } from "react";
import DeleteAnswer from "../modals/DeleteAnswer";
import SingleAnswer from "./SingleAnswer";
import Noty from "noty";

const AnswersComponent = ({
  answers,
  setAnswers,
  answerService,
  getAnswers,
  question,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerIdToDelete, setAnswerIdToDelete] = useState(0);

  const handleDeleteAnswerRequest = (id) => {
    setIsModalOpen(true);
    setAnswerIdToDelete(id);
  };

  const deleteAnswer = async () => {
    const res = await answerService.deleteAnswerById(answerIdToDelete);
    new Noty({
      text: res.data.message,
      type: "info",
    }).show();

    setAnswers(answers.filter((answer) => answer.id !== answerIdToDelete));
    setAnswerIdToDelete(0);
    setIsModalOpen(false);
  };

  return (
    <>
      <DeleteAnswer
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteAnswer={deleteAnswer}
      />
      {answers.length > 0 &&
        answers.map((answer) => (
          <SingleAnswer
            key={answer.id}
            answer={answer}
            answerService={answerService}
            getAnswers={getAnswers}
            question={question}
            handleDeleteAnswerRequest={handleDeleteAnswerRequest}
          />
        ))}
    </>
  );
};

export default AnswersComponent;
