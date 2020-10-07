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

  voteOnQuestionById(questionId, value) {
    //axios.post(`${this.baseURL}/vote`, {questionId: questionId, value: value});
    //visszatérési érték alapján kell eldönteni hogy megváltozik-e a ratingje a kérdésnek
    //AKA szavazott-e már ez a user erre a kérdésre korábban
    console.log("voted");
    return true;
  }
}
