import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class StudentService extends SpringBootService {
  constructor(setIsAuthenticated) {
    super();
    this.setIsAuthenticated = setIsAuthenticated;
  }

  registration(firstName, lastName, username, email, password) {
    return axios.post(`${this.baseURL}/reg/registration`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }

  async login(username, password) {
    const response = await axios.post(`${this.baseURL}/auth/login`, {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      this.setIsAuthenticated(true);
    }

    return response;
  }
}
