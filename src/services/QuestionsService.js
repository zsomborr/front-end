import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class QuestionsService extends SpringBootService {
  add(title, description) {
    return axios.post(`${this.baseURL}/question`, {
      title: title,
      description: description,
    });
  }

  getAll() {
    return axios.get(`${this.baseURL}/question`);
  }

  search(value) {
    return axios.post(`${this.baseURL}/search`, { data: value });
  }

  getQuestionDetails(questionId) {
    return axios.get(`${this.baseURL}/question/${questionId}`);
  }
}
