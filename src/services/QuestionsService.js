import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class QuestionsService extends SpringBootService {
  async addNewQuestion(questionsData, callback) {
    console.log("questionsData", questionsData);
    await axios.post(`${this.baseURL}/question`, questionsData, {
      withCredentials: true,
    });
    callback();
  }

  async getAllQuestions(callback) {
    const data = await axios.get(`${this.baseURL}/question`, {
      withCredentials: true,
    });
    callback(data);
  }

  search(value) {
    return axios.post(`${this.baseURL}/search`, value, {
      withCredentials: true,
    });
  }
}
