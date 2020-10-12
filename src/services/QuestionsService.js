import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class QuestionsService extends SpringBootService {
  add(title, description, technologies, isAnonym) {
    return axios.post(`${this.baseURL}/question`, {
      title: title,
      description: description,
      technologyTags: technologies,
      anonym: isAnonym,
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


  voteOnQuestionById(questionId, value) {
    return axios.post(`${this.baseURL}/question/vote/${questionId}`, {
      vote: value,
    });
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
