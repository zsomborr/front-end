import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TagService extends SpringBootService {
  projects() {
    return axios.get(`${this.baseURL}/projects`);
  }

  technologies() {
    return axios.get(`${this.baseURL}/technologies`);
  }
}
