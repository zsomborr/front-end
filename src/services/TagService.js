import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class TagService extends SpringBootService {
  async getAllTags() {
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
    /*const response = {
      data: {
        technologyTags: sampleTechs,
        projectTags: sampleProjects,
      },
    };*/

    const response = await axios.get(`${this.baseURL}/tags`);

    console.log("response.data", response.data);
    return response.data;
  }
}
