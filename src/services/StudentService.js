import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class StudentService extends SpringBootService {
  registration(firstName, lastName, username, email, password) {
    return axios.post(`${this.baseURL}/reg/registration`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }

  async login(username, password, setIsAuthenticated) {
    const response = await axios.post(`${this.baseURL}/auth/login`, {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      setIsAuthenticated(true);
    }

    return response;
  }

  getAllMentors() {
    const response = {
      data: [
        {
          profilePicture: "/ződ.png",
          userId: "1",
          firstName: "Zöld",
          lastName: "Zoli",
          technologies: ["React"],
        },
        {
          profilePicture: "/nari.png",
          userId: "2",
          firstName: "Narancs",
          lastName: "Nándi",
          technologies: ["React", "C#", "Javascript"],
        },
        {
          profilePicture: "/feka.png",
          userId: "3",
          firstName: "Fekete",
          lastName: "Feri",
          technologies: ["Java", "Spring"],
        },
        {
          profilePicture: "/sari.png",
          userId: "4",
          firstName: "Sárga",
          lastName: "Sára",
          technologies: ["C#", "ASP.Net"],
        },
      ],
    };
    //const response = axios.get(`${this.baseURL}/filter/get-mentors`);
    console.log("response.data", response.data);
    return response.data;
  }

  getFilteredMentors(techs, projects) {
    /*
    const response = axios.post(`${this.baseURL}/filter/get-mentors-by-tags`, {
      technologies: [techs],
      projects: [projects]
    });
    */

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
    return response.data;
  }

  async isAuthenticated() {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.split("=");
      if (cookie.length === 2 && cookie[0] === "authentication") {
        const response = await axios.get(`${this.baseURL}/auth/authentication`);
        return response.status === 200;
      }
    }
    return false;
  }
}
