import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class StudentService extends SpringBootService {
  login(email, password) {
    return axios.post(
      `${this.baseURL}/auth/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
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
}
