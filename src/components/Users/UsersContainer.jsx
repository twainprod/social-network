import React from "react";
import { connect } from "react-redux";
import s from "./Users.module.css";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
  setCurrentPortion,
} from "../../redux/users-reducer";
import Users from "./Users";
import { compose } from "redux";
import {
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getPageSize,
  getUsersItems,
  getCurrentPortion,
} from "../../redux/users-selectors";
import Paginator from "../common/Paginator/Paginator";
import Loader from "../common/Loader/Loader";

class UsersContainer extends React.Component {
  componentDidMount() {
    let { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize); // Вызов thunk-creator'а
  }

  onPageChanged = (pageNumber, portionNumber) => {
    let { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
    this.props.setCurrentPage(pageNumber, portionNumber);
  };

  onPortionChanged = (portionNumber) => {
    this.props.setCurrentPortion(portionNumber);
  }

  render() {
    return (
      <>
        <div className={s.title}>Users</div>
        <Paginator
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          totalItemsCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          portionNumber={this.props.portionNumber}
          setPortionNumber={this.setPortionNumber}
          onPortionChanged={this.onPortionChanged}
        />
        {this.props.isFetching ? (
          <Loader />
        ) : (
          <Users
              users={this.props.users}
              totalUsersCount={this.props.totalUsersCount}
              pageSize={this.props.pageSize}
              currentPage={this.props.currentPage}
              portionNumber={this.props.portionNumber}
              onPageChanged={this.onPageChanged}
              follow={this.props.follow}
              unfollow={this.props.unfollow}
              followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersItems(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    portionNumber: getCurrentPortion(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setCurrentPortion,
    toggleFollowingProgress,
    getUsers,
  })
)(UsersContainer);
