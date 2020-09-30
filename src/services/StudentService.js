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
