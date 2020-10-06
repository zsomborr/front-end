import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TagService extends SpringBootService {
  getAllTags() {
    return axios.get(`${this.baseURL}/tags`);
  }
}
