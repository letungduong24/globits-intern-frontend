import jwtAuthService from "../../services/jwtAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import ConstantList from "../../appConfig";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      //.loginWithEmailAndPassword(email, password)
      //.loginWithToken()
      .loginWithUserNameAndPassword(email,password)
      .then(user => {
        dispatch(setUserData(user));
        //Lưu lại thông tin liên quan đến token tại đây

        //Nhảy đến trang HomePage dự kiến
        history.push({
          pathname: ConstantList.ROOT_PATH+"dashboard/analytics"
        });
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        alert('Mời bạn đăng nhập lại');//Cần xem cách đưa ra thông báo thông qua đa ngôn ngữ
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}

