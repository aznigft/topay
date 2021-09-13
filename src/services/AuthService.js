import axios from "axios";

const API_URL = "http://localhost:8081/";

class AuthService {
  async login(username, password) {

    const response = await axios.post(API_URL + "authenticate", {username, password})

    try {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return 'Success!'
    } catch(err) {
        return 'err';
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();