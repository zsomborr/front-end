import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class StudentService extends SpringBootService {
  getAll() {
    return axios.get(`${this.baseURL}/filter/get-mentors`);
  }

  async filterBy(techs, projects) {
    const data = { technologyTags: techs, projectTags: projects };
    console.log("data küldésre, küldés indul", data);
    const response = await axios.post(
      `${this.baseURL}/filter/get-mentors-by-tags`,
      data
    );

    /*
    const response = {
      data: [
        {
          profilePicture: "/ződ.png",
          userId: "1",
          firstName: "Zöld",
          lastName: "Zoli",
          technologies: ["React"],
        },
      ],
    };
    */
    console.log("response getfilteredmentorstól", response.data);
    return response.data;
  }
}
