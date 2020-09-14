const { default: Axios } = require("axios");

const instanse = Axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "a57c07b4-422a-49e8-9673-7b030b2047fb",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instanse
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((Response) => {
        return Response.data;
      });
  },
  unfollowUser(userId) {
    return instanse.delete(`follow/${userId}`);
  },
  followUser(userId) {
    return instanse.post(`follow/${userId}`);
  },
  getProfile(userId) {
    console.warn("Obsolete method. Please use profileAPI object.");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instanse.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instanse.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instanse.put(`profile/status/`, { status });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instanse.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile) {
    return instanse.put(`profile`, profile);
  },
};

export const authAPI = {
  me() {
    return instanse.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instanse.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instanse.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instanse.get(`security/get-captcha-url`);
  },
};
