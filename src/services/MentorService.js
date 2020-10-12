import axios from "axios";
import SpringBootService from "./SpringBootService";

export default class StudentService extends SpringBootService {
  getAll() {
    return axios.get(`${this.baseURL}/filter/get-mentors`);
  }

  filterBy(techs, projects) {
    const data = { technologies: techs, projects: projects };
    return axios.post(`${this.baseURL}/filter/get-mentors-by-tags`, data);
  }

  addReview(rating, review, userId) {
    return axios.post(`${this.baseURL}/review`, {
      rating: rating,
      review: review,
      reviewedUser: userId,
    });
  }

  getUserReviews(id) {
    return axios.get(`${this.baseURL}/review/id/${id}`);
  }
}
