import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TechnologiesService extends SpringBootService {
  getAll() {
    return axios.get(`${this.baseURL}/tags/get-all-tech`);
  }
}
