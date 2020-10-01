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

  async getUserDataById(id) {
    const response = await {
      data: {
        "user-data": {
          firstName: "Kovacs",
          lastName: "Bela",
          country: "Hungary",
          city: "Budapest",
          module: "OOP",
        },
        tags: {
          technologies: ["C#", "React"],
          projects: ["AskMate", "Proman"],
        },
      },
    };
    /*
    const response = await axios.get(
      `${this.baseURL}/user/get-user-data/${id}`
    );
    */
    console.log("response.data", response.data);
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

  getSettingsDetails() {
    return axios.get(`${this.baseURL}/user/get-user-data`);
  }

  addProject(name) {
    return axios.post(`${this.baseURL}/tags/add-project-tag`, {
      projectTag: name,
    });
  }

  removeProject(name) {
    return axios.post(`${this.baseURL}/tags/remove-project-tag`, {
      projectTag: name,
    });
  }

  addTechnology(name) {
    return axios.post(`${this.baseURL}/tags/add-technology-tag`, {
      technologyTag: name,
    });
  }

  removeTechnology(name) {
    return axios.post(`${this.baseURL}/tags/remove-technology-tag`, {
      technologyTag: name,
    });
  }

  updateInfo(firstName, lastName, country, city, module) {
    return axios.post(`${this.baseURL}/user/save-personal-data`, {
      firstName: firstName,
      lastName: lastName,
      country: country,
      city: city,
      module: module.toUpperCase(),
    });
  }

  getPrivateDetails() {
    return axios.get(`${this.baseURL}/user/get-user-private-page`);
  }
}
