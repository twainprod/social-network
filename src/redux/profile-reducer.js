import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const DELETE_POST = "profile/DELETE_POST";

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
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostBody) => ({
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

export default profileReducer;
