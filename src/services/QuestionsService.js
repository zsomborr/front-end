import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class QuestionsService extends SpringBootService {
  async addNewQuestion(questionsData, callback) {
    await axios.post(`${this.baseURL}/question`, questionsData);
    callback();
  }

  async getAllQuestions(callback) {
    const data = await axios.get(`${this.baseURL}/question`);
    callback(data);
  }

  search(value) {
    return axios.post(`${this.baseURL}/search`, { data: value });
  }

  getQuestionDetails(questionId) {
    return axios.get(`${this.baseURL}/question/${questionId}`);
  }

  setNewDataForQuestion(questionId, newTitle, newDescription) {
    return axios.post(`${this.baseURL}/question/edit/${questionId}`, {
      title: newTitle,
      description: newDescription,
    });
  }
}
