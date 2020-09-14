import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
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

export const getAuthUserData = () => async (dispatch) => {
  let Response = await authAPI.me();
  if (Response.data.resultCode === 0) {
    let { id, email, login } = Response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  let Response = await authAPI.login(email, password, rememberMe);
  if (Response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    let message =
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
  let Response = await authAPI.logout();
  if (Response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false)); // зачищаем значения о пользователе (id, email, login, isAuth)
  }
};

export default authReducer;
