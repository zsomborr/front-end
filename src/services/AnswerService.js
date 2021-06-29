import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class AnswerService extends SpringBootService {
  async add(questionId, content) {
    return await axios.post(`${this.baseURL}/answers/add`, {
      userId: 1,
      questionId: questionId,
      content: content,
    });
  }

  async getAnswersByQuestionId(questionId) {
    return await axios.get(`${this.baseURL}/answers/${questionId}`);
  }

  setNewContentForAnswer(answerId, content) {
    console.log("content", content);
    return axios.post(`${this.baseURL}/answers/edit/${answerId}`, {
      content: content,
    });
  }
}
