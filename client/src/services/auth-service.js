import axios from "axios";

// Contains all the methods and also we need to use the create method of axios to build a new instance
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "https://pet-adopt-ironhack.herokuapp.com", // I will write heroku adress later //
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Method to use in our SignUp component
  signup = (username, email, phone, password) => {
    return this.service
      .post("/api/signup", { username, email, phone, password})
      .then((response) => response.data);
  };

  // Method to use in our Login component
  login = (username, password) => {
    return this.service
      .post("/api/login", { username, password })
      .then((response) => response.data);
  };

  // Method to use to see if user is authenticated
  isAuthenticated = () => {
    return this.service.get("/api/loggedin").then((response) => response.data);
  };

  // Method to use for logging our user out
  logout = () => {
    return this.service.post("/api/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
