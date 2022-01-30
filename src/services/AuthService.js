import axios from "axios";

//const API_URL = "https://35.157.21.203:8843/";
const API_URL = "https://localhost:8843/";

class AuthService {
	async login(username, password) {
		const response = await axios.post(API_URL + "authenticate", {
			username,
			password,
		});

		try {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return "Success!";
		} catch (err) {
			return err;
		}
	}

	logout() {
		localStorage.removeItem("user");
	}

	async register(username, password, firstName, lastName) {
		const response = await axios.post(API_URL + "signUp", {
			username,
			password,
			firstName,
			lastName,
		});

		try {
			if (response.data.id) {
			}
			return "Success!";
		} catch (err) {
			return err;
		}
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
}

export default new AuthService();
