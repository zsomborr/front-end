import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class QuestionsService extends SpringBootService {
  add(title, description, technologies) {
    return axios.post(`${this.baseURL}/question`, {
      title: title,
      description: description,
      technologyTags: technologies,
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

  setNewDataForQuestion(questionId, newTitle, newDescription) {
    return axios.post(`${this.baseURL}/question/edit/${questionId}`, {
      title: newTitle,
      description: newDescription,
    });
  }

  searchBy(technologies) {
    return axios.post(`${this.baseURL}/filter/get-questions-by-tags`, {
      technologyTags: technologies,
    });
  }
}
