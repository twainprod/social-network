import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const DELETE_POST = "profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: 1, text: "Hi, how are you?", likesCount: 15 },
    { id: 2, text: "It's my first post", likesCount: 20 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        text: action.newPostBody,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        },
      };
    }
    default:
      return state;
  }
};

export const addPost = (newPostBody) => ({
  type: ADD_POST,
  newPostBody,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});
export const getUserProfile = (userId) => async (dispatch) => {
  let Response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(Response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let Response = await profileAPI.getStatus(userId);
  dispatch(setStatus(Response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let Response = await profileAPI.updateStatus(status);
  if (Response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let Response = await profileAPI.savePhoto(file);
  if (Response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(Response.data.data.photos));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let Response = await profileAPI.saveProfile(profile);
  if (Response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(
      stopSubmit("edit-profile", {
        _error: Response.data.messages[0],
      })
    );
    return Promise.reject(Response.data.messages[0]);
  }
};

export default profileReducer;
