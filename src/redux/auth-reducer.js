import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch) => {
  const Response = await authAPI.me();
  if (Response.data.resultCode === 0) {
    const { id, email, login } = Response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  const Response = await authAPI.login(email, password, rememberMe, captcha);
  if (Response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (Response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message =
      Response.data.messages.length > 0
        ? Response.data.messages[0]
        : "Some error";
    dispatch(
      stopSubmit("login", {
        _error: message,
      })
    );
  }
};

export const logout = () => async (dispatch) => {
  const Response = await authAPI.logout();
  if (Response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false)); // зачищаем значения о пользователе (id, email, login, isAuth)
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const Response = await securityAPI.getCaptchaUrl();
  const captchaUrl = Response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
