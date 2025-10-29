import axios from "axios";
import localStorageService from "./localStorageService";
import ConstantList from "../appConfig";
import UserService from "../services/UserService";
import history from "history.js";
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
  },
};
class JwtAuthService {
  user = {
    userId: "1",
    role: "ADMIN",
    displayName: "Watson Joyce",
    email: "watsonjoyce@gmail.com",
    photoURL: ConstantList.ROOT_PATH + "assets/images/avatar.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
  };
  loginWithUserNameAndPassword = (username, password) => {
    let requestBody =
      "client_id=core_client&grant_type=password&client_secret=secret";
    requestBody =
      requestBody + "&username=" + username + "&password=" + password;
    return axios
      .post(ConstantList.API_ENPOINT + "/oauth/token", requestBody, config)
      .then((response) => {
        console.log(response);

        const tokenExpriredTime = new Date(
          Date.now() + response.data.expires_in * 1000
        );

        localStorageService.setItem("tokenExpiredTime", tokenExpriredTime);

        this.setSession(response.data.access_token);
        this.setLoginUser(response.data);
      });
  };

  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000);
    }).then((data) => {
      //console.log(data);
      this.setUser(data);
      this.setSession(data.token);
      return data;
    });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then((data) => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  logout = () => {
    if (ConstantList.AUTH_MODE === "Keycloak") {
      UserService.doLogout();
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.HOME_PAGE);
    } else {
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.LOGIN_PAGE);
    }
  };

  setSession(token) {
    if (token) {
      localStorageService.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }
  setLoginUser = (data) => {
    let user = {};
    user.token = data.access_token;
    user.role = "ADMIN";
    user.age = 25;
    user.displayName = "";
    user.photoURL = ConstantList.ROOT_PATH + "assets/images/avatar.jpg";
    this.user = user;
    localStorageService.setItem("auth_user", user);
    return user;
  };

  setLoginToken = (data) => {
    let user = {};
    user.token = data;
    user.role = "ADMIN";
    user.age = 25;
    user.displayName = ""; // cần lấy tên user
    user.photoURL = ConstantList.ROOT_PATH + "assets/images/avatar.jpg";
    this.user = user;
    localStorageService.setItem("auth_user", user);
    return user;
  };

  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  };
  removeUser = () => {
    localStorage.removeItem("auth_user");
  };
}

export default new JwtAuthService();
