import React, { useState } from "react";
import DeleteConfirm from "../modals/DeleteConfirm";
import SingleAnswer from "./SingleAnswer";
import Noty from "noty";

const AnswersComponent = ({
  answers,
  setAnswers,
  answerService,
  getAnswers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerIdToDelete, setAnswerIdToDelete] = useState(0);

  const handleDeleteAnswerRequest = (id) => {
    setIsModalOpen(true);
    setAnswerIdToDelete(id);
  };

  const deleteAnswer = async () => {
    setIsLoading(true);
    try {
      const res = await answerService.deleteAnswerById(answerIdToDelete);
      new Noty({
        text: res.data.message,
        type: "info",
      }).show();

      setAnswers(answers.filter((answer) => answer.id !== answerIdToDelete));
      setAnswerIdToDelete(0);
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DeleteConfirm
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteComponent={deleteAnswer}
      />
      {answers.length > 0 &&
        answers.map((answer) => (
          <SingleAnswer
            key={answer.id}
            answer={answer}
            answerService={answerService}
            getAnswers={getAnswers}
            handleDeleteAnswerRequest={handleDeleteAnswerRequest}
          />
        ))}
    </>
  );
};

export default AnswersComponent;
