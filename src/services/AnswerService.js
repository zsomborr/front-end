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
}
