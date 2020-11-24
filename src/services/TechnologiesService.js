import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TechnologiesService extends SpringBootService {
  getAll() {
    return axios.get(`${this.baseURL}/technologies`);
  }

  create(name) {
    return axios.post(`${this.baseURL}/technology`, {
        technologyTag: name
    });
  }
}
