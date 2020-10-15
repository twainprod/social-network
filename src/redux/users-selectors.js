//import { createSelector } from "reselect";

// Примитивный селектор (создается без библиотеки reselect)
export const getUsersItems = (state) => {
  return state.usersPage.users;
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};

// // ==== Создание сложного селектора через библиотеку reselect ===
// // == Делаем зависимость от двух примитивных селекторов, и, если в любом из них произошли изменения в state, то срабатывает перерисовка сложного селектора в том числе.
// export const getUsersItemsSuperSelector = createSelector(getUsersItems, getIsFetching, (users, isFetching) => {
// // == Селектор с большим количеством действий
//   return users.filter(u => true); // пример селектора выборки
  
// })