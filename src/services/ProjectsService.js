import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class ProjectsService extends SpringBootService {
  create(name) {
    return axios.post(`${this.baseURL}/project`, {
        projectTag: name
    });
  }
}
