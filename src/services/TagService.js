import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TagService extends SpringBootService {
  getAllTags() {
    const sampleTechs = [
      "C#",
      "Java",
      "React",
      "Spring",
      "Javascript",
      "ASP.NET",
      "Bootstrap",
      "PSQL",
    ];

    const sampleProjects = [
      "Ask Mate",
      "Proman",
      "Web Blackjack",
      "Pong",
      "File Manager",
      "Codecool Quest",
    ];

    //const response = axios.get(`${this.baseURL}/tags`);
    const response = {
      data: {
        technologyTags: sampleTechs,
        projectTags: sampleProjects,
      },
    };
    return response.data;
  }
}
